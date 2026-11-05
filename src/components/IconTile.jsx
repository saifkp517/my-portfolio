import { hexToRgba } from '../lib/color.js'

// The tinted rounded-square icon tile used by the hero rows, the takeaway
// strip and the contact sheet, so all three share one size, radius and tint.
export default function IconTile({ children, color, className = '' }) {
  return (
    <span
      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-sm border ${className}`}
      style={{ backgroundColor: hexToRgba(color, 0.11), borderColor: hexToRgba(color, 0.11), color }}
    >
      {children}
    </span>
  )
}
