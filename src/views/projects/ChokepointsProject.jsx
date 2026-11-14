'use client'

import ReportLayout, { ReportSection } from '../../components/report/ReportLayout.jsx'
import CoverPlaceholder from '../../components/report/CoverPlaceholder.jsx'
import { B, List } from '../../components/report/Prose.jsx'
import { META_COLORS } from '../../data/iconColors.js'
import { posts } from '../../data/posts.js'

const SAMPLER = posts.find((p) => p.key === 'chokepoints-sampler')

const PROPERTIES = [
  { label: 'Status', value: 'In progress · exploratory', color: META_COLORS.time, d: 'M8 2.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM8 5v3.2' },
  { label: 'Regions', value: 'Hormuz, Red Sea, Gulf, Arabian Sea', color: META_COLORS.location, d: 'M8 14s4.5-4 4.5-7.5a4.5 4.5 0 00-9 0C3.5 10 8 14 8 14zM8 8a1.5 1.5 0 100-3 1.5 1.5 0 000 3z' },
  { label: 'Sources', value: 'GDELT, Bluesky, AIS, UKMTO', color: META_COLORS.role, d: 'M8 2.5l5.5 2.75L8 8 2.5 5.25 8 2.5zM2.5 8.75L8 11.5l5.5-2.75' },
  { label: 'Built so far', value: 'The sampler', color: META_COLORS.email, d: 'M3.5 8.5l3 3 6-7' },
]

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'sources', label: 'Data sources' },
  { id: 'idea', label: 'The idea' },
  { id: 'system', label: 'Planned system' },
  { id: 'status', label: 'Status' },
]

// The planned pipeline. Only the sampler exists today.
const STAGES = [
  { name: 'Data sources', detail: 'GDELT GKG news, Bluesky posts, AIS ship positions, UKMTO alerts', built: false },
  { name: 'Filtering', detail: 'News by coordinates around each area; social posts by keywords', built: false },
  { name: 'Spike detection', detail: 'Notice when activity jumps', built: false },
  { name: 'Sampler', detail: 'Turns thousands of headlines into a short, ranked report of topics', built: true, href: SAMPLER.to },
  { name: 'Study alongside AIS + UKMTO', detail: 'Compare what the news says with what ships and maritime alerts are doing', built: false },
]

function StageBadge({ built }) {
  return built ? (
    <span className="rounded-sm border border-accent-500/40 bg-accent-500/10 px-2 py-0.5 font-mono text-[11px] tracking-wide text-accent-400">
      Built
    </span>
  ) : (
    <span className="rounded-sm border border-dashed border-white/20 px-2 py-0.5 font-mono text-[11px] tracking-wide text-white/50">
      Planned
    </span>
  )
}

function Pipeline() {
  return (
    <ol className="border-y border-line" aria-label="Planned system, in order">
      {STAGES.map((s, i) => (
        <li key={s.name} className="flex gap-3 border-b border-line py-3 last:border-b-0">
          <span className="flex w-6 shrink-0 flex-col items-center" aria-hidden="true">
            <span className="font-mono text-xs text-white/40">{String(i + 1).padStart(2, '0')}</span>
            {i < STAGES.length - 1 && <span className="mt-1 font-mono text-xs text-white/25">↓</span>}
          </span>
          <span className="min-w-0 flex-1">
            <span className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-sm font-semibold text-white/85">
                {s.href ? (
                  <a href={s.href} className="underline decoration-white/25 underline-offset-4 transition-colors hover:text-accent-400">
                    {s.name}
                  </a>
                ) : (
                  s.name
                )}
              </span>
              <StageBadge built={s.built} />
            </span>
            <span className="mt-1 block font-mono text-xs leading-relaxed text-white/55">{s.detail}</span>
          </span>
        </li>
      ))}
    </ol>
  )
}

export default function ChokepointsProject() {
  return (
    <ReportLayout
      cover={<CoverPlaceholder />}
      eyebrow="Project report · In progress"
      title="Maritime choke points"
      status="In progress"
      subtitle="How news, social media and shipping data around maritime choke points relate."
      properties={PROPERTIES}
      sections={SECTIONS}
      action={
        <p className="font-mono text-xs text-white/55">Currently building. Exploratory, and the direction may change.</p>
      }
    >
      <ReportSection id="overview" title="Overview">
        <p>
          I’m studying how news, social media and shipping data around the world’s maritime choke points relate
          to each other: the <B>Strait of Hormuz</B>, the <B>Red Sea</B>, the <B>Arabian Peninsula / Gulf</B> and
          the <B>Arabian Sea</B>.
        </p>
      </ReportSection>

      <ReportSection id="sources" title="Data sources">
        <List>
          <li>
            <B>GDELT GKG</B>: global news, filtered by coordinates around these areas
          </li>
          <li>
            <B>Bluesky</B>: social posts, filtered by keywords
          </li>
          <li>
            <B>AIS feeds</B>: how ships are actually moving
          </li>
          <li>
            <B>UKMTO alerts</B>: maritime security incident reports
          </li>
        </List>
      </ReportSection>

      <ReportSection id="idea" title="The idea">
        <p>
          Watch these streams, detect <B>spikes</B> in activity, and when a spike happens, read what the news is
          saying and compare it with what ships and maritime alerts are doing at the same time.
        </p>
        <p>
          Honestly, we don’t yet know how these signals relate, or where the project will end up. We’re building
          it because we’re curious, and building it is how we find out.
        </p>
      </ReportSection>

      <ReportSection id="system" title="Planned system">
        <p>A high-level sketch of where this is heading. Only the sampler is built; everything else is planned.</p>
        <Pipeline />
      </ReportSection>

      <ReportSection id="status" title="Status">
        <p>In progress and exploratory. There are no results to report yet.</p>
      </ReportSection>
    </ReportLayout>
  )
}
