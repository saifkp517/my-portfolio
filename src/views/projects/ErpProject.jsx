'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import CTAButton from '../../components/CTAButton.jsx'
import ReportLayout, { ReportSection, ReportTable } from '../../components/report/ReportLayout.jsx'
import { META_COLORS } from '../../data/iconColors.js'

const PROPERTIES = [
  { label: 'Type', value: 'Case study / manufacturing', color: META_COLORS.time, d: 'M4 2.5h8v11H4v-11zM6 5.5h4M6 8h4M6 10.5h2' },
  { label: 'Client', value: 'Concrete block manufacturer', color: META_COLORS.role, d: 'M2.5 13.5h11M3.5 13.5v-7l4-2.5v9.5M7.5 7l5 2.5v4' },
  { label: 'Users', value: 'Watchman, salesperson, owner', color: META_COLORS.location, d: 'M8 7.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM3.5 13.5a4.5 4.5 0 019 0' },
  { label: 'Web app', value: 'Next.js', color: META_COLORS.email, d: 'M2.5 3.5h11v7h-11v-7zM6 13.5h4' },
  { label: 'Server', value: 'NestJS', color: META_COLORS.phone, d: 'M3 3.5h10v3.5H3V3.5zM3 9h10v3.5H3V9z' },
  { label: 'Database', value: 'PostgreSQL (TypeORM)', color: META_COLORS.stack, d: 'M3 4.5c0-1.1 2.2-2 5-2s5 .9 5 2-2.2 2-5 2-5-.9-5-2zM3 4.5v7c0 1.1 2.2 2 5 2s5-.9 5-2v-7' },
  { label: 'Platform', value: 'Supabase', color: META_COLORS.location, d: 'M9 2L4 9h4l-1 5 5-7H8l1-5z' },
  { label: 'Dashboards', value: 'Metabase', color: META_COLORS.role, d: 'M3 13V9M8 13V3M13 13V6' },
]

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'change', label: 'The change' },
  { id: 'outcome', label: 'The outcome' },
  { id: 'approach', label: 'The approach' },
  { id: 'product', label: 'The product' },
  { id: 'talk', label: 'Let’s talk' },
]

const OUTCOMES = [
  ['Time', 'The weekend audit went from 4–6 hours to about 20 minutes, giving someone their weekend hours back.'],
  ['Visibility', 'Live dashboards give the owner a clearer view of earnings and performance.'],
  ['Trust in the numbers', 'Entries are recorded once, cross-checked and no longer retyped from notebook photos.'],
]

const MODULES = [
  ['Watchman + Billing', 'Compare what left the factory with what was sold, and flag differences for review.'],
  ['Trucks', 'Keep arrivals, departures and loads connected to dispatch records.'],
  ['Users & Permissions', 'Give each person access to the work they need to do.'],
  ['Ageing Report', 'See which payments are outstanding and how long they have been due.'],
  ['Reporting', 'Give the owner a live view of business performance through Metabase dashboards.'],
]

const STEPS = [
  'I spoke to the watchman, salesperson and owner separately before writing code.',
  'I mapped the whole paper trail, including the photo-to-Excel step nobody thought of as part of the process.',
  'I designed each screen around what that person already did on paper, making the change easier to adopt.',
]

function AuditMinutes() {
  const [minutes, setMinutes] = useState(20)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame
    const start = performance.now()
    const tick = (now) => {
      const progress = Math.min((now - start) / 800, 1)
      setMinutes(Math.round(20 * progress))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])
  return <span aria-hidden="true" className="erp-metric text-lg font-semibold text-accent-500">~{minutes} min</span>
}

function DemoVideo() {
  const container = useRef(null)
  const [visible, setVisible] = useState(false)
  const [failed, setFailed] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect() }
    }, { rootMargin: '200px' })
    if (container.current) observer.observe(container.current)
    return () => observer.disconnect()
  }, [])
  return (
    <div ref={container} className="relative overflow-hidden bg-ink">
      {visible && !failed ? (
        <video className="aspect-video w-full object-cover" autoPlay muted loop playsInline controls preload="none" poster="/images/erp-demo-poster.svg" onError={() => setFailed(true)} aria-label="ERP demo video">
          <source src="/videos/erp-demo.mp4" type="video/mp4" onError={() => setFailed(true)} />
          <track kind="captions" src="/videos/erp-demo.vtt" srcLang="en" label="English" />
        </video>
      ) : (
        <div className="relative aspect-video">
          <Image src="/images/erp-demo-poster.svg" alt="Illustration of the ERP workflow from factory records to an owner dashboard" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 1024px" />
          {failed && <span className="absolute bottom-4 left-4 rounded-sm bg-black/80 px-3 py-2 font-mono text-xs text-white/80">Demo video coming soon</span>}
        </div>
      )}
    </div>
  )
}

