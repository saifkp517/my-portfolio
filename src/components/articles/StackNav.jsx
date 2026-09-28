import { Link } from 'react-router-dom'
import { stackItems } from '../../data/stack.js'

// Bottom-of-article cross-links back into the rest of Zentra's stack —
// keeps readers moving instead of dead-ending on one article.
export default function StackNav({ currentKey }) {
  return (
    <div className="mt-16 border-t border-neutral-200 pt-10 dark:border-line">
      <p className="font-mono text-xs uppercase tracking-widest text-neutral-400 dark:text-white/40">
        More on Zentra's stack
      </p>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stackItems.map((item) => {
          const isCurrent = item.key === currentKey
          const isLinkable = Boolean(item.to) && !isCurrent

          const inner = (
            <>
              <span className="flex h-8 w-8 items-center justify-center rounded-md border border-neutral-200 bg-white p-1 dark:border-white/10 dark:bg-white/5">
                {item.icon ? (
                  <img src={item.icon} alt="" className="h-full w-full object-contain" />
                ) : (
                  <span className="h-2 w-2 rounded-full bg-neutral-300 dark:bg-white/20" />
                )}
              </span>
              <span className="font-mono text-xs font-semibold text-neutral-900 dark:text-white">
                {item.part}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wide text-neutral-400 dark:text-white/35">
                {isCurrent ? 'Reading now' : item.to ? 'Read the article' : 'Coming soon'}
              </span>
            </>
          )

          const baseClass =
            'flex flex-col items-start gap-2 rounded-xl border p-4 transition-colors'

          if (isLinkable) {
            return (
              <Link
                key={item.key}
                to={item.to}
                className={`${baseClass} border-neutral-200 bg-white hover:border-accent-500/40 hover:bg-accent-500/[0.03] dark:border-line dark:bg-panel dark:hover:border-accent-500/30`}
              >
                {inner}
              </Link>
            )
          }

          return (
            <div
              key={item.key}
              className={`${baseClass} ${
                isCurrent
                  ? 'border-accent-500/30 bg-accent-500/[0.05] dark:border-accent-500/25 dark:bg-accent-500/[0.06]'
                  : 'border-neutral-200 bg-neutral-50 opacity-60 dark:border-line dark:bg-panel'
              }`}
            >
              {inner}
            </div>
          )
        })}
      </div>
    </div>
  )
}
