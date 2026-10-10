export default function CTAButton({ href, children, variant = 'primary', className = '', ...props }) {
  const base =
    'inline-flex h-10 items-center justify-center gap-2 rounded-sm px-5 text-sm font-medium font-mono transition-[color,background-color,border-color,transform] duration-200 ease-out motion-safe:hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ink motion-reduce:transition-none'
  const variants = {
    primary: 'bg-accent-500 text-ink hover:bg-accent-400',
    secondary: 'border border-line text-white/80 hover:border-accent-500/50 hover:text-accent-400',
    ghost: 'text-white/70 hover:text-white',
  }
  return (
    <a href={href} className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </a>
  )
}
