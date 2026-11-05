import posthog from 'posthog-js'

// Runs in the browser before the app hydrates (Next.js instrumentation-client).
// Requests go through /ingest (see rewrites in next.config.js) so tracker blockers don't drop them.
const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN || process.env.NEXT_PUBLIC_POSTHOG_KEY
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'

if (token) {
  posthog.init(token, {
    api_host: '/ingest',
    ui_host: host.replace('.i.posthog.com', '.posthog.com'),
    defaults: '2026-08-30',
    person_profiles: 'identified_only',
  })
}
