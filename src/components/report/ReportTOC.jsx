import { ChevronDownIcon } from '../projects/icons.jsx'

// Collapsible "On this page" nav, shown above the report body on small screens.
export function ReportTOCMobile({ sections }) {
  return (
    <details className="group border-b border-line px-5 py-3 text-sm sm:px-6 lg:hidden">
      <summary className="flex cursor-pointer select-none list-none items-center justify-between font-mono text-xs uppercase tracking-widest text-white/55">
        On this page
        <ChevronDownIcon className="h-3.5 w-3.5 transition-transform group-open:rotate-180" />
      </summary>
      <nav className="mt-3 space-y-2.5 border-t border-line pt-3" aria-label="Table of contents">
        {sections.map((s) => (
          <a key={s.id} href={`#${s.id}`} className="block text-white/60 transition-colors hover:text-accent-400">
            {s.label}
          </a>
        ))}
      </nav>
    </details>
  )
}

// Sticky sidebar nav with scrollspy highlighting, shown beside the body on larger screens.
export function ReportTOCDesktop({ sections, activeId }) {
  return (
    <nav className="sticky top-20 hidden px-5 py-10 lg:block" aria-label="Table of contents">
      <p className="font-mono text-xs uppercase tracking-widest text-white/55">On this page</p>
      <ul className="mt-4 space-y-1 border-l border-line">
        {sections.map((s) => {
          const active = s.id === activeId
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={active ? 'location' : undefined}
                className={`-ml-px block border-l py-1.5 pl-4 font-mono text-xs transition-colors ${
                  active
                    ? 'border-accent-400 text-accent-400'
                    : 'border-transparent text-white/55 hover:text-white'
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
