// Same glyph as the external-link icon: a box open at the top right with an arrow leaving it.
export default function ArrowOutIcon({ className = '' }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={`shrink-0 ${className}`}>
      <path
        d="M11 5H8a3 3 0 00-3 3v8a3 3 0 003 3h8a3 3 0 003-3v-3M10.5 13.5L19 5M14 4.5h5.5V10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

