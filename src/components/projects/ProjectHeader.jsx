import { Link } from 'react-router-dom'
import PixelLogo from '../PixelLogo.jsx'
import { ArrowLeftIcon } from '../articles/icons.jsx'

export default function ProjectHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-content items-center justify-between px-5 py-4 sm:px-8">
        <Link
          to="/#projects"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/50 transition-colors hover:text-accent-400"
        >
          <ArrowLeftIcon />
          Back to projects
        </Link>
        <Link
          to="/"
          aria-label="Saifullah Khan — home"
          className="text-white transition-colors hover:text-accent-400"
        >
          <PixelLogo />
        </Link>
      </div>
    </header>
  )
}
