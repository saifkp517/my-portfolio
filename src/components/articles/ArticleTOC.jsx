import { ChevronDownIcon } from './icons.jsx'

// Collapsible "On this page" nav, shown above the article body on small screens.
export function ArticleTOCMobile({ sections }) {
  return (
    <details className="group mb-8 rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm dark:border-line dark:bg-panel lg:hidden">
      <summary className="flex cursor-pointer select-none list-none items-center justify-between font-mono text-xs uppercase tracking-widest text-neutral-500 dark:text-white/40">
        On this page
        <ChevronDownIcon className="h-3.5 w-3.5 transition-transform group-open:rotate-180" />
      </summary>
      <nav className="mt-3 space-y-2.5 border-t border-neutral-200 pt-3 dark:border-line">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="block text-neutral-600 transition-colors hover:text-accent-600 dark:text-white/60 dark:hover:text-accent-400"
          >
            {s.label}
          </a>
        ))}
      </nav>
    </details>
  )
}

// Sticky sidebar nav with scrollspy highlighting, shown alongside the article on larger screens.
export function ArticleTOCDesktop({ sections, activeId }) {
  return (
    <nav className="sticky top-24 hidden max-h-[calc(100vh-7rem)] overflow-y-auto pb-10 lg:block" aria-label="Table of contents">
      <p className="font-mono text-xs uppercase tracking-widest text-neutral-400 dark:text-white/40">
        On this page
      </p>
      <ul className="mt-4 space-y-1 border-l border-neutral-200 dark:border-line">
        {sections.map((s) => {
          const active = s.id === activeId
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={`-ml-px block border-l-2 py-1.5 pl-4 text-[13px] leading-snug transition-colors ${
                  active
                    ? 'border-accent-600 font-medium text-accent-600 dark:border-accent-400 dark:text-accent-400'
                    : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:text-white/50 dark:hover:text-white'
                }`}
              >
                {s.label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
