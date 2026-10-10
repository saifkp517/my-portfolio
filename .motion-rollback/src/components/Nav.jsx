import PixelLogo from './PixelLogo.jsx'

export default function Nav() {
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
          <a
            href="#experience"
            className="rounded-sm transition-colors hover:text-accent-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            Experience
          </a>
          <a
            href="#projects"
            className="rounded-sm transition-colors hover:text-accent-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            Projects
          </a>
          <a
            href="#contact"
            className="rounded-sm transition-colors hover:text-accent-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            Contact
          </a>
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
