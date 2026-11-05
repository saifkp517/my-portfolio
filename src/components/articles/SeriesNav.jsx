import Link from 'next/link'
import { posts, getProject, postsFor } from '../../data/posts.js'

// Bottom-of-article block: the rest of this project's articles in reading
// order, with previous/next links.
export default function SeriesNav({ currentKey }) {
  const post = posts.find((p) => p.key === currentKey)
  const project = post && getProject(post.project)
  if (!post || !project) return null

  const list = postsFor(project.key)
  const i = list.findIndex((p) => p.key === currentKey)
  const prev = list[i - 1]
  const next = list[i + 1]

  return (
    <div className="mt-16 border-t border-neutral-200 pt-10 dark:border-line">
      <div className="flex items-baseline justify-between gap-4">
        <p className="font-mono text-xs uppercase tracking-widest text-neutral-400 dark:text-white/40">
          More on {project.title}
        </p>
        <Link
          href="/writing"
          className="font-mono text-xs text-neutral-500 transition-colors hover:text-accent-600 dark:text-white/50 dark:hover:text-accent-400"
        >
          All writing →
        </Link>
      </div>

      <ol className="mt-5 divide-y divide-neutral-200 rounded-xl border border-neutral-200 dark:divide-line dark:border-line">
        {list.map((p) => {
          const current = p.key === currentKey
          return (
            <li key={p.key} className={current ? 'bg-accent-500/[0.04] dark:bg-accent-500/[0.06]' : ''}>
              <Link
                href={p.to}
                aria-current={current ? 'page' : undefined}
                className="flex gap-4 p-5 transition-colors hover:text-accent-600 dark:hover:text-accent-400"
              >
                <span className="w-6 shrink-0 pt-0.5 font-mono text-xs text-neutral-400 dark:text-white/35">
                  {String(p.part).padStart(2, '0')}
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-base font-semibold leading-snug tracking-tight">
                    {p.title}
                  </span>
                  <span className="mt-1 block font-mono text-xs text-neutral-400 dark:text-white/40">
                    {current ? 'Reading now' : p.readingTime ?? ''}
                  </span>
                </span>
              </Link>
            </li>
          )
        })}
      </ol>

      {(prev || next) && (
        <div className="mt-6 flex flex-col gap-3 font-mono text-xs sm:flex-row sm:justify-between">
          {prev ? (
            <Link
              href={prev.to}
              className="text-neutral-500 transition-colors hover:text-accent-600 dark:text-white/50 dark:hover:text-accent-400"
            >
              ← Previous: {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              href={next.to}
              className="text-accent-600 transition-colors hover:text-accent-700 dark:text-accent-400 dark:hover:text-accent-300 sm:text-right"
            >
              Next: {next.title} →
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
