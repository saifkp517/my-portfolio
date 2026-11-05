// Single source of truth for the home page's compact project list and each
// project's dedicated case-study page.
export const projects = [
  {
    key: 'zentra',
    title: 'Zentra',
    label: 'Zentra',
    tagline: 'The real-time multiplayer backend behind a browser PVP game.',
    tags: ['NestJS', 'WebSockets', 'Redis', 'PostgreSQL'],
    cover: '/images/zentra-gameplay.webp',
    video: '/videos/zentra.mp4',
    to: '/projects/zentra',
    live: 'https://zentra-io.vercel.app/',
  },
  {
    key: 'erp',
    title: 'ERP for a concrete block manufacturer',
    label: 'ERP',
    tagline: 'Automated a weekly billing audit from 4–6 hours down to about 20 minutes.',
    tags: ['Next.js', 'NestJS', 'PostgreSQL', 'Supabase', 'Metabase'],
    cover: '/images/watchman-billing.png',
    to: '/projects/erp',
  },
]
