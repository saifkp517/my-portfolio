import { hexToRgba } from '../../lib/color.js'

// Small square tile with a color-tinted fill/border. Shared by the hero's meta
// grid and the project / article rows so every "labelled fact" uses one shape.
export default function MetaIconTile({ children, color, className = '' }) {
  return (
    <span
      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-sm border ${className}`}
      style={{ backgroundColor: hexToRgba(color, 0.11), borderColor: hexToRgba(color, 0.11), color }}
    >
      {children}
    </span>
  )
}
