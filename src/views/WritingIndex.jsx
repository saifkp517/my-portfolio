'use client'

import { useState } from 'react'
import Nav from '../components/Nav.jsx'
import Footer from '../components/Footer.jsx'
import PostRow from '../components/PostRow.jsx'
import RailColumn from '../components/frame/RailColumn.jsx'
import FullBleedRule from '../components/frame/FullBleedRule.jsx'
import { projects } from '../data/projects.js'
import { posts } from '../data/posts.js'

function FilterChip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-md border px-2.5 py-1 font-mono text-[11px] tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 ${
        active
          ? 'border-accent-500/40 bg-accent-500/10 text-accent-400'
          : 'border-white/12 bg-white/[0.03] text-white/60 hover:text-white'
      }`}
    >
      {children}
    </button>
  )
}

export default function WritingIndex() {
  const [project, setProject] = useState(null)
  const [tag, setTag] = useState(null)

  const tags = [...new Set(posts.flatMap((p) => p.tags))]
  const shown = posts.filter(
    (p) => (!project || p.project === project) && (!tag || p.tags.includes(tag)),
  )

  return (
    <>
      <Nav />
      <main className="pt-[53px]">
        <RailColumn>
          <section className="px-5 py-12 sm:px-6 sm:py-16">
            <p className="font-mono text-xs uppercase tracking-widest text-white/55">Writing</p>
            <h1 className="mt-3 text-balance font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
              Every article, by project.
            </h1>

            <div className="mt-6 space-y-3">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="mr-1 w-14 font-mono text-xs text-white/40">Project</span>
                <FilterChip active={!project} onClick={() => setProject(null)}>
                  All
                </FilterChip>
                {projects.map((p) => (
                  <FilterChip
                    key={p.key}
                    active={project === p.key}
                    onClick={() => setProject(project === p.key ? null : p.key)}
                  >
                    {p.label ?? p.title}
                  </FilterChip>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="mr-1 w-14 font-mono text-xs text-white/40">Tag</span>
                <FilterChip active={!tag} onClick={() => setTag(null)}>
                  All
                </FilterChip>
                {tags.map((t) => (
                  <FilterChip key={t} active={tag === t} onClick={() => setTag(tag === t ? null : t)}>
                    {t}
                  </FilterChip>
                ))}
              </div>
            </div>

            {shown.length ? (
              <ul className="mt-8 divide-y divide-line border-y border-line">
                {shown.map((post) => (
                  <li key={post.key}>
                    <PostRow post={post} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-8 font-mono text-sm text-white/55">No articles match those filters.</p>
            )}
          </section>
          <FullBleedRule />
          <Footer />
        </RailColumn>
      </main>
    </>
  )
}
