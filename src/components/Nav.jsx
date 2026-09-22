export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-ink/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-content items-center justify-between px-5 py-4 sm:px-8">
        <a href="#top" className="font-display text-sm font-semibold tracking-tight text-white">
          saifullah<span className="text-accent-500">.</span>khan
        </a>
        <nav className="hidden items-center gap-8 font-mono text-xs uppercase tracking-wide text-white/60 sm:flex">
          <a href="#zentra" className="transition-colors hover:text-accent-400">
            Zentra
          </a>
          <a href="#erp" className="transition-colors hover:text-accent-400">
            ERP
          </a>
          <a href="#contact" className="transition-colors hover:text-accent-400">
            Contact
          </a>
        </nav>
        <a
          href="https://www.linkedin.com/in/saifullah-khan-1059aa236/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center rounded-md border border-accent-500/40 px-4 py-2 font-mono text-xs font-semibold text-accent-400 transition-colors hover:bg-accent-500/10"
        >
          Let's connect
        </a>
      </div>
    </header>
  )
}
