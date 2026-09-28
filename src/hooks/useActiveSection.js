import { useEffect, useState } from 'react'

// Tracks which heading is currently in the "reading zone" of the viewport,
// so the table of contents can highlight where the reader actually is.
export default function useActiveSection(ids) {
  const [activeId, setActiveId] = useState(ids[0])

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length === 0) return
        const topMost = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b,
        )
        setActiveId(topMost.target.id)
      },
      { rootMargin: '-15% 0px -70% 0px', threshold: [0, 1] },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join('|')])

  return activeId
}
