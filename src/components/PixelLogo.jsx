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

export default function PixelLogo() {
  return (
    <svg width="26" height="19" viewBox="0 0 28 20" aria-hidden="true">
      {LOGO_PIXELS.map(([col, row], i) => (
        <rect key={i} x={col * 4} y={row * 4} width="3" height="3" fill="currentColor" />
      ))}
    </svg>
  )
}
