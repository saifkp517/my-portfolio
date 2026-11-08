'use client'

import { useEffect, useRef, useState } from 'react'

// Single-line text that never gets cut off. If it fits, it renders normally.
// If it overflows (small phones), it glides slowly to the end, pauses, then
// glides back so it can be read. Reduced-motion users get a plain horizontal
// scroll instead of animation.
const SPEED = 28 // px per second

export default function Marquee({ children, className = '' }) {
  const box = useRef(null)
  const text = useRef(null)
  const [dist, setDist] = useState(0)

  useEffect(() => {
    const measure = () => {
      if (!box.current || !text.current) return
      const over = text.current.scrollWidth - box.current.clientWidth
      setDist(over > 1 ? Math.ceil(over) + 4 : 0)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(box.current)
    document.fonts?.ready.then(measure)
    return () => ro.disconnect()
  }, [children])

  return (
    <span ref={box} className={`marquee-box block min-w-0 overflow-hidden ${className}`}>
      <span
        ref={text}
        className={`inline-block whitespace-nowrap ${dist ? 'marquee-run' : ''}`}
        style={dist ? { '--marquee-dist': `-${dist}px`, '--marquee-dur': `${dist / SPEED + 4}s` } : undefined}
      >
        {children}
      </span>
    </span>
  )
}
