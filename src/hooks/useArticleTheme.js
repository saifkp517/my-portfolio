import { useEffect, useState } from 'react'

const STORAGE_KEY = 'article-theme'

function getInitialTheme() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    // localStorage unavailable (private mode, etc.) — fall through to default
  }
  return 'dark'
}

// Scoped light/dark toggle for the article reading experience. Persists the
// reader's choice locally; defaults to dark to match the rest of the site.
export default function useArticleTheme() {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // ignore write failures
    }
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return [theme, toggleTheme]
}
