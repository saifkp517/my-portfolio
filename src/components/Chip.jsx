export default function Chip({ children, strong = false }) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2.5 py-1 font-mono text-[11px] tracking-wide ${
        strong
          ? 'border-accent-500/40 bg-accent-500/10 text-accent-400'
          : 'border-white/12 bg-white/[0.03] text-white/60'
      }`}
    >
      {children}
    </span>
  )
}
