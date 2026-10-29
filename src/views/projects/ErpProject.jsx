'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Chip from '../../components/Chip.jsx'
import CTAButton from '../../components/CTAButton.jsx'
import Reveal from '../../components/Reveal.jsx'
import Footer from '../../components/Footer.jsx'
import ProjectHeader from '../../components/projects/ProjectHeader.jsx'

const modules = [
  { title: 'Watchman + Billing', desc: 'Compare what left the factory with what was sold, and flag differences for review.' },
  { title: 'Trucks', desc: 'Keep arrivals, departures and loads connected to dispatch records.' },
  { title: 'Users & Permissions', desc: 'Give each person access to the work they need to do.' },
  { title: 'Ageing Report', desc: 'See which payments are outstanding and how long they have been due.' },
  { title: 'Reporting', desc: 'Give the owner a live view of business performance through Metabase dashboards.' },
]

const steps = [
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
  return <span aria-hidden="true" className="erp-metric text-2xl font-semibold text-accent-500 sm:text-3xl">~{minutes} min</span>
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
    <div ref={container} className="relative overflow-hidden rounded-xl border border-white/10 bg-[#111b1a]">
      {visible && !failed ? (
        <video className="aspect-video w-full object-cover" autoPlay muted loop playsInline controls preload="none" poster="/images/erp-demo-poster.svg" onError={() => setFailed(true)} aria-label="ERP demo video">
          <source src="/videos/erp-demo.mp4" type="video/mp4" onError={() => setFailed(true)} />
          <track kind="captions" src="/videos/erp-demo.vtt" srcLang="en" label="English" />
        </video>
      ) : (
        <div className="relative aspect-video">
          <Image src="/images/erp-demo-poster.svg" alt="Illustration of the ERP workflow from factory records to an owner dashboard" fill className="object-cover" sizes="(max-width: 1152px) 100vw, 1152px" />
          {failed && <span className="absolute bottom-4 left-4 rounded bg-black/80 px-3 py-2 font-mono text-xs text-white/80">Demo video coming soon</span>}
        </div>
      )}
    </div>
  )
}

const sectionLabel = 'font-mono text-xs uppercase tracking-[0.18em] text-accent-400'
const sectionTitle = 'mt-3 max-w-3xl font-display text-2xl font-semibold leading-snug tracking-tight text-white sm:text-3xl'

