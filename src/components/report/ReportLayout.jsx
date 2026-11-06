'use client'

import { useMemo } from 'react'
import Footer from '../Footer.jsx'
import MetaRow from '../MetaRow.jsx'
import FullBleedRule from '../frame/FullBleedRule.jsx'
import RailColumn from '../frame/RailColumn.jsx'
import ProjectHeader from '../projects/ProjectHeader.jsx'
import useActiveSection from '../../hooks/useActiveSection.js'
import ReadingProgress from './ReadingProgress.jsx'
import { ReportTOCDesktop, ReportTOCMobile } from './ReportTOC.jsx'

function PropertyIcon({ d }) {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d={d} stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// Shared project report: the hero's rows (cover, title, meta grid, action),
// then the body beside its table of contents.
export default function ReportLayout({ cover, eyebrow, title, status, subtitle, properties, action, sections, children }) {
  const ids = useMemo(() => sections.map((s) => s.id), [sections])
  const activeId = useActiveSection(ids)

  return (
    <div id="top">
      <ReadingProgress />
      <ProjectHeader />
      <main>
        <RailColumn>
          {cover}

          <FullBleedRule />

          <div className="hero-enter px-5 py-5 sm:px-6">
            <p className="font-mono text-xs uppercase tracking-widest text-white/55">{eyebrow}</p>
            <h1 className="mt-2 flex items-center gap-2 text-balance font-body text-xl font-medium leading-tight tracking-tight text-white sm:text-[32px]">
              {title}
              {status && (
                <span
                  className="h-2 w-2 shrink-0 rounded-full bg-white/30"
                  role="img"
                  aria-label={status}
                  title={status}
                />
              )}
            </h1>
            <p className="mt-1 font-mono text-xs text-white/60">{subtitle}</p>
          </div>

          <FullBleedRule />

          <div className="hero-enter grid grid-cols-1 sm:grid-cols-2" style={{ animationDelay: '70ms' }}>
            {properties.map((p, i) => (
              <MetaRow
                key={p.label}
                label={p.label}
                color={p.color}
                icon={<PropertyIcon d={p.d} />}
                rightBorder={i % 2 === 0}
              >
                {p.value}
              </MetaRow>
            ))}
          </div>

          <div
            className="hero-enter flex flex-wrap items-center gap-x-4 gap-y-2 px-5 py-4 sm:px-6"
            style={{ animationDelay: '130ms' }}
          >
            {action}
          </div>

          <FullBleedRule />

          <ReportTOCMobile sections={sections} />

          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_200px]">
            <article className="min-w-0 px-5 py-10 sm:px-6">{children}</article>
            <aside className="border-l border-line max-lg:hidden">
              <ReportTOCDesktop sections={sections} activeId={activeId} />
            </aside>
          </div>

          <FullBleedRule />
          <Footer />
        </RailColumn>
      </main>
    </div>
  )
}

export function ReportSection({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-24 pt-10 first:pt-0">
      <h2 className="font-display text-lg font-semibold tracking-tight text-white">{title}</h2>
      <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-white/70">{children}</div>
    </section>
  )
}

// First column is the row header, the last is prose, any between are mono.
export function ReportTable({ columns, rows }) {
  const last = columns.length - 1
  return (
    <div className="thin-scrollbar overflow-x-auto border-y border-line">
      <table className={`w-full border-collapse text-left text-sm ${columns.length > 2 ? 'min-w-[30rem]' : ''}`}>
        <thead className="font-mono text-xs uppercase tracking-widest text-white/55">
          <tr className="border-b border-line">
            {columns.map((h) => (
              <th key={h} scope="col" className="py-3 pr-4 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {rows.map(([head, ...cells]) => (
            <tr key={head}>
              <th scope="row" className="py-3 pr-4 align-top font-normal text-white/75">
                {head}
              </th>
              {cells.map((cell, i) => (
                <td
                  key={i}
                  className={i + 1 === last ? 'py-3 align-top text-white/60' : 'py-3 pr-4 align-top font-mono text-xs text-white/75'}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
