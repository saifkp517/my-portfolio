import { useEffect, useState } from 'react'

// Thin progress bar pinned to the top of the viewport so readers can see
// how far through a (sometimes technical, sometimes long) article they are.
export default function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-[2px] bg-transparent" aria-hidden="true">
      <div
        className="h-full bg-accent-600 transition-[width] duration-150 ease-out dark:bg-accent-400"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
