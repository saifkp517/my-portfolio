import ArticleLayout from '../../components/articles/ArticleLayout.jsx'
import { H2, P, UL, LI, Strong, InlineCode, Callout, CodeBlock } from '../../components/articles/Prose.jsx'
import { stackItems } from '../../data/stack.js'

const meta = stackItems.find((item) => item.key === 'redis')

const sections = [
  { id: 'why-not-postgres', label: 'Why not just Postgres?' },
  { id: 'what-lives-in-redis', label: 'What actually lives in Redis' },
  { id: 'data-shapes', label: 'Picking the right data structures' },
  { id: 'pubsub', label: 'Pub/Sub: fanning state out' },
  { id: 'ttls', label: 'TTLs and rage-quitters' },
  { id: 'handoff', label: 'Where Redis ends and Postgres begins' },
  { id: 'nestjs-integration', label: 'Wiring it into NestJS' },
  { id: 'lessons', label: 'What I’d change next time' },
]

export default function RedisArticle() {
  return (
    <ArticleLayout
      stackKey="redis"
      title={meta.headline}
      dek={meta.dek}
      icon={meta.icon}
      iconAlt={`${meta.part} logo`}
      cover={meta.cover}
      readingTime={meta.readingTime}
      tags={meta.tags}
      sections={sections}
    >
      <P>
        Zentra's backend has two very different jobs. One is durability: remember who a player is,
        what their high score was, keep it safe forever. The other is speed: know where twelve
        spheres are standing <em>right now</em>, and be ready to answer that question twenty times a
        second, for as long as a match runs. PostgreSQL is excellent at the first job. It is the
        wrong tool for the second. Redis is what sits in between.
      </P>

      <H2 id="why-not-postgres">Why not just Postgres?</H2>
      <P>
        Nothing stops you from writing a player's position to a SQL table on every tick — it just
        falls over quickly. Every write is a transaction, an index update, and eventually a disk
        flush, multiplied by every player in every active room, multiplied by twenty ticks a second.
        Position data doesn't need any of that machinery: nobody needs an ACID guarantee on where a
        sphere was two ticks ago, and if the process restarted mid-match, that ephemeral state
        <em> should</em> just disappear.
      </P>
      <P>
        What Zentra needed was a store that treats "fast and in memory" as the default, not an
        optimization bolted onto a disk-backed database. That's Redis's entire premise.
      </P>

      <H2 id="what-lives-in-redis">What actually lives in Redis</H2>
      <P>
        The rule I settled on: <Strong>if it only matters while the match is live, it goes in
        Redis; if it needs to outlive the match, it goes in Postgres.</Strong> In practice, that
        splits cleanly:
      </P>
      <UL>
        <LI>Live player position, rotation, and HP for every active room</LI>
        <LI>Per-room lobby state — who's connected, who's ready, current round timer</LI>
        <LI>A running in-match score, before it's final</LI>
        <LI>Presence — which gateway instance currently owns which player's socket</LI>
      </UL>
      <P>
        None of it needs to survive a server restart. All of it needs to be read and written far
        more cheaply than a relational database is built for.
      </P>

      <H2 id="data-shapes">Picking the right data structures</H2>
      <P>
        Redis isn't just a key-value cache — it has real data structures, and picking the right one
        per problem avoids a lot of manual serialization. Player state is a hash, keyed per room and
        player, so individual fields (position, HP) can be updated without rewriting the whole
        object:
      </P>
      <CodeBlock label="redis-cli, illustrative">
{`HSET room:4f2a:player:p_93a x 12.4 y 0 z -8.1 hp 76
EXPIRE room:4f2a:player:p_93a 30`}
      </CodeBlock>
      <P>
        The in-match leaderboard is a sorted set — scores as the sort key means "who's currently
        winning" is a single <InlineCode>ZREVRANGE</InlineCode> call instead of a query and a sort
        in application code:
      </P>
      <CodeBlock label="redis-cli, illustrative">
{`ZADD room:4f2a:leaderboard 1400 p_93a
ZREVRANGE room:4f2a:leaderboard 0 4 WITHSCORES`}
      </CodeBlock>
      <P>
        Small choice, but it means the leaderboard the client sees mid-match is never something the
        server "computes" — it's just what Redis already has sorted, on every read.
      </P>

      <H2 id="pubsub">Pub/Sub: fanning state out to every player</H2>
      <P>
        A production deployment doesn't run one Node process — it runs several, behind a load
        balancer, and there's no guarantee two players in the same room have sockets open to the
        same instance. So a hit resolved on instance A has to somehow reach a player connected to
        instance B.
      </P>
      <P>
        Redis's Pub/Sub is what closes that gap. Whichever instance resolves a room's tick publishes
        the resulting snapshot to a channel for that room; every instance subscribes to the rooms it
        has players in, and re-emits over whichever sockets it owns:
      </P>
      <CodeBlock label="simplified, per gateway instance">
{`// after resolving a tick
await redis.publish(\`room:\${roomId}:state\`, JSON.stringify(snapshot))

// every instance, on startup
redis.subscribe(\`room:\${roomId}:state\`, (message) => {
  server.to(roomId).emit('state', message)
})`}
      </CodeBlock>
      <Callout title="Why not just keep state in a JS object in memory?">
        <P>
          A single process could absolutely hold room state in a plain in-memory object — and early
          on, it did. It stops working the moment there's more than one server instance, which is
          the point Zentra needed to scale past a single box for. Redis pub/sub is what let the
          in-memory-speed model keep working across multiple processes without every instance
          needing direct knowledge of every other instance.
        </P>
      </Callout>

      <H2 id="ttls">TTLs and cleaning up after players who rage-quit</H2>
      <P>
        Players close tabs mid-match constantly — losing, getting bored, their Wi-Fi dying. If
        cleanup depended on a graceful disconnect event, abandoned keys would pile up in Redis
        forever. Instead, live-state keys carry a short TTL that gets refreshed on every write.
        Stop writing — because the socket died and nothing is updating that player anymore — and the
        key simply expires on its own a few seconds later. No cleanup job, no cron, no "orphaned
        session" table to sweep.
      </P>

      <H2 id="handoff">Where Redis ends and Postgres begins</H2>
      <P>
        None of this replaces Postgres — it defers to it. When a match ends, the final score,
        result, and any rating changes get written once, as a single durable transaction, and the
        room's Redis keys are torn down:
      </P>
      <CodeBlock label="simplified match-end handler">
{`async function endMatch(roomId: string) {
  const summary = await redis.hgetall(\`room:\${roomId}:summary\`)
  await matchRepository.insert(toMatchRecord(summary))

  const keys = await redis.keys(\`room:\${roomId}:*\`)
  if (keys.length) await redis.del(keys)
}`}
      </CodeBlock>
      <P>
        Twenty writes a second happen in Redis. Exactly one write happens in Postgres, at the moment
        it actually needs to be permanent. That asymmetry is the whole design.
      </P>

      <H2 id="nestjs-integration">Wiring it into NestJS</H2>
      <P>
        Redis is registered as a NestJS provider — a single injectable client shared across the
        gateway, the matchmaking service, and the room logic — rather than something each module
        connects to independently. That keeps connection handling and reconnection behavior in one
        place, and means testing a service means mocking one interface, not a scattered set of raw
        Redis calls.
      </P>

      <H2 id="lessons">What I'd change next time</H2>
      <P>
        This split held up well under real traffic. The one thing I'd revisit: room summaries are
        currently plain hashes I serialize by hand on the way into Postgres. As the schema for a
        "match result" grows, that hand-mapping is the piece most likely to drift out of sync —
        worth formalizing with a shared schema between the Redis shape and the Postgres model before
        it becomes a source of bugs.
      </P>
    </ArticleLayout>
  )
}
