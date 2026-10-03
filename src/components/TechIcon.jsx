// Brand-colored logo for a stack chip, requested from simple-icons in the
// technology's own color. Falls back to a generic plug/signal glyph for
// technologies with no brand mark (e.g. the WebSockets protocol itself has
// no official logo), tinted the same way via currentColor.
export default function TechIcon({ slug, color, className = 'h-3.5 w-3.5' }) {
  if (!slug) {
    return (
      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className} style={{ color }}>
        <path
          d="M4 9.5L1.5 12M12 4l2.5-2.5M5.5 10.5l5-5M4.5 6.5l-2-2L5 2l2 2M9.5 11.5l2 2L14 11l-2-2"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
  return (
    <img
      src={`https://cdn.simpleicons.org/${slug}/${color.replace('#', '')}`}
      alt=""
      className={`${className} object-contain`}
    />
  )
}
