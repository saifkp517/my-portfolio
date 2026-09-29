import { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import useArticleTheme from '../../hooks/useArticleTheme.js'
import useActiveSection from '../../hooks/useActiveSection.js'
import ThemeToggle from './ThemeToggle.jsx'
import ReadingProgress from './ReadingProgress.jsx'
import { ArticleTOCMobile, ArticleTOCDesktop } from './ArticleTOC.jsx'
import StackNav from './StackNav.jsx'
import { ArrowLeftIcon } from './icons.jsx'

export default function ArticleLayout({
  stackKey,
  eyebrow = "Zentra — under the hood",
  title,
  dek,
  icon,
  iconAlt = '',
  cover,
  coverAlt = '',
  readingTime,
  tags = [],
  sections,
  children,
}) {
  const [theme, toggleTheme] = useArticleTheme()
  const ids = useMemo(() => sections.map((s) => s.id), [sections])
  const activeId = useActiveSection(ids)

  useEffect(() => {
    const previous = document.title
    document.title = `${title} — Saifullah Khan`
    return () => {
      document.title = previous
    }
  }, [title])

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="min-h-screen bg-white font-body text-neutral-900 transition-colors duration-300 dark:bg-ink dark:text-white">
        <ReadingProgress />

        <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/85 backdrop-blur-md dark:border-line dark:bg-ink/85">
          <div className="mx-auto flex max-w-content items-center justify-between gap-4 px-5 py-4 sm:px-8">
            <Link
              to="/#zentra"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-500 transition-colors hover:text-accent-600 dark:text-white/50 dark:hover:text-accent-400"
            >
              <ArrowLeftIcon />
              Back to Zentra
            </Link>
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>
        </header>

        <main className="mx-auto max-w-content px-5 py-14 sm:px-8 sm:py-20">
          <div className="lg:grid lg:grid-cols-[1fr_216px] lg:items-start lg:gap-12">
            <div className="min-w-0">
              <p className="font-mono text-xs uppercase tracking-widest text-accent-600 dark:text-accent-400">
                {eyebrow}
              </p>

              <div className="mt-4 flex items-start gap-3 sm:items-center">
                {icon && (
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50 p-1.5 dark:border-line dark:bg-panel">
                    <img src={icon} alt={iconAlt} className="h-full w-full object-contain" />
                  </span>
                )}
                <h1 className="text-balance font-display text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
                  {title}
                </h1>
              </div>

              {dek && (
                <p className="mt-4 max-w-2xl text-balance text-base leading-relaxed text-neutral-600 dark:text-white/65">
                  {dek}
                </p>
              )}

              {cover && (
                <div className="mt-6 aspect-[21/9] w-full overflow-hidden rounded-xl border border-neutral-200 dark:border-line">
                  <img src={cover} alt={coverAlt} className="h-full w-full object-cover" />
                </div>
              )}

              {(readingTime || tags.length > 0) && (
                <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-neutral-400 dark:text-white/35">
                  {readingTime && <span>{readingTime}</span>}
                  {readingTime && tags.length > 0 && (
                    <span aria-hidden="true" className="h-1 w-1 rounded-full bg-current" />
                  )}
                  {tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-neutral-200 px-2 py-0.5 dark:border-white/12"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-8">
                <ArticleTOCMobile sections={sections} />
              </div>

              <article>{children}</article>

              <StackNav currentKey={stackKey} />

              <div className="mt-14 flex flex-col gap-4 border-t border-neutral-200 pt-8 text-sm dark:border-line sm:flex-row sm:items-center sm:justify-between">
                <Link
                  to="/#zentra"
                  className="inline-flex items-center gap-2 font-mono text-xs text-neutral-500 transition-colors hover:text-accent-600 dark:text-white/50 dark:hover:text-accent-400"
                >
                  <ArrowLeftIcon />
                  Back to Zentra
                </Link>
                <a
                  href="https://zentra-io.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-accent-600 transition-colors hover:text-accent-700 dark:text-accent-400 dark:hover:text-accent-300"
                >
                  Play Zentra ↗
                </a>
              </div>
            </div>

            <aside>
              <ArticleTOCDesktop sections={sections} activeId={activeId} />
            </aside>
          </div>
        </main>
      </div>
    </div>
  )
}
