// Stand-in for a project with no cover image yet. A faint ruled grid in the
// site's hairline colour, clearly labelled as a placeholder.
export default function CoverPlaceholder({ className = 'relative aspect-[21/9]' }) {
  return (
    <div
      role="img"
      aria-label="Cover image placeholder"
      className={`flex items-center justify-center overflow-hidden bg-ink ${className}`}
      style={{
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }}
    >
      <span className="border border-dashed border-white/20 bg-ink px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-white/45">
        Cover image · placeholder
      </span>
    </div>
  )
}