function Flow({ items }) {
  return (
    <p className="font-mono text-xs text-white/60">
      {items.join(' → ')}
    </p>
  )
}

function ChangeBlock({ label, title, time, flow, children }) {
  return (
    <div className="border-t border-line pt-4">
      <p className="font-mono text-xs uppercase tracking-widest text-white/55">{label}</p>
      <h3 className="mt-1.5 font-display text-sm font-semibold tracking-tight text-white">{title}</h3>
      <p className="mt-2">{children}</p>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
        <Flow items={flow} />
        <p className="font-mono text-xs text-white/75">{time}</p>
      </div>
    </div>
  )
}

export default function ErpProject() {
  return (
    <ReportLayout
      cover={<DemoVideo />}
      eyebrow="Project report"
      title="From handwritten notebooks to a 20-minute weekly audit."
      subtitle="Custom ERP for a concrete block manufacturer"
      properties={PROPERTIES}
      sections={SECTIONS}
      action={
        <div
          className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-mono"
          aria-label="4 to 6 hours to approximately 20 minutes every weekend"
        >
          <span className="text-lg text-white/65">4–6 hrs</span>
          <span aria-hidden="true" className="text-accent-500">→</span>
          <AuditMinutes />
          <span className="text-xs text-white/55">every weekend</span>
        </div>
      }
    >
      <ReportSection id="overview" title="Overview">
        <p>Built for an owner who needed a clear view of what was happening in his business.</p>
        <p>This project aims to solve a real problem, and doesn&rsquo;t fully demonstrate my tech skills or potential.</p>
      </ReportSection>

      <ReportSection id="change" title="From paper trails to a clearer picture.">
        <ChangeBlock
          label="Before"
          title="A weekend spent piecing it together"
          time="4–6 hours every weekend"
          flow={['Notebooks', 'Photos', 'Excel', 'Reports']}
        >
          The watchman recorded what left the factory. The salesperson recorded what was sold. Both sent
          photos of their notebooks to the office, where someone retyped the entries into Excel and built
          reports by hand for the owner.
        </ChangeBlock>
        <ChangeBlock
          label="After"
          title="One entry, a live view"
          time="About 20 minutes every weekend"
          flow={['Two roles', 'One system', 'Dashboard']}
        >
          The watchman and salesperson each log their entries once in a simple web app. The system
          cross-checks the records, flags mismatches, calculates performance and builds reports. The owner
          gets live Metabase dashboards.
        </ChangeBlock>
      </ReportSection>

      <ReportSection id="outcome" title="What it meant for the owner.">
        <ReportTable columns={['Area', 'Result']} rows={OUTCOMES} />
      </ReportSection>

      <ReportSection id="approach" title="Understand the work first.">
        <ol className="divide-y divide-line border-y border-line">
          {STEPS.map((step, i) => (
            <li key={step} className="flex gap-4 py-3">
              <span className="pt-1 font-mono text-xs text-white/55">0{i + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </ReportSection>

      <ReportSection id="product" title="What I built.">
        <p>A set of practical tools for the people doing the work and the owner keeping track of it.</p>
        <ReportTable columns={['Module', 'What it does']} rows={MODULES} />
      </ReportSection>

      <ReportSection id="talk" title="Want something like this for your business?">
        <p>Tell me what is slowing your team down. I&rsquo;d be happy to show you how this works.</p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1">
          <CTAButton href="https://www.linkedin.com/in/saifullah-khan-1059aa236/" target="_blank" rel="noreferrer">
            Request a demo
          </CTAButton>
          <p className="font-mono text-xs text-white/55">Screens shown use anonymized demo data.</p>
        </div>
      </ReportSection>
    </ReportLayout>
  )
}
