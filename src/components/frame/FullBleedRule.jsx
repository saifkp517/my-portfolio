import { useEffect, useState } from 'react'

// A 1px rule that breaks out of the narrow centered column to the viewport
// edges. Deliberately NOT `100vw` + `calc(50% - 50vw)` — `100vw` is defined
// as the layout viewport width, which includes the vertical scrollbar's
// gutter in every major browser, so it's wider than the page actually is
// and forces a horizontal scrollbar into existence. `clientWidth` excludes
// the scrollbar, so sizing from that can never overflow the document.
// The element is centered on its own column (whose center already sits on
// the viewport's center, since the column itself is `mx-auto`), so no
// vw-based offset is needed either.
export default function FullBleedRule({ className = '' }) {
  const [width, setWidth] = useState(() => document.documentElement.clientWidth)

  useEffect(() => {
    const update = () => setWidth(document.documentElement.clientWidth)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return (
    <div
      aria-hidden="true"
      className={`relative left-1/2 h-px -translate-x-1/2 bg-line ${className}`}
      style={{ width }}
    />
  )
}
