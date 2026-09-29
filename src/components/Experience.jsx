import { useState } from 'react'
import Chip from './Chip.jsx'
import Reveal from './Reveal.jsx'

const roles = [
  {
    company: 'Aithur',
    initials: 'AI',
    location: 'Australia',
    remote: true,
    role: 'Software Engineer',
    type: 'Full-time',
    start: '09.2025',
    end: '∞',
    duration: '1y',
    bullets: [
      'Rescued a stalled e-commerce backend (Medusa/Node.js), shipping it to production in 4 months.',
      'Fixed Vercel serverless timeouts by migrating the backend to a self-managed VPS in 3 days.',
      'Built a RAG support/sales bot with Python, LlamaIndex and the OpenAI API.',
      'Shipped a PostHog → PostgreSQL → GrowthBook analytics pipeline in 1.5 weeks.',
    ],
    tags: ['Node.js', 'Medusa', 'Vercel', 'Linux/VPS', 'Python', 'LlamaIndex', 'GrowthBook'],
  },
  {
    company: 'Automate Accounts',
    initials: 'AA',
    location: 'Mumbai, India',
    remote: false,
    role: 'Applications Developer (Zoho CRM Intern)',
    type: 'Internship',
    start: '12.2024',
    end: '05.2025',
    duration: '6m',
    bullets: [
      'Synced Zoho CRM records into MongoDB for auditability across 3 apps.',
      'Automated report generation and record cleanup via CRM webhooks and cron jobs.',
      'Automated 10+ manual logging workflows with Zoho Flow.',
    ],
    tags: ['Zoho CRM', 'MongoDB', 'Webhooks', 'Zoho Flow'],
  },
]

function CodeIcon() {
  return (
    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-line bg-white/[0.04] text-white/50">
      <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M5.5 3.5L2 8l3.5 4.5M10.5 3.5L14 8l-3.5 4.5"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}

function ExperienceRow({ item, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="py-6 first:pt-0 last:pb-0">
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <div className="flex items-center gap-2.5">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-500/15 font-mono text-[9px] font-semibold text-accent-400">
            {item.initials}
          </span>
          <h3 className="font-mono text-sm font-semibold text-white">{item.company}</h3>
        </div>
        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-white/40">
          {item.location}
          {item.remote ? ' (Remote)' : ' (On-site)'}
          <span className={`h-1.5 w-1.5 rounded-full ${item.remote ? 'bg-accent-500' : 'bg-white/30'}`} />
        </span>
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="mt-3 flex w-full items-center justify-between gap-4 text-left"
      >
        <div className="flex min-w-0 items-center gap-2">
          <CodeIcon />
          <span className="truncate font-display text-sm font-semibold tracking-tight text-white sm:text-base">
            {item.role}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-2 font-mono text-[11px] text-white/40">
          <span className="hidden sm:inline">
            {item.type} · {item.start}–{item.end} · {item.duration}
          </span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            className={`shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          >
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </button>
      <p className="mt-1 pl-7 font-mono text-[11px] text-white/40 sm:hidden">
        {item.type} · {item.start}–{item.end} · {item.duration}
      </p>

      <div
        className={`grid transition-all duration-300 ease-out ${
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <ul className="mt-3 space-y-2 pl-7 text-[13px] leading-relaxed text-white/60">
            {item.bullets.map((b, i) => (
              <li key={i} className="flex gap-2.5">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/25" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex flex-wrap gap-1.5 pl-7">
            {item.tags.map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-accent-400">Experience</p>
        </Reveal>
        <Reveal delay={60}>
          <h2 className="mt-3 max-w-2xl text-balance font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl">
            What I've been building on the job
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-10 divide-y divide-line rounded-xl border border-line bg-panel px-5 sm:px-6">
            {roles.map((item, i) => (
              <ExperienceRow key={item.company} item={item} defaultOpen={i === 0} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
