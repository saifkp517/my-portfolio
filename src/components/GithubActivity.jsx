import { useEffect, useMemo, useRef, useState } from 'react'

const USERNAME = 'saifkp517'
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const WEEKDAY_ROWS = { 1: 'Mon', 3: 'Wed', 5: 'Fri' }
const LEVEL_CLASSES = [
  'bg-white/[0.06]',
  'bg-white/20',
  'bg-white/40',
  'bg-white/65',
  'bg-white/90',
]
const GAP_RATIO = 0.3
const MONTH_LABEL_H = 14
// Minimum weeks between two month labels so neighbouring abbreviations
// (e.g. "Sep" / "Oct") never collide into "SepOct".
const MIN_LABEL_GAP_WEEKS = 3
// Below this, a year of weekly columns stops being legible — stop shrinking
// and let the figure scroll horizontally instead (mobile only; at tablet/
// desktop widths there's always enough room to hit this floor).
const MIN_SQUARE = 9

export default function GithubActivity() {
  const [contributions, setContributions] = useState(null)
  const [total, setTotal] = useState(null)
  const [status, setStatus] = useState('loading')
  const [gridWidth, setGridWidth] = useState(0)
  const gridWrapRef = useRef(null)

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

  useEffect(() => {
    const node = gridWrapRef.current
    if (!node || typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver((entries) => {
      setGridWidth(entries[0].contentRect.width)
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [status])

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

  // Cell size is the measured container width ÷ week count, same as before —
  // but floored at MIN_SQUARE so a year of columns never shrinks past
  // legibility. On mobile that floor is wider than the available width, so
  // the figure switches to a fixed-size, horizontally-scrollable grid;
  // at tablet/desktop widths `fit` already clears the floor and it still
  // fills exactly 100% of the row (rail to rail) with no scroll, unchanged.
  const { square, gap, isOverflowing } = useMemo(() => {
    if (!gridWidth || !weeks.length) return { square: 10, gap: 3, isOverflowing: false }
    const fit = gridWidth / weeks.length / (1 + GAP_RATIO)
    const square = Math.max(fit, MIN_SQUARE)
    return { square, gap: square * GAP_RATIO, isOverflowing: square > fit }
  }, [gridWidth, weeks.length])

  const monthLabels = useMemo(() => {
    const labels = []
    let lastMonth = -1
    let lastLabelIndex = -Infinity
    weeks.forEach((week, i) => {
      const firstFilled = week.find(Boolean)
      if (!firstFilled) {
        labels.push(null)
        return
      }
      const month = new Date(`${firstFilled.date}T00:00:00`).getMonth()
      if (month === lastMonth) {
        labels.push(null)
        return
      }
      lastMonth = month
      if (i - lastLabelIndex >= MIN_LABEL_GAP_WEEKS) {
        labels.push(month)
        lastLabelIndex = i
      } else {
        labels.push(null)
      }
    })
    return labels
  }, [weeks])

  const rangeText = useMemo(() => {
    if (!contributions?.length) return null
    const fmt = (d) =>
      new Date(`${d}T00:00:00`).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    return `${fmt(contributions[0].date)} – ${fmt(contributions[contributions.length - 1].date)}`
  }, [contributions])

  return (
    <div className="w-full">
      {status === 'error' && (
        <p className="px-5 font-mono text-xs text-white/60 sm:px-6">Couldn't load live activity right now.</p>
      )}

      {status === 'loading' && <div className="mx-5 h-[140px] animate-pulse rounded-sm bg-white/[0.04] sm:mx-6" />}

      {status === 'ready' && (
        <div
          ref={gridWrapRef}
          className={`relative w-full px-5 sm:px-6 ${isOverflowing ? 'overflow-x-auto' : ''}`}
        >
          <div style={isOverflowing ? { width: weeks.length * (square + gap) - gap } : undefined}>
            {/* Month labels, directly above the grid, aligned to each week column */}
            <div className="flex" style={{ gap: `${gap}px`, height: MONTH_LABEL_H }}>
              {weeks.map((_, i) => (
                <div
                  key={i}
                  className={`font-mono text-[8px] text-white/55 ${isOverflowing ? 'shrink-0' : 'min-w-0 flex-1'}`}
                  style={isOverflowing ? { width: square } : undefined}
                >
                  {monthLabels[i] !== null && monthLabels[i] !== undefined ? MONTHS[monthLabels[i]] : ''}
                </div>
              ))}
            </div>

            {/* Grid — spans the full rail-to-rail width when it fits; scrolls on mobile */}
            <div className="relative mt-1">
              <div
                className="grid"
                style={{
                  gridTemplateRows: `repeat(7, ${square}px)`,
                  gridTemplateColumns: isOverflowing ? `repeat(${weeks.length}, ${square}px)` : `repeat(${weeks.length}, 1fr)`,
                  gridAutoFlow: 'column',
                  gap: `${gap}px`,
                }}
              >
                {cells.map((day, i) => (
                  <div
                    key={i}
                    title={day ? `${day.count} contribution${day.count === 1 ? '' : 's'} on ${day.date}` : undefined}
                    className={`rounded-[1px] ${day ? LEVEL_CLASSES[day.level] : 'bg-transparent'}`}
                  />
                ))}
              </div>

              {/* Mon/Wed/Fri — overlaid on the first column, no width of its own */}
              <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                {Object.entries(WEEKDAY_ROWS).map(([row, label]) => (
                  <span
                    key={row}
                    className="absolute left-0.5 font-mono text-[7px] leading-none text-white/40"
                    style={{ top: Number(row) * (square + gap) + square / 2 - 3 }}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {status === 'ready' && (
        <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1.5 px-5 font-mono text-xs sm:px-6">
          <p className="text-white/55">
            <span className="font-semibold text-white/80">Fig. 2.</span>{' '}
            {total !== null ? total.toLocaleString() : '—'} contributions
            {rangeText ? `, ${rangeText}` : ''}. Source:{' '}
            <a
              href={`https://github.com/${USERNAME}`}
              target="_blank"
              rel="noreferrer"
              className="text-white/75 underline decoration-white/25 underline-offset-2 transition-colors hover:text-accent-400"
            >
              GitHub
            </a>
          </p>
          <p className="inline-flex shrink-0 items-center gap-1 text-white/55">
            Less
            {LEVEL_CLASSES.map((cls, i) => (
              <span key={i} className={`h-[9px] w-[9px] rounded-[1px] ${cls}`} />
            ))}
            More
          </p>
        </div>
      )}
    </div>
  )
}
