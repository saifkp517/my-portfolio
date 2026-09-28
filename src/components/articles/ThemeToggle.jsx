import { MoonIcon, SunIcon } from './icons.jsx'

export default function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark'
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-neutral-200 text-neutral-500 transition-colors hover:border-accent-500/50 hover:text-accent-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-white/12 dark:text-white/60 dark:hover:border-accent-500/40 dark:hover:text-accent-400 dark:focus-visible:ring-offset-ink"
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}
