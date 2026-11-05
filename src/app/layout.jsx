import './globals.css'

export const metadata = {
  title: {
    default: 'Saifullah Khan — Backend-leaning engineer',
    template: '%s — Saifullah Khan',
  },
  description:
    'Backend-leaning engineer building real-time systems and production business software. TypeScript, NestJS, PostgreSQL, Redis, WebSockets.',
  openGraph: {
    type: 'website',
    title: 'Saifullah Khan — Backend-leaning engineer',
    description:
      'I build real-time backends and the systems businesses run on. Read how I built a multiplayer game server, or how I cut a 4–6 hour audit to 20 minutes.',
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
