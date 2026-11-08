const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'
const region = posthogHost.includes('eu.') ? 'eu' : 'us'

export default {
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      { source: '/articles/websockets', destination: '/projects/zentra', permanent: true },
      { source: '/projects/zentra/hits', destination: '/projects/zentra/hits-and-deaths', permanent: false },
      { source: '/articles/redis', destination: '/projects/zentra', permanent: true },
    ]
  },
  // Reverse proxy for PostHog so ad/tracker blockers don't drop the requests.
  async rewrites() {
    return [
      { source: '/ingest/static/:path*', destination: `https://${region}-assets.i.posthog.com/static/:path*` },
      { source: '/ingest/array/:path*', destination: `https://${region}-assets.i.posthog.com/array/:path*` },
      { source: '/ingest/:path*', destination: `https://${region}.i.posthog.com/:path*` },
    ]
  },
  skipTrailingSlashRedirect: true,
}
