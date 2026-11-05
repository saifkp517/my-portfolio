import IconTile from './IconTile.jsx'
import { META_COLORS } from '../data/iconColors.js'

const BULB = (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M5.75 12h4.5M6.5 14h3M8 1.75a4.25 4.25 0 00-2.4 7.76c.4.3.65.75.65 1.24V12h3.5v-1.25c0-.5.25-.94.65-1.24A4.25 4.25 0 008 1.75z"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

// "What this shows": one or two lines on what a project proves about me.
// The copy lives in src/data/projects.js (`takeaway`), not in the JSX.
//
// - default: case-study pages, a bordered card with an icon tile like the
//   other cards there
// - compact: home page project rows. No box and no tile: just a thin mint rule
//   (the same motif as the ERP stat) so it reads as a quiet annotation and the
//   row isn't a stack of nested borders. Clamped to two lines.
export default function ProjectTakeaway({ text, compact = false, className = '' }) {
  if (!text) return null

  if (compact) {
    return (
      <div className={`border-l border-accent-500/40 pl-3 ${className}`}>
        <p className="font-mono text-xs uppercase tracking-widest text-white/55">What this shows</p>
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-white/70">{text}</p>
      </div>
    )
  }

  return (
    <div
      className={`flex gap-3 rounded-xl border border-white/10 bg-panel p-4 max-[359px]:flex-col sm:p-5 ${className}`}
    >
      <IconTile color={META_COLORS.accent}>{BULB}</IconTile>
      <div className="min-w-0">
        <p className="font-mono text-xs uppercase tracking-widest text-accent-400">What this shows</p>
        <p className="mt-1.5 text-sm leading-relaxed text-white/75">{text}</p>
      </div>
    </div>
  )
}