export default function ErpProject() {
  return (
    <div className="min-h-screen bg-ink">
      <ProjectHeader />
      <main className="mx-auto max-w-content px-5 pb-16 pt-14 sm:px-8 sm:pt-20">
        <section>
          <Reveal><p className={sectionLabel}>Case study / manufacturing</p></Reveal>
          <Reveal delay={60}><h1 className="mt-5 max-w-5xl text-balance font-display text-3xl font-semibold leading-[1.2] tracking-tight text-white sm:text-5xl lg:text-6xl">From handwritten notebooks to a <span className="text-accent-500">20-minute weekly audit.</span></h1></Reveal>
          <Reveal delay={100}><p className="mt-6 text-lg text-white/85 sm:text-xl">Custom ERP for a concrete block manufacturer</p><p className="mt-2 max-w-2xl text-sm leading-6 text-white/50">This project aims to solve a real problem, and doesn't fully demonstrate my tech skills or potential.</p></Reveal>
          <Reveal delay={120}><div className="mt-8 inline-flex max-w-full flex-wrap items-baseline gap-x-3 gap-y-1 border-l-2 border-accent-500 pl-5 font-mono" aria-label="4 to 6 hours to approximately 20 minutes every weekend"><span className="text-xl text-white/65 sm:text-2xl">4–6 hrs</span><span aria-hidden="true" className="text-accent-500">→</span><AuditMinutes /><span className="w-full text-sm text-white/65 sm:w-auto">every weekend</span></div></Reveal>
          <Reveal delay={140}><p className="mt-6 max-w-2xl text-base leading-7 text-white/65">Built for an owner who needed a clear view of what was happening in his business.</p></Reveal>
        </section>

        <section className="mt-12 grid items-start gap-6 sm:mt-16 lg:grid-cols-2" aria-label="ERP demo and workflow"><div><DemoVideo /><p className="mt-3 font-mono text-xs text-white/50">ERP product demo</p></div><div className="overflow-hidden rounded-xl border border-white/10 bg-[#111b1a]"><Image src="/images/erp-demo-poster.svg" alt="Workflow: watchman and sales records flow into one system and an owner dashboard" width={1200} height={675} className="h-full w-full object-cover" sizes="(max-width: 1024px) 100vw, 50vw" /></div></section>

        <section className="mt-20 sm:mt-28">
          <Reveal><p className={sectionLabel}>01 / The change</p><h2 className={sectionTitle}>From paper trails to a clearer picture.</h2></Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Reveal><article className="h-full rounded-xl border border-white/10 bg-panel p-6 sm:p-8"><p className="font-mono text-sm text-white/60">BEFORE</p><h3 className="mt-3 font-display text-xl text-white">A weekend spent piecing it together</h3><p className="mt-4 text-base leading-7 text-white/70">The watchman recorded what left the factory. The salesperson recorded what was sold. Both sent photos of their notebooks to the office, where someone retyped the entries into Excel and built reports by hand for the owner.</p><div className="mt-7 flex flex-wrap items-center gap-2 font-mono text-xs text-white/60" aria-label="Notebooks, then photos, then Excel, then reports">{['Notebooks', 'Photos', 'Excel', 'Reports'].map((item, i) => <span key={item} className="contents">{i > 0 && <span aria-hidden="true" className="text-white/30">→</span>}<span className={`rounded border border-white/15 px-3 py-2 ${i % 2 ? 'rotate-2' : '-rotate-1'}`}>{item}</span></span>)}</div><p className="mt-6 font-mono text-sm text-white/65">4–6 hours every weekend</p></article></Reveal>
            <Reveal delay={80}><article className="h-full rounded-xl border border-accent-500/25 bg-accent-500/[0.04] p-6 sm:p-8"><p className="font-mono text-sm text-accent-400">AFTER</p><h3 className="mt-3 font-display text-xl text-white">One entry, a live view</h3><p className="mt-4 text-base leading-7 text-white/70">The watchman and salesperson each log their entries once in a simple web app. The system cross-checks the records, flags mismatches, calculates performance and builds reports. The owner gets live Metabase dashboards.</p><div className="mt-7 flex flex-wrap items-center gap-2 font-mono text-xs text-white/75" aria-label="Watchman and salesperson, then one system, then dashboard"><span className="rounded border border-accent-500/30 px-3 py-2">Two roles</span><span aria-hidden="true" className="text-accent-500">→</span><span className="rounded border border-accent-500/30 px-3 py-2">One system</span><span aria-hidden="true" className="text-accent-500">→</span><span className="rounded border border-accent-500/30 px-3 py-2">Dashboard</span></div><p className="mt-6 font-mono text-sm text-accent-400">About 20 minutes every weekend</p></article></Reveal>
          </div>
        </section>

        <section className="mt-20 sm:mt-28"><Reveal><p className={sectionLabel}>02 / The outcome</p><h2 className={sectionTitle}>What it meant for the owner.</h2></Reveal><div className="mt-8 grid gap-4 md:grid-cols-3">{[
          ['Time', 'The weekend audit went from 4–6 hours to about 20 minutes, giving someone their weekend hours back.'],
          ['Visibility', 'Live dashboards give the owner a clearer view of earnings and performance.'],
          ['Trust in the numbers', 'Entries are recorded once, cross-checked and no longer retyped from notebook photos.'],
        ].map(([title, desc], i) => <Reveal key={title} delay={i * 60}><article className="h-full rounded-xl border border-white/10 bg-panel p-6"><h3 className="font-mono text-lg text-white">{title}</h3><p className="mt-3 text-base leading-7 text-white/70">{desc}</p></article></Reveal>)}</div></section>

        <section className="mt-20 sm:mt-28"><Reveal><p className={sectionLabel}>03 / The approach</p><h2 className={sectionTitle}>Understand the work first.</h2></Reveal><div className="mt-8 max-w-3xl border-l border-white/15">{steps.map((step, i) => <Reveal key={step}><div className="relative pb-8 pl-8 last:pb-0"><span className="absolute -left-[17px] top-0 flex h-8 w-8 items-center justify-center rounded-full border border-accent-500/40 bg-ink font-mono text-xs text-accent-400">0{i + 1}</span><p className="pt-1 text-base leading-7 text-white/75">{step}</p></div></Reveal>)}</div></section>

        <section className="mt-20 sm:mt-28"><Reveal><p className={sectionLabel}>04 / The product</p><h2 className={sectionTitle}>What I built.</h2><p className="mt-4 max-w-2xl text-base leading-7 text-white/65">A set of practical tools for the people doing the work and the owner keeping track of it.</p></Reveal><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{modules.map((module, i) => <Reveal key={module.title}><article className="h-full rounded-xl border border-white/10 bg-panel p-6"><span className="font-mono text-xs text-accent-400">0{i + 1}</span><h3 className="mt-4 font-mono text-lg font-semibold text-white">{module.title}</h3><p className="mt-3 text-base leading-7 text-white/65">{module.desc}</p></article></Reveal>)}</div></section>

        <Reveal><section className="mt-20 rounded-xl border border-accent-500/25 bg-accent-500/[0.05] p-6 sm:mt-28 sm:p-10"><p className={sectionLabel}>Let’s talk</p><h2 className="mt-3 font-display text-2xl font-semibold leading-snug sm:text-3xl">Want something like this for your business?</h2><p className="mt-4 max-w-2xl text-base leading-7 text-white/70">Tell me what is slowing your team down. I’d be happy to show you how this works.</p><div className="mt-6 flex flex-wrap gap-3"><CTAButton href="https://www.linkedin.com/in/saifullah-khan-1059aa236/" target="_blank" rel="noreferrer">Request a demo</CTAButton></div><p className="mt-5 text-sm text-white/50">Screens shown use anonymized demo data.</p></section></Reveal>
        <section className="mt-12 border-t border-white/10 pt-8"><p className="font-mono text-xs uppercase tracking-widest text-white/50">Built with</p><div className="mt-4 flex flex-wrap gap-2">{['Next.js', 'NestJS', 'PostgreSQL (TypeORM)', 'Supabase', 'Metabase'].map((item) => <Chip key={item}>{item}</Chip>)}</div><Link href="/#projects" className="mt-10 inline-flex font-mono text-sm text-white/60 transition-colors hover:text-accent-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-500">← Back to projects</Link></section>
      </main>
      <Footer />
    </div>
  )
}







