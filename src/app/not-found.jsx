import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 px-5 text-center">
      <h1 className="font-display text-3xl font-semibold">Page not found</h1>
      <Link href="/" className="font-mono text-sm text-accent-400 hover:underline">
        Back to home
      </Link>
    </main>
  )
}
