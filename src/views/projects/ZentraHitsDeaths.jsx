'use client'

import CTAButton from '../../components/CTAButton.jsx'
import ReportLayout, { ReportSection, ReportTable } from '../../components/report/ReportLayout.jsx'
import { META_COLORS } from '../../data/iconColors.js'
import { projects } from '../../data/projects.js'

const ZENTRA = projects.find((p) => p.key === 'zentra')

const PROPERTIES = [
  { label: 'Project', value: 'Zentra', color: META_COLORS.time, d: 'M8 2.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM8 5v3.2' },
  { label: 'Authority', value: 'NestJS server', color: META_COLORS.location, d: 'M3 3.5h10v3.5H3V3.5zM3 9h10v3.5H3V9z' },
  { label: 'Transport', value: 'socket.io', color: META_COLORS.email, d: 'M9 2L4 9h4l-1 5 5-7H8l1-5z' },
  { label: 'Match state', value: 'Redis', color: META_COLORS.role, d: 'M8 2.5l5.5 2.75L8 8 2.5 5.25 8 2.5zM2.5 8.75L8 11.5l5.5-2.75' },
]

const SECTIONS = [
  { id: 'intro', label: 'Introduction' },
  { id: 'server-decides', label: 'The server decides' },
  { id: 'trigger', label: '1. Trigger' },
  { id: 'rewind', label: '2. Rewind' },
  { id: 'hit-test', label: '3. Hit test' },
  { id: 'occlusion', label: '4. Occlusion' },
  { id: 'damage', label: '5. Damage' },
  { id: 'respawn', label: '7. Respawn' },
  { id: 'shield', label: 'Shield ability' },
  { id: 'storage', label: 'Where it lives' },
  { id: 'takeaway', label: 'Takeaway' },
]

const DAMAGE_ROWS = [
  ['Person hit', 'Hit + new health', 'Their exact health from the server; the next hit resyncs a lost message.'],
  ['Shooter', 'Hit confirmed', 'Draws the hit marker, only after the server confirms.'],
  ['Everyone in match', 'Player hit', 'Updates the overhead health bar and plays a hit reaction.'],
  ['Nearby players', 'Shot fired', 'Draws the tracer.'],
]

function Cover() {
  return (
    <div className="relative aspect-[21/9] overflow-hidden bg-ink">
      <img src={ZENTRA.cover} alt="Zentra gameplay in a voxel forest" className="absolute inset-0 h-full w-full object-cover" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-ink sm:h-20"
      />
    </div>
  )
}

function List({ children }) {
  return <ul className="list-disc space-y-1.5 pl-5 marker:text-white/30">{children}</ul>
}

const B = ({ children }) => <strong className="font-medium text-white/90">{children}</strong>

