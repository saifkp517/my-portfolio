// Small, purpose-built typography set for article bodies. Keeping these
// centralized means every article reads consistently and the light/dark
// treatment only has to be tuned in one place.

export function H2({ id, children }) {
  return (
    <h2
      id={id}
      className="mt-14 scroll-mt-28 font-display text-xl font-semibold tracking-tight text-neutral-900 sm:text-2xl dark:text-white"
    >
      {children}
    </h2>
  )
}

export function H3({ children }) {
  return (
    <h3 className="mt-8 font-display text-base font-semibold tracking-tight text-neutral-900 dark:text-white">
      {children}
    </h3>
  )
}

export function P({ children }) {
  return (
    <p className="mt-4 text-[15px] leading-relaxed text-neutral-600 dark:text-white/70">{children}</p>
  )
}

export function UL({ children }) {
  return <ul className="mt-4 space-y-2.5 text-[15px] leading-relaxed text-neutral-600 dark:text-white/70">{children}</ul>
}

export function LI({ children }) {
  return (
    <li className="flex gap-3">
      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500/60" />
      <span>{children}</span>
    </li>
  )
}

export function Strong({ children }) {
  return <strong className="font-semibold text-neutral-900 dark:text-white">{children}</strong>
}

export function InlineCode({ children }) {
  return (
    <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px] text-accent-700 dark:bg-white/[0.07] dark:text-accent-300">
      {children}
    </code>
  )
}

export function Callout({ title, children }) {
  return (
    <div className="mt-6 rounded-xl border border-accent-500/25 bg-accent-500/[0.05] p-5 dark:border-accent-500/25 dark:bg-accent-500/[0.06]">
      {title && (
        <p className="font-mono text-[11px] uppercase tracking-widest text-accent-700 dark:text-accent-400">
          {title}
        </p>
      )}
      <div className="mt-2 space-y-2 text-[14px] leading-relaxed text-neutral-700 dark:text-white/75">
        {children}
      </div>
    </div>
  )
}

export function CodeBlock({ children, label }) {
  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50 dark:border-line dark:bg-[#0c0d10]">
      {label && (
        <div className="border-b border-neutral-200 px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-neutral-400 dark:border-line dark:text-white/35">
          {label}
        </div>
      )}
      <pre className="overflow-x-auto p-4 text-[12.5px] leading-relaxed">
        <code className="font-mono text-neutral-700 dark:text-white/80">{children}</code>
      </pre>
    </div>
  )
}
