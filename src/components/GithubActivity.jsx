import { useEffect, useMemo, useState } from 'react'

const USERNAME = 'saifkp517'
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', '']
const LEVEL_CLASSES = [
  'bg-white/[0.05]',
  'bg-accent-500/25',
  'bg-accent-500/50',
  'bg-accent-500/75',
  'bg-accent-500',
]
const SQUARE = 9
const GAP = 2.5
const AXIS_WIDTH = 17

const fmtDate = (d) => d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })

// Compact contribution heatmap, sized to sit inline in the hero rather than
// as its own full-height section. Axis labels + legend keep it reading as a
// real chart instead of a grid of coloured divs.
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

  const dateRange = useMemo(() => {
    if (!contributions?.length) return null
    const start = new Date(`${contributions[0].date}T00:00:00`)
    const end = new Date(`${contributions[contributions.length - 1].date}T00:00:00`)
    return `${fmtDate(start)} – ${fmtDate(end)}`
  }, [contributions])

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
        <>
          <div className="thin-scrollbar mt-3 overflow-x-auto pb-1">
            <div style={{ width: 'max-content' }}>
              <div className="flex" style={{ gap: `${GAP}px` }}>
                <div className="shrink-0" style={{ width: `${AXIS_WIDTH}px` }} />
                {weeks.map((_, i) => (
                  <div
                    key={i}
                    className="shrink-0 font-mono text-[8px] leading-none text-white/30"
                    style={{ width: `${SQUARE}px` }}
                  >
                    {monthLabels[i] !== null && monthLabels[i] !== undefined ? MONTHS[monthLabels[i]] : ''}
                  </div>
                ))}
              </div>

              <div className="mt-1.5 flex" style={{ gap: `${GAP}px` }}>
                <div
                  className="flex shrink-0 flex-col"
                  style={{ width: `${AXIS_WIDTH}px`, gap: `${GAP}px` }}
                >
                  {DAY_LABELS.map((label, i) => (
                    <div
                      key={i}
                      className="text-right font-mono text-[8px] leading-none text-white/30"
                      style={{ height: `${SQUARE}px`, lineHeight: `${SQUARE}px` }}
                    >
                      {label}
                    </div>
                  ))}
                </div>

                <div
                  className="grid"
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
          </div>

          <div className="mt-2.5 flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 border-t border-line pt-2.5">
            <p className="font-mono text-[10px] text-white/30">{dateRange} · Source: GitHub</p>
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-white/30">
              Less
              <span className="flex items-center gap-[3px]">
                {LEVEL_CLASSES.map((cls, i) => (
                  <span key={i} className={`h-[9px] w-[9px] rounded-[2px] ${cls}`} />
                ))}
              </span>
              More
            </div>
          </div>
        </>
      )}
    </div>
  )
}
