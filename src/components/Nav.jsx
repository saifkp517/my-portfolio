// Pixel coordinates (col, row) on a 7x5 grid for a blocky "S K" monogram.
const LOGO_PIXELS = [
  [0, 0], [1, 0], [2, 0],
  [0, 1],
  [0, 2], [1, 2], [2, 2],
  [2, 3],
  [0, 4], [1, 4], [2, 4],
  [4, 0], [6, 0],
  [4, 1], [6, 1],
  [4, 2], [5, 2],
  [4, 3], [6, 3],
  [4, 4], [6, 4],
]

function PixelLogo() {
  return (
    <svg width="26" height="19" viewBox="0 0 28 20" aria-hidden="true">
      {LOGO_PIXELS.map(([col, row], i) => (
        <rect key={i} x={col * 4} y={row * 4} width="3" height="3" fill="currentColor" />
      ))}
    </svg>
  )
}

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-ink/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-content items-center justify-between px-5 py-4 sm:px-8">
        <a
          href="#top"
          aria-label="Saifullah Khan — home"
          className="text-white transition-colors hover:text-accent-400"
        >
          <PixelLogo />
        </a>
        <nav className="hidden items-center gap-8 font-mono text-xs uppercase tracking-wide text-white/60 sm:flex">
          <a href="#experience" className="transition-colors hover:text-accent-400">
            Experience
          </a>
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
