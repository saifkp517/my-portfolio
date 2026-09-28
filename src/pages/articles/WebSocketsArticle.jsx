import ArticleLayout from '../../components/articles/ArticleLayout.jsx'
import { H2, P, UL, LI, Strong, InlineCode, Callout, CodeBlock } from '../../components/articles/Prose.jsx'

const sections = [
  { id: 'the-cost-of-lag', label: 'Why HTTP wasn’t going to cut it' },
  { id: 'picking-websockets', label: 'Picking WebSockets over the alternatives' },
  { id: 'message-protocol', label: 'Designing the message protocol' },
  { id: 'tick-loop', label: 'The server tick loop' },
  { id: 'client-prediction', label: 'Client-side prediction' },
  { id: 'hit-detection', label: 'Hit detection: never trust the client' },
  { id: 'disconnects', label: 'Disconnects and rejoining mid-match' },
  { id: 'lessons', label: 'What I’d change next time' },
]

export default function WebSocketsArticle() {
  return (
    <ArticleLayout
      stackKey="websockets"
      title="Keeping a forest full of players in sync, 20 times a second"
      dek="Every roll, every shot, every kill in Zentra travels over a single WebSocket connection. Here's how the netcode holds up when a dozen spheres are trying to eliminate each other in real time."
      icon="/images/websockets-logo.svg"
      iconAlt="WebSockets logo"
      readingTime="8 min read"
      tags={['Realtime', 'Networking', 'Game dev']}
      sections={sections}
    >
      <P>
        Zentra is a top-down .io shooter: you're a rolling sphere on uneven forest terrain, dodging
        rain, using canopies as cover, and shooting anything that isn't you. None of that works if
        players don't agree on where everyone is <Strong>right now</Strong>. Position, aim, and hits
        all have to travel across the network fast enough that a fight still feels fair when two
        people are aiming at each other from across a clearing.
      </P>
      <P>
        This is the piece of the stack that made that possible.
      </P>

      <H2 id="the-cost-of-lag">Why HTTP wasn't going to cut it</H2>
      <P>
        A regular REST request is built around a question-and-answer shape: the client asks, the
        server answers, the connection is done. That's a fine model for loading a leaderboard. It's
        the wrong model for "tell me where every player is, continuously, forever, until the match
        ends."
      </P>
      <P>
        Polling — asking <InlineCode>GET /state</InlineCode> every 100ms — technically works, but
        every request pays the cost of a new HTTP handshake, headers, and a round trip that's mostly
        overhead. At the tick rate a shooter needs, that overhead adds up faster than the actual
        payload does. It also gives you the <em>worst</em> kind of latency: not just slow, but
        unevenly slow, so hits land inconsistently and movement stutters.
      </P>

      <H2 id="picking-websockets">Picking WebSockets over the alternatives</H2>
      <P>
        What Zentra actually needed was a connection that stays open, in both directions, with
        minimal per-message overhead. WebSockets fit that directly: one handshake at connect time,
        then a persistent duplex pipe the server and client can push through whenever they have
        something to say.
      </P>
      <UL>
        <LI>
          <Strong>No reconnect tax per message.</Strong> The handshake happens once; after that,
          sending a position update costs a few bytes over an already-open socket.
        </LI>
        <LI>
          <Strong>Server can push without being asked.</Strong> Critical for a shooter — when
          another player kills you, you need to find out immediately, not on your next poll.
        </LI>
        <LI>
          <Strong>Runs everywhere the game runs.</Strong> Zentra is browser-first, so anything that
          needed a native client or a UDP socket was off the table.
        </LI>
      </UL>
      <Callout title="Why not raw UDP or WebRTC?">
        <P>
          UDP is the "correct" transport for competitive shooters — no head-of-line blocking, no
          guaranteed delivery you don't need. But it isn't available from a browser, and WebRTC's
          data channels get you UDP-like behavior at the cost of a much heavier connection setup
          (ICE, STUN/TURN, SDP negotiation) for a game that needed to go from "open tab" to
          "in a match" in under a second. For Zentra's scale, WebSockets over TCP was the pragmatic
          trade: slightly more latency sensitivity to packet loss, in exchange for infrastructure
          simple enough that one person could run it.
        </P>
      </Callout>

      <H2 id="message-protocol">Designing the message protocol</H2>
      <P>
        Every message on the socket carries a type tag so the gateway can route it without parsing
        the whole payload first. Client messages are intentionally tiny — just the input, a sequence
        number, and a timestamp:
      </P>
      <CodeBlock label="client → server, sent on every input change">
{`{
  "t": "move",
  "seq": 8821,
  "dir": [0.42, -0.9],
  "ts": 1732731029123
}`}
      </CodeBlock>
      <P>
        The server doesn't send back a mirrored copy of that message. Instead, on every tick it
        broadcasts one compact snapshot of everyone's state to everyone in the room:
      </P>
      <CodeBlock label="server → all clients in the room, ~20×/sec">
{`{
  "t": "state",
  "tick": 4410,
  "players": [
    { "id": "p_93a", "pos": [12.4, 0, -8.1], "hp": 76 },
    { "id": "p_11f", "pos": [10.9, 0, -6.7], "hp": 100 }
  ]
}`}
      </CodeBlock>
      <P>
        Plain JSON, not a binary format. For Zentra's player counts per room, the parsing cost is
        irrelevant next to network latency, and JSON meant I could read raw traffic in the browser
        dev tools while debugging — which paid for itself many times over during development.
      </P>

      <H2 id="tick-loop">The server tick loop</H2>
      <P>
        The server doesn't react to each input message individually — that would let network jitter
        directly control the simulation. Instead, incoming inputs are queued, and a fixed-rate loop
        advances the whole room together:
      </P>
      <CodeBlock label="simplified room loop">
{`const TICK_MS = 50 // 20 ticks/sec

setInterval(() => {
  for (const room of activeRooms) {
    room.applyQueuedInputs()
    room.stepPhysics(TICK_MS)
    room.resolveHits()
    room.broadcastState()
  }
}, TICK_MS)`}
      </CodeBlock>
      <P>
        Decoupling "when input arrives" from "when the world moves" is what keeps the simulation
        deterministic per tick — every player's move gets applied in the same pass, regardless of
        the small timing differences in when each packet happened to arrive.
      </P>

      <H2 id="client-prediction">Client-side prediction and reconciliation</H2>
      <P>
        Waiting for a server round trip before your own sphere moves would feel terrible — even at
        good latency, 100ms of input delay is very noticeable. So the client predicts: it applies
        your movement locally the instant you press a key, and reconciles against the server's next
        snapshot when it arrives.
      </P>
      <P>
        In practice that means the client keeps a short buffer of its own recent inputs. When a
        server snapshot comes in, the client checks its predicted position against the server's for
        that tick; if they've drifted apart — packet loss, a collision the client didn't predict — it
        snaps to the server's position and <em>replays</em> the inputs the server hadn't accounted
        for yet. Done well, that correction is invisible. Done poorly, it's the rubber-banding every
        laggy multiplayer game is famous for.
      </P>

      <H2 id="hit-detection">Hit detection: never trust the client</H2>
      <P>
        The client never gets to decide whether a shot landed. It reports "I fired, from here,
        aimed there" — the server, using its own authoritative positions for everyone in the room at
        that tick, decides if that line of fire actually connects. That single rule is most of what
        keeps Zentra fair: a modified client can lie about the outcome all it wants, but the server
        simply won't listen.
      </P>
      <P>
        The trickier part is <Strong>lag compensation</Strong>. By the time a shot arrives at the
        server, the target has already moved a little further from where the shooter saw them. The
        server rewinds its record of player positions to roughly where things stood at the shooter's
        client-time, checks the hit against <em>that</em>, then resolves it in the present. Skip this
        step and anyone with real ping is at a structural disadvantage no amount of skill fixes.
      </P>

      <H2 id="disconnects">Disconnects, drops, and rejoining mid-match</H2>
      <P>
        Wi-Fi hiccups, laptops sleep, tabs get backgrounded — the socket closes constantly, for
        reasons that have nothing to do with the game. Zentra treats a dropped connection as
        temporary by default: the room keeps that player's sphere in place for a short grace window
        instead of instantly removing them, so a two-second blip doesn't end your match. Reconnecting
        rebinds the existing socket to the same player session and the next state broadcast catches
        the client up in one snapshot — no replaying history, just "here's where everything is now."
      </P>

      <H2 id="lessons">What I'd change next time</H2>
      <P>
        The tick loop and authoritative hit resolution held up well even as room sizes grew. What I'd
        revisit: the state broadcast currently sends every player's full state every tick, which is
        wasteful once a room gets large — delta-compressing snapshots (only sending what changed
        since the client's last acknowledged tick) would cut bandwidth meaningfully without touching
        the parts of the architecture that already work.
      </P>
    </ArticleLayout>
  )
}