export default function ZentraHitsDeaths() {
  return (
    <ReportLayout
      cover={<Cover />}
      eyebrow="Zentra · Deep dive"
      title="What happens when you get shot"
      subtitle="Hit registration in a browser shooter."
      properties={PROPERTIES}
      sections={SECTIONS}
      action={
        <>
          <CTAButton href="/projects/zentra" variant="secondary">
            Back to Zentra report
          </CTAButton>
          <CTAButton href={ZENTRA.live} target="_blank" rel="noreferrer" variant="secondary">
            Play Zentra
          </CTAButton>
        </>
      }
    >
      <ReportSection id="intro" title="Introduction">
        <p>
          Zentra is a multiplayer third-person shooter that runs in a browser tab. No install, no download.
          You click a link and you’re in a forest with a gun.
        </p>
        <p>
          The hardest part of building it wasn’t the graphics. It was answering one question fairly, for every
          player at once: did that shot hit?
        </p>
        <p>This post walks through what happens between the moment you pull the trigger and the moment someone respawns.</p>
      </ReportSection>

      <ReportSection id="server-decides" title="The core rule: the server decides">
        <p>
          Every player’s browser sends its shots to a central server, and the server makes the call. Your
          browser never decides whether you hit someone, and it never decides how much health anyone has.
        </p>
        <p>
          This matters for two reasons. The first is fairness: if each player’s computer decided its own hits,
          two players could see two different versions of the same fight. The second is trust: a game that
          believes the client is a game that’s easy to cheat.
        </p>
        <p>So the server keeps every player’s health, and every screen shows a copy of the server’s number.</p>
      </ReportSection>

      <ReportSection id="trigger" title="Step 1: You pull the trigger">
        <p>
          When you fire, your browser builds a ray, an invisible straight line from the camera through the
          centre of your crosshair. The camera, the crosshair and the ray are all the same line, so the thing
          you’re aiming at is exactly what gets tested.
        </p>
        <p>
          Your browser plays the gunshot, the muzzle flash and the recoil straight away, so the game feels
          instant. Then it sends the shot to the server.
        </p>
      </ReportSection>

      <ReportSection id="rewind" title="Step 2: The server rewinds time">
        <p>
          There’s a gap between what you see and what the server knows. By the time your shot arrives, your
          target has already moved. If the server tested your shot against where they are <em>now</em>,
          you’d miss shots that were dead-on from your point of view.
        </p>
        <p>
          So the server keeps a short memory of where every player has been. When your shot arrives, it
          rewinds your target to where they were a fraction of a second earlier, closer to what you actually
          saw. This is called <B>lag compensation</B>, and it’s the reason shots feel fair even on an average
          connection.
        </p>
      </ReportSection>

      <ReportSection id="hit-test" title="Step 3: Did it actually hit?">
        <p>
          The server models each player’s body as an upright capsule, a cylinder with rounded ends. It then
          checks whether your ray passes through it.
        </p>
        <p>
          This sounds simple, and our first version got it wrong in an interesting way. In a third-person game,
          the camera sits above and behind your character, so most shots travel slightly <em>downward</em>. A
          shot on a perfect collision course often enters the body’s footprint above the head and only reaches
          the torso further along. The original check only looked at the single point where the ray first
          entered, so it threw away most real hits. Only perfectly centred shots counted.
        </p>
        <p>
          The fix was to treat the ray as a range instead of a point. The server works out the stretch of the
          ray inside the body’s footprint, and the stretch inside the body’s height, and counts a hit if those
          two stretches overlap. That one change is the difference between shooting feeling broken and feeling
          right.
        </p>
      </ReportSection>

      <ReportSection id="occlusion" title="Step 4: Was anything in the way?">
        <p>A hit only counts if nothing was blocking it. The server checks the line between you and your target against:</p>
        <List>
          <li>
            <B>Hills.</B> The terrain is generated from the same formula on the server and in every browser, so
            both sides agree on where the ground is without ever sending it over the network.
          </li>
          <li>
            <B>Tree canopies.</B> The wide lower branches act as real cover, and the crowns on top block shots too.
          </li>
          <li>
            <B>Tree trunks.</B> You can’t shoot through a tree.
          </li>
        </List>
        <p>
          There are hundreds of trees on the map. Their positions live in one shared file, read by both the
          server and the browser, so the trees you see are exactly the trees the server tests against.
        </p>
        <p>
          One bug here is worth a story of its own. Trunk detection once treated trees <em>behind</em> the
          shooter as obstacles. A shot with nothing between you and your target could be blocked by a tree
          you’d walked past. The fix came down to keeping a minus sign in a single calculation.
        </p>
      </ReportSection>

      <ReportSection id="damage" title="Step 5: Damage">
        <p>If the shot hits and nothing blocks it, the target loses 10 health. Then the server sends out four messages:</p>
        <ReportTable columns={['Recipient', 'Message', 'Effect']} rows={DAMAGE_ROWS} />
        <p>
          The person hit always receives their real health from the server. Their browser never calculates it.
          If a message is ever lost, the next hit puts their screen back in sync.
        </p>
        <p>The hit marker only appears when the server confirms the hit, so it doesn’t lie to you.</p>
      </ReportSection>

      <ReportSection id="respawn" title="Step 7: Respawn">
        <p>Five seconds later, the player comes back at full health, somewhere away from the action.</p>
        <p>
          Health also recovers on its own. If you go ten seconds without being hit, it climbs back by ten
          points a second until you’re full. Getting hit again restarts the clock, which keeps fights decisive
          and gives players a reason to break off and regroup.
        </p>
      </ReportSection>

      <ReportSection id="shield" title="A shield ability that can’t be cheated">
        <p>
          Pressing <kbd className="rounded border border-line px-1 font-mono text-xs text-white/80">Q</kbd> makes
          you invincible for five seconds, with a ten-second cooldown. The server enforces both. It keeps the
          time each player’s cooldown ends, and refuses to activate the ability early, no matter what the
          browser asks for. A modified client can’t spam it.
        </p>
      </ReportSection>

      <ReportSection id="storage" title="Where everything lives">
        <List>
          <li>
            <B>During a match</B>, every player’s health, kills and deaths sit in a fast in-memory database
            built for rapid updates.
          </li>
          <li>
            <B>When the ten-minute match ends</B>, each real player’s kills and deaths are added to their
            permanent profile, and the match data is cleared.
          </li>
        </List>
        <p>Match data is disposable and career stats are durable, and the two only meet once per match.</p>
      </ReportSection>

      <ReportSection id="takeaway" title="The takeaway">
        <p>Getting a shot to <em>feel</em> right in a browser comes from a handful of decisions:</p>
        <List>
          <li>One authority for health and life.</li>
          <li>A rewind for the delay players can’t avoid.</li>
          <li>A hit test that understands third-person aim.</li>
          <li>Terrain and trees that are identical on both sides without being sent over the network.</li>
          <li>A kill record that can’t be split or doubled.</li>
        </List>
        <p>
          None of it is visible when you play. You just notice that when you aim at someone and pull the
          trigger, they go down.
        </p>
      </ReportSection>
    </ReportLayout>
  )
}
