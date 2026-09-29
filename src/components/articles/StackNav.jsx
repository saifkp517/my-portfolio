import { Link } from 'react-router-dom'
import { stackItems } from '../../data/stack.js'

// Bottom-of-article cross-links back into the rest of Zentra's stack, styled
// like the "Under the hood" article list on the main page for consistency.
export default function StackNav({ currentKey }) {
  return (
    <div className="mt-16 border-t border-neutral-200 pt-10 dark:border-line">
      <p className="font-mono text-xs uppercase tracking-widest text-neutral-400 dark:text-white/40">
        More on Zentra's stack
      </p>

      <div className="mt-5 divide-y divide-neutral-200 rounded-xl border border-neutral-200 dark:divide-line dark:border-line">
        {stackItems.map((item) => {
          const isCurrent = item.key === currentKey
          const isLinkable = Boolean(item.to) && !isCurrent
          const status = isCurrent ? 'Reading now' : item.to ? 'Published' : 'Coming soon'

          return (
            <div
              key={item.key}
              className={`flex gap-4 p-5 sm:gap-5 sm:p-6 ${
                isCurrent ? 'bg-accent-500/[0.04] dark:bg-accent-500/[0.06]' : ''
              }`}
            >
              <div className="h-20 w-28 shrink-0 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50 dark:border-line dark:bg-white/[0.03] sm:h-24 sm:w-32">
                {item.cover ? (
                  <img src={item.cover} alt="" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center p-1.5">
                    <span className="text-center font-mono text-[8px] uppercase leading-tight tracking-wide text-neutral-300 dark:text-white/25">
                      Add cover image
                    </span>
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 dark:text-white/35">
                  Zentra's stack / {status}
                </p>
                <div className="mt-2 border-t border-dashed border-neutral-200 pt-3 dark:border-white/15">
                  <h4 className="text-balance font-display text-base font-semibold leading-snug tracking-tight sm:text-lg">
                    {isLinkable ? (
                      <Link
                        to={item.to}
                        className="text-neutral-900 transition-colors hover:text-accent-600 dark:text-white dark:hover:text-accent-400"
                      >
                        {item.headline}
                      </Link>
                    ) : (
                      <span className={isCurrent ? 'text-accent-600 dark:text-accent-400' : 'text-neutral-900 dark:text-white'}>
                        {item.headline}
                      </span>
                    )}
                  </h4>
                  <p className="mt-1 font-mono text-xs italic text-neutral-400 dark:text-white/40">{item.part}</p>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-white/65">
                    {item.role}{' '}
                    {isLinkable && (
                      <>
                        For the full breakdown,{' '}
                        <Link
                          to={item.to}
                          className="text-accent-600 underline underline-offset-4 transition-colors hover:text-accent-700 dark:text-accent-400 dark:hover:text-accent-300"
                        >
                          read the article
                        </Link>
                        .
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
