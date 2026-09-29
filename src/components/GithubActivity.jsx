import { useEffect, useMemo, useState } from 'react'
import Reveal from './Reveal.jsx'

const USERNAME = 'saifkp517'
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const LEVEL_CLASSES = [
  'bg-white/[0.05]',
  'bg-accent-500/25',
  'bg-accent-500/50',
  'bg-accent-500/75',
  'bg-accent-500',
]
const SQUARE = 11
const GAP = 3

export default function GithubActivity() {
  const [contributions, setContributions] = useState(null)
  const [total, setTotal] = useState(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let cancelled = false
    fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`)
      .then((res) => {
        if (!res.ok) throw new Error('bad response')
        return res.json()
      })
      .then((data) => {
        if (cancelled) return
        setContributions(data.contributions)
        setTotal(data.total?.lastYear ?? null)
        setStatus('ready')
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })
    return () => {
      cancelled = true
    }
  }, [])

  const cells = useMemo(() => {
    if (!contributions?.length) return []
    const firstDay = new Date(`${contributions[0].date}T00:00:00`).getDay()
    return [...Array(firstDay).fill(null), ...contributions]
  }, [contributions])

  const weeks = useMemo(() => {
    const out = []
    for (let i = 0; i < cells.length; i += 7) out.push(cells.slice(i, i + 7))
    return out
  }, [cells])

  const monthLabels = useMemo(() => {
    const labels = []
    let lastMonth = -1
    weeks.forEach((week, i) => {
      const firstFilled = week.find(Boolean)
      if (!firstFilled) return
      const month = new Date(`${firstFilled.date}T00:00:00`).getMonth()
      if (month !== lastMonth) {
        labels.push(month)
        lastMonth = month
      } else {
        labels.push(null)
      }
    })
    return labels
  }, [weeks])

  return (
    <section id="activity" className="border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-accent-400">Open source</p>
        </Reveal>
        <Reveal delay={60}>
          <h2 className="mt-3 max-w-2xl text-balance font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl">
            {total !== null
              ? `${total.toLocaleString()} contributions in the last year`
              : "Still committing after hours"}
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-10 rounded-2xl border border-line bg-panel p-6 sm:p-8">
            {status === 'error' && (
              <p className="text-sm text-white/60">
                Couldn't load live activity right now — take a look directly on{' '}
                <a
                  href={`https://github.com/${USERNAME}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent-400 underline underline-offset-4 hover:text-accent-300"
                >
                  GitHub
                </a>
                .
              </p>
            )}

            {status === 'loading' && (
              <div className="h-[98px] w-full animate-pulse rounded-lg bg-white/[0.04]" />
            )}

            {status === 'ready' && (
              <div className="overflow-x-auto pb-2">
                <div style={{ width: 'max-content' }}>
                  <div className="flex" style={{ gap: `${GAP}px` }}>
                    {weeks.map((_, i) => (
                      <div
                        key={i}
                        className="shrink-0 font-mono text-[9px] text-white/35"
                        style={{ width: `${SQUARE}px` }}
                      >
                        {monthLabels[i] !== null && monthLabels[i] !== undefined
                          ? MONTHS[monthLabels[i]]
                          : ''}
                      </div>
                    ))}
                  </div>
                  <div
                    className="mt-1 grid"
                    style={{
                      gridTemplateRows: `repeat(7, ${SQUARE}px)`,
                      gridAutoFlow: 'column',
                      gridAutoColumns: `${SQUARE}px`,
                      gap: `${GAP}px`,
                    }}
                  >
                    {cells.map((day, i) => (
                      <div
                        key={i}
                        title={day ? `${day.count} contribution${day.count === 1 ? '' : 's'} on ${day.date}` : undefined}
                        className={`rounded-[2px] ${day ? LEVEL_CLASSES[day.level] : 'bg-transparent'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
              <div className="flex items-center gap-1.5 font-mono text-[11px] text-white/35">
                <span>Less</span>
                {LEVEL_CLASSES.map((cls, i) => (
                  <span key={i} className={`h-[11px] w-[11px] rounded-[2px] ${cls}`} />
                ))}
                <span>More</span>
              </div>
              <a
                href={`https://github.com/${USERNAME}`}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs font-semibold text-accent-400 transition-colors hover:text-accent-300"
              >
                View full profile →
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
