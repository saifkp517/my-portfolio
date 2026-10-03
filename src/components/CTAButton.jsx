export default function CTAButton({ href, children, variant = 'primary', className = '', ...props }) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-md px-6 py-3.5 text-sm font-semibold font-mono transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ink'
  const variants = {
    primary:
      'bg-accent-500 text-ink shadow-[0_8px_24px_-8px_rgba(255,255,255,0.35)] hover:bg-white hover:shadow-[0_10px_28px_-6px_rgba(255,255,255,0.45)] hover:-translate-y-0.5',
    secondary:
      'border border-white/20 text-white hover:border-accent-500/50 hover:text-accent-400 hover:-translate-y-0.5',
    ghost: 'text-white/70 hover:text-white',
  }
  return (
    <a href={href} className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </a>
  )
}
