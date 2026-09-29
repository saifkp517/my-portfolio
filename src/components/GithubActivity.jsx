import { useEffect, useMemo, useState } from 'react'

const USERNAME = 'saifkp517'
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const LEVEL_CLASSES = [
  'bg-white/[0.05]',
  'bg-accent-500/25',
  'bg-accent-500/50',
  'bg-accent-500/75',
  'bg-accent-500',
]
const SQUARE = 9
const GAP = 2.5

// Compact contribution heatmap, sized to sit inline in the hero rather than
// as its own full-height section.
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
    weeks.forEach((week) => {
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
    <div className="rounded-xl border border-line bg-panel p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-mono text-[11px] uppercase tracking-widest text-white/40">
          {status === 'ready' && total !== null
            ? `${total.toLocaleString()} contributions, past year`
            : 'GitHub activity'}
        </p>
        <a
          href={`https://github.com/${USERNAME}`}
          target="_blank"
          rel="noreferrer"
          className="font-mono text-[11px] font-semibold text-accent-400 transition-colors hover:text-accent-300"
        >
          Profile →
        </a>
      </div>

      {status === 'error' && (
        <p className="mt-3 text-xs text-white/50">Couldn't load live activity right now.</p>
      )}

      {status === 'loading' && (
        <div className="mt-3 h-[76px] w-full animate-pulse rounded-lg bg-white/[0.04]" />
      )}

      {status === 'ready' && (
        <div className="thin-scrollbar mt-3 overflow-x-auto pb-2">
          <div style={{ width: 'max-content' }}>
            <div className="flex" style={{ gap: `${GAP}px` }}>
              {weeks.map((_, i) => (
                <div
                  key={i}
                  className="shrink-0 font-mono text-[8px] text-white/30"
                  style={{ width: `${SQUARE}px` }}
                >
                  {monthLabels[i] !== null && monthLabels[i] !== undefined ? MONTHS[monthLabels[i]] : ''}
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
    </div>
  )
}
