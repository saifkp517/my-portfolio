import './globals.css'

export const metadata = {
  title: {
    default: 'Saifullah Khan — Full-stack developer',
    template: '%s — Saifullah Khan',
  },
  description:
    'Full-stack developer who ships real-time systems, web games and production business software. TypeScript, NestJS, PostgreSQL, Redis, WebSockets.',
  openGraph: {
    type: 'website',
    title: 'Saifullah Khan — Full-stack developer',
    description:
      'I ship real-time systems, web games and production business software. Play Zentra, a multiplayer shooter I built, or see how I cut a 4–6 hour audit to 20 minutes.',
  },
  twitter: { card: 'summary_large_image' },
  icons: { icon: '/favicon.svg' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;600;700&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
