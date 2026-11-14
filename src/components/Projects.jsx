import Link from 'next/link'
import Chip from './Chip.jsx'
import Reveal from './Reveal.jsx'
import FullBleedRule from './frame/FullBleedRule.jsx'
import MetaIconTile from './frame/MetaIconTile.jsx'
import CoverPlaceholder from './report/CoverPlaceholder.jsx'
import { projects } from '../data/projects.js'

// One section for projects and their writing, built like the hero: a header
// strip, then full-bleed ruled cells. Each project is a cell (media flush to
// the cell edge, then one linked identity block with title, tagline and tags).
// Cells meet at hairlines that touch the rails instead of floating in padding.
// Articles live on each project's page and on /writing.

function ProjectGlyph() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M8 2.5l5.5 2.75L8 8 2.5 5.25 8 2.5zM2.5 8.75L8 11.5l5.5-2.75M2.5 11.75L8 14.5l5.5-2.75"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ProjectMedia({ item }) {
  return (
    <Link
      href={item.to}
      aria-label={item.title}
      className="relative block aspect-[2/1] overflow-hidden border-b border-line bg-ink transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-500"
    >
      {item.cover ? (
        <img src={item.cover} alt="" className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <CoverPlaceholder className="absolute inset-0" />
      )}
      {item.video && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={item.cover}
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
        >
          <source src={item.video} type="video/mp4" />
        </video>
      )}
    </Link>
  )
}

export default function Projects() {
  return (
    <section id="projects">
      <Reveal>
        <div className="flex items-baseline justify-between gap-4 px-5 py-3 sm:px-6">
          <p className="font-mono text-xs uppercase tracking-widest text-white/55">Projects &amp; writing</p>
          <Link
            href="/writing"
            className="font-mono text-xs text-white/55 transition-colors hover:text-accent-400"
          >
            All writing →
          </Link>
        </div>
      </Reveal>

      <FullBleedRule />

      {/* Two cells side by side from md up; stacked (bottom-ruled) below. */}
      <div className="grid md:grid-cols-2">
        {projects.map((item, i) => {
          return (
            <Reveal
              key={item.key}
              delay={i * 70}
              // From md up, cells sit two per row: left cells get a right rule,
              // and every row but the last gets a bottom rule.
              className={`flex border-b border-line last:border-b-0 ${
                i % 2 === 0 ? 'md:border-r' : ''
              } ${i >= projects.length - (projects.length % 2 || 2) ? 'md:border-b-0' : 'md:border-b'}`}
            >
              <article className="flex w-full min-w-0 flex-col">
                <ProjectMedia item={item} />

                {/* The whole info block is one link to the project's page. */}
                <Link
                  href={item.to}
                  className="group block flex-1 px-5 py-4 transition-colors hover:bg-white/[0.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-500 sm:px-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                    <div className="flex min-w-0 items-center gap-2.5">
                      <MetaIconTile color={item.color}>
                        <ProjectGlyph />
                      </MetaIconTile>
                      <h3 className="text-balance font-mono text-sm font-semibold leading-snug tracking-tight text-white transition-colors group-hover:text-accent-400 sm:text-base">
                        {item.title}
                      </h3>
                    </div>
                    <span className="font-mono text-xs text-white/55 transition-colors group-hover:text-accent-400">
                      Project overview →
                    </span>
                  </div>
                  <p className="mt-2.5 font-mono text-xs leading-relaxed text-white/60">{item.tagline}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {item.status && <Chip strong>{item.status}</Chip>}
                    {item.tags.map((t) => (
                      <Chip key={t}>{t}</Chip>
                    ))}
                  </div>
                </Link>
              </article>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
