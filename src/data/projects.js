// Single source of truth for the home page's compact project list and each
// project's dedicated case-study page.
export const projects = [
  {
    key: 'zentra',
    title: 'Zentra',
    tagline:
      "A forest-based PVP shooter .io game. Didn't have a startup idea, so I built a game instead.",
    tags: ['NestJS', 'WebSockets', 'Redis', 'PostgreSQL'],
    cover: '/images/zentra-gameplay.webp',
    to: '/projects/zentra',
  },
  {
    key: 'erp',
    title: 'ERP for a concrete block manufacturer',
    tagline: 'Automated a weekly billing audit from 4–6 hours down to about 20 minutes.',
    tags: ['Next.js', 'NestJS', 'PostgreSQL', 'Supabase', 'Metabase'],
    cover: '/images/watchman-billing.png',
    to: '/projects/erp',
  },
]
