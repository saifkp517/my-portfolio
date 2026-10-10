import { useEffect, useState } from 'react'
import PixelLogo from './PixelLogo.jsx'

const sections = [
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

export default function Nav() {
  const [activeSection, setActiveSection] = useState(null)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const readingLine = window.innerHeight * 0.35
      const active = sections.reduce((current, { id }) => {
        const section = document.getElementById(id)
        return section && section.getBoundingClientRect().top <= readingLine ? id : current
      }, null)
      setActiveSection(active)
    }
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-ink/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-2xl items-center justify-between border-x border-line px-5 py-4 sm:px-6">
        <a
          href="#top"
          aria-label="Saifullah Khan — home"
          className="rounded-sm text-white transition-colors hover:text-accent-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
        >
          <PixelLogo />
        </a>
        <nav className="hidden items-center gap-8 font-mono text-xs uppercase tracking-wide text-white/60 sm:flex">
          {sections.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={activeSection === id ? 'location' : undefined}
              className={`group relative rounded-sm transition-colors hover:text-accent-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ink ${activeSection === id ? 'text-accent-400' : ''}`}
            >
              {label}
              <span
                aria-hidden="true"
                className={`absolute -bottom-2 left-0 h-px w-full origin-left bg-accent-400 transition-transform duration-200 ease-out motion-reduce:transition-none ${activeSection === id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100'}`}
              />
            </a>
          ))}
        </nav>
        <a
          href="https://www.linkedin.com/in/saifullah-khan-1059aa236/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center rounded-md border border-accent-500/40 px-4 py-2 font-mono text-xs font-semibold text-accent-400 transition-colors hover:bg-accent-500/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
        >
          Let's connect
        </a>
      </div>
    </header>
  )
}
