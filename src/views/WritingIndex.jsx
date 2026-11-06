'use client'

import { useState } from 'react'
import Nav from '../components/Nav.jsx'
import Footer from '../components/Footer.jsx'
import PostRow from '../components/PostRow.jsx'
import HeroCover from '../components/HeroCover.jsx'
import RailColumn from '../components/frame/RailColumn.jsx'
import FullBleedRule from '../components/frame/FullBleedRule.jsx'
import MetaIconTile from '../components/frame/MetaIconTile.jsx'
import { projects } from '../data/projects.js'
import { posts } from '../data/posts.js'
import { META_COLORS } from '../data/iconColors.js'

function FilterChip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-sm border px-2.5 py-1 font-mono text-[11px] tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 ${
        active
          ? 'border-accent-500/40 bg-accent-500/10 text-accent-400'
          : 'border-line bg-white/[0.03] text-white/60 hover:text-white'
      }`}
    >
      {children}
    </button>
  )
}

function FilterRow({ label, children }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5 px-5 py-3 sm:px-6">
      <span className="mr-1 w-14 font-mono text-xs text-white/40">{label}</span>
      {children}
    </div>
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
          {/* Same construction as the home hero: short Dither cover, then ruled rows. */}
          <div className="relative h-[clamp(96px,16vh,160px)] overflow-hidden bg-ink">
            <HeroCover />
          </div>

          <FullBleedRule />

          <div className="hero-enter flex items-stretch">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center border-r border-line sm:h-24 sm:w-24">
              <MetaIconTile color={META_COLORS.email} className="h-9 w-9">
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M4 2.5h5.5L12.5 5.5v8h-8.5v-11zM9.5 2.5v3h3M6 8h4.5M6 10.5h4.5"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </MetaIconTile>
            </div>
            <div className="flex min-w-0 flex-1 flex-col justify-center px-5 py-2 sm:px-6">
              <p className="font-mono text-xs uppercase tracking-widest text-white/55">Writing</p>
              <h1 className="mt-1 text-balance font-display text-xl font-semibold leading-tight tracking-tight text-white sm:text-[28px]">
                Every article, by project.
              </h1>
              <p className="mt-1 font-mono text-xs text-white/60">
                {posts.length} {posts.length === 1 ? 'article' : 'articles'} · {projects.length}{' '}
                {projects.length === 1 ? 'project' : 'projects'}
              </p>
            </div>
          </div>

          <FullBleedRule />

          <div className="hero-enter divide-y divide-line" style={{ animationDelay: '70ms' }}>
            <FilterRow label="Project">
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
            </FilterRow>
            <FilterRow label="Tag">
              <FilterChip active={!tag} onClick={() => setTag(null)}>
                All
              </FilterChip>
              {tags.map((t) => (
                <FilterChip key={t} active={tag === t} onClick={() => setTag(tag === t ? null : t)}>
                  {t}
                </FilterChip>
              ))}
            </FilterRow>
          </div>

          <FullBleedRule />

          <div className="hero-enter" style={{ animationDelay: '130ms' }}>
            {shown.length ? (
              <ul className="divide-y divide-line">
                {shown.map((post) => (
                  <li key={post.key}>
                    <PostRow post={post} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="px-5 py-6 font-mono text-sm text-white/55 sm:px-6">
                No articles match those filters.
              </p>
            )}
          </div>

          <FullBleedRule />
          <Footer />
        </RailColumn>
      </main>
    </>
  )
}
