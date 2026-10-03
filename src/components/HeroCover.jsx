import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { hexToRgb01 } from '../lib/color.js'

// Code-split: three.js + the fiber/postprocessing stack are heavy, so keep
// them out of the main bundle until the hero actually needs to paint them.
const Dither = lazy(() => import('./Dither.tsx'))

const ACCENT_HEX = '#36CE9E' // tailwind.config.js → colors.accent.500
const INK_HEX = '#08090b' // tailwind.config.js → colors.ink
const WAVE_COLOR = hexToRgb01(ACCENT_HEX)
const BACKGROUND_COLOR = hexToRgb01(INK_HEX)

const MOBILE_QUERY = '(max-width: 640px)'
const MOTION_QUERY = '(prefers-reduced-motion: reduce)'

export default function HeroCover() {
  const containerRef = useRef(null)
  const [inView, setInView] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mobile = window.matchMedia(MOBILE_QUERY)
    const motion = window.matchMedia(MOTION_QUERY)
    setIsMobile(mobile.matches)
    setReducedMotion(motion.matches)

    const onMobile = (e) => setIsMobile(e.matches)
    const onMotion = (e) => setReducedMotion(e.matches)
    mobile.addEventListener('change', onMobile)
    motion.addEventListener('change', onMotion)
    return () => {
      mobile.removeEventListener('change', onMobile)
      motion.removeEventListener('change', onMotion)
    }
  }, [])

  useEffect(() => {
    const node = containerRef.current
    if (!node || typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.01,
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  // R3F's own size detection (react-three-fiber + react-use-measure) is a
  // black box that, in practice, doesn't reliably catch every resize this
  // canvas goes through — the first measurement behind the lazy()/Suspense
  // boundary, and later ones when the clamp()'d cover height recalculates.
  // Rather than chase the exact internal event it's waiting for, keep a
  // lightweight watch for the lifetime of this component: compare the
  // actual <canvas> box against the container on a short interval, and
  // nudge it with a synthetic `resize` dispatch whenever they drift apart.
  useEffect(() => {
    const node = containerRef.current
    if (!node) return

    const sync = () => {
      const canvas = node.querySelector('canvas')
      const containerRect = node.getBoundingClientRect()
      const canvasRect = canvas?.getBoundingClientRect()
      const inSync =
        canvasRect &&
        Math.abs(canvasRect.width - containerRect.width) < 1 &&
        Math.abs(canvasRect.height - containerRect.height) < 1
      if (!inSync) window.dispatchEvent(new Event('resize'))
    }

    sync()
    const intervalId = setInterval(sync, 400)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0">
      <Suspense fallback={<div className="absolute inset-0 bg-ink" />}>
        <Dither
          waveColor={WAVE_COLOR}
          backgroundColor={BACKGROUND_COLOR}
          colorNum={3}
          pixelSize={3}
          waveSpeed={0.02}
          waveAmplitude={0.2}
          waveFrequency={3}
          enableMouseInteraction={false}
          disableAnimation={reducedMotion}
          dpr={isMobile ? 2 : 1.5}
          frameloop={inView ? 'always' : 'never'}
        />
      </Suspense>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-ink sm:h-20"
      />
    </div>
  )
}
