import Link from 'next/link'
import Chip from './Chip.jsx'
import Reveal from './Reveal.jsx'
import PostRow from './PostRow.jsx'
import { projects } from '../data/projects.js'
import { postsFor } from '../data/posts.js'

// One section for projects and their writing. The project is the parent card
// (media, outcome, stack); its articles hang underneath as full writing rows,
// indented behind a rule so they read as children. Past MAX_SHOWN articles the
// rest collapse into a link to the project's own page.
const MAX_SHOWN = 3

function ProjectMedia({ item }) {
  return (
    <Link
      href={item.to}
      aria-label={item.title}
      className="relative block aspect-[2/1] overflow-hidden rounded-sm border border-line bg-ink transition-colors duration-200 hover:border-accent-500/50 focus-visible:border-accent-500/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
    >
      <img src={item.cover} alt="" className="absolute inset-0 h-full w-full object-cover" />
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
    <section id="projects" className="px-5 py-12 sm:px-6 sm:py-16">
      <Reveal>
        <div className="flex items-baseline justify-between gap-4">
          <p className="font-mono text-xs uppercase tracking-widest text-white/55">Projects &amp; writing</p>
          <Link
            href="/writing"
            className="font-mono text-xs text-white/55 transition-colors hover:text-accent-400"
          >
            All writing →
          </Link>
        </div>
      </Reveal>

      <div className="mt-6 divide-y divide-line border-y border-line md:grid md:grid-cols-2 md:divide-x md:divide-y-0">
        {projects.map((item, i) => {
          const articles = postsFor(item.key)
          const shown = articles.slice(0, MAX_SHOWN)
          const hidden = articles.length - shown.length
          const hasOverview = articles.every((a) => a.to !== item.to)
          return (
            <Reveal key={item.key} delay={i * 70} className="md:px-5 md:first:pl-0 md:last:pr-0">
              <article className="py-6">
                <ProjectMedia item={item} />

                <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-balance font-display text-lg font-semibold leading-snug tracking-tight text-white sm:text-xl md:text-base">
                    <Link href={item.to} className="transition-colors hover:text-accent-400">
                      {item.title}
                    </Link>
                  </h3>
                  {hasOverview && (
                    <Link
                      href={item.to}
                      className="font-mono text-xs text-white/55 transition-colors hover:text-accent-400"
                    >
                      Project overview →
                    </Link>
                  )}
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-white/65 md:text-[13px]">{item.tagline}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {item.tags.map((t) => (
                    <Chip key={t}>{t}</Chip>
                  ))}
                </div>

                {articles.length > 0 && (
                  <div className="mt-6">
                    <p className="font-mono text-[11px] uppercase tracking-widest text-white/40">
                      {articles.length} {articles.length === 1 ? 'article' : 'articles'} in this project
                    </p>
                    <ol className="mt-1 divide-y divide-line border-l border-line pl-4 sm:pl-5">
                      {shown.map((post) => (
                        <li key={post.key}>
                          <PostRow post={post} inProject />
                        </li>
                      ))}
                    </ol>
                    {hidden > 0 && (
                      <Link
                        href={item.to}
                        className="mt-1 ml-4 inline-block font-mono text-xs text-accent-400 transition-colors hover:text-accent-300 sm:ml-5"
                      >
                        +{hidden} more {hidden === 1 ? 'article' : 'articles'} →
                      </Link>
                    )}
                  </div>
                )}
              </article>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
