'use client'

import CTAButton from '../../components/CTAButton.jsx'
import ReportLayout, { ReportSection, ReportTable } from '../../components/report/ReportLayout.jsx'
import { META_COLORS } from '../../data/iconColors.js'
import ArticleList from '../../components/report/ArticleList.jsx'
import { projects } from '../../data/projects.js'

const ZENTRA = projects.find((p) => p.key === 'zentra')

const PROPERTIES = [
  { label: 'Status', value: 'Discontinued pet project', color: META_COLORS.time, d: 'M8 2.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM8 5v3.2' },
  { label: 'Client', value: 'Next.js + React Three Fiber', color: META_COLORS.role, d: 'M2.5 3.5h11v7h-11v-7zM6 13.5h4' },
  { label: 'Server', value: 'NestJS', color: META_COLORS.location, d: 'M3 3.5h10v3.5H3V3.5zM3 9h10v3.5H3V9z' },
  { label: 'Realtime', value: 'socket.io', color: META_COLORS.email, d: 'M9 2L4 9h4l-1 5 5-7H8l1-5z' },
  { label: 'Profile data', value: 'REST', color: META_COLORS.phone, d: 'M3 5h8.5M9 2.5L11.5 5 9 7.5M13 11H4.5M7 8.5L4.5 11 7 13.5' },
  { label: 'Auth', value: 'Supabase', color: META_COLORS.stack, d: 'M4 7.5h8v6H4v-6zM5.5 7.5V5a2.5 2.5 0 015 0v2.5' },
  { label: 'Match state', value: 'Redis', color: META_COLORS.location, d: 'M8 2.5l5.5 2.75L8 8 2.5 5.25 8 2.5zM2.5 8.75L8 11.5l5.5-2.75' },
  { label: 'Lifetime stats', value: 'Postgres via TypeORM', color: META_COLORS.role, d: 'M3 13V9M8 13V3M13 13V6' },
]

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'authority', label: 'Authority model' },
  { id: 'state', label: 'Where state lives' },
  { id: 'match', label: 'Match lifecycle' },
  { id: 'articles', label: 'Articles' },
  { id: 'status', label: 'Status' },
]

const STATE_ROWS = [
  ['Hits and deaths', 'Server', 'Authoritative'],
  ['Player position', 'Client', 'Reported every frame; the server stores and rebroadcasts it'],
  ['Current match', 'Redis', 'Current match only'],
  ['Lifetime kills, deaths, match counts', 'Postgres', 'Via TypeORM'],
  ['Login', 'Supabase', 'Handles login'],
]

function Cover() {
  return (
    <div className="relative aspect-[21/9] overflow-hidden bg-ink">
      <img
        src={ZENTRA.cover}
        alt="Zentra gameplay in a voxel forest"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-ink sm:h-20"
      />
    </div>
  )
}

export default function ZentraProject() {
  return (
    <ReportLayout
      cover={<Cover />}
      eyebrow="Project report"
      title="Zentra"
      status="Discontinued"
      subtitle="A browser third-person arena shooter."
      properties={PROPERTIES}
      sections={SECTIONS}
      action={
        <>
          <CTAButton href={ZENTRA.live} target="_blank" rel="noreferrer" variant="secondary">
            Play Zentra
          </CTAButton>
          <CTAButton href="https://github.com/saifkp517/vynix" target="_blank" rel="noreferrer" variant="secondary">
            View on GitHub
          </CTAButton>
          <p className="font-mono text-xs text-white/55">Pet project. Discontinued, no further development.</p>
        </>
      }
    >
      <ReportSection id="overview" title="Overview">
        <p>
          Zentra is a browser third-person arena shooter. A Next.js + React Three Fiber client renders a
          forest map. A NestJS server runs the match. The two talk over one socket.io connection for
          everything real-time, and over REST for durable profile data. Supabase handles login. Redis
          holds only the current match. Postgres (via TypeORM) holds only lifetime kills, deaths and
          match counts.
        </p>
      </ReportSection>

      <ReportSection id="authority" title="Authority model">
        <p>
          The server is authoritative about who got hit and whether they died. It is not authoritative
          about where players are: the client reports its position every frame and the server stores and
          rebroadcasts it. Shots are hit-tested on the server, rewound slightly for the shooter, and can
          be vetoed by terrain and trees. Bots are ordinary player records driven by the same movement
          and combat functions a socket would call. The client has no bot-specific code.
        </p>
      </ReportSection>

      <ReportSection id="state" title="Where state lives">
        <ReportTable columns={['State', 'Owner', 'Notes']} rows={STATE_ROWS} />
      </ReportSection>

      <ReportSection id="match" title="Match lifecycle">
        <p>
          A match lasts 10 minutes. A new room starts with five bots, and later players join the existing
          room, so a match is a rolling world rather than a fixed lobby.
        </p>
      </ReportSection>

      <ReportSection id="articles" title="Articles">
        <ArticleList project="zentra" />
      </ReportSection>

      <ReportSection id="status" title="Status">
        <p>Zentra was a pet project and is discontinued from further development.</p>
      </ReportSection>
    </ReportLayout>
  )
}
