import { useEffect, useRef } from 'react'

const SIZE = 448 // 28rem, matches the blob's rendered size
const SPEED = 650 // px per second the glow chases the pointer at

export default function CursorGlow({ containerRef }) {
  const glowRef = useRef(null)
  const pos = useRef({ x: 120, y: 160 })
  const target = useRef({ x: 120, y: 160 })

  useEffect(() => {
    const container = containerRef.current
    const glow = glowRef.current
    if (!container || !glow) return

    const place = () => {
      glow.style.transform = `translate3d(${pos.current.x - SIZE / 2}px, ${pos.current.y - SIZE / 2}px, 0)`
    }
    place()

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const handleMove = (e) => {
      const rect = container.getBoundingClientRect()
      target.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    container.addEventListener('pointermove', handleMove)

    let frameId
    let lastTime = performance.now()

    const tick = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05)
      lastTime = now

      const dx = target.current.x - pos.current.x
      const dy = target.current.y - pos.current.y
      const distance = Math.hypot(dx, dy)
      const step = SPEED * dt

      if (distance > step) {
        pos.current.x += (dx / distance) * step
        pos.current.y += (dy / distance) * step
      } else {
        pos.current.x = target.current.x
        pos.current.y = target.current.y
      }

      place()
      frameId = requestAnimationFrame(tick)
    }
    frameId = requestAnimationFrame(tick)

    return () => {
      container.removeEventListener('pointermove', handleMove)
      cancelAnimationFrame(frameId)
    }
  }, [containerRef])

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 h-[28rem] w-[28rem] rounded-full bg-accent-500/15 blur-[130px] will-change-transform"
    />
  )
}
