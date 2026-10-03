// Short hairline-ruled band marking a boundary between major sections. The
// diagonal hatch mirrors the `line` token's alpha (border-line = white/9%)
// so it reads as part of the same ruled system rather than a new color.
export default function SectionDivider() {
  return (
    <div
      aria-hidden="true"
      className="h-8 w-full border-y border-line"
      style={{
        backgroundImage:
          'repeating-linear-gradient(135deg, rgba(255,255,255,0.07) 0px, rgba(255,255,255,0.07) 1px, transparent 1px, transparent 9px)',
      }}
    />
  )
}
