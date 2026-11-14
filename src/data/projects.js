// Single source of truth for the home page's compact project list and each
// project's dedicated case-study page.
import { PROJECT_COLORS } from './iconColors.js'

export const projects = [
  {
    key: 'zentra',
    title: 'Zentra',
    label: 'Zentra',
    color: PROJECT_COLORS.zentra,
    tagline: 'The real-time multiplayer backend behind a browser PVP game.',
    tags: ['NestJS', 'socket.io', 'Redis', 'PostgreSQL'],
    cover: '/images/zentra-gameplay.webp',
    video: '/videos/zentra.mp4',
    to: '/projects/zentra',
    live: 'https://zentra-io.vercel.app/',
  },
  {
    key: 'erp',
    title: 'ERP for a concrete block manufacturer',
    label: 'ERP',
    color: PROJECT_COLORS.erp,
    tagline: 'Automated a weekly billing audit from 4–6 hours down to about 20 minutes.',
    tags: ['Next.js', 'NestJS', 'PostgreSQL', 'Supabase', 'Metabase'],
    cover: '/images/watchman-billing.png',
    to: '/projects/erp',
  },
  {
    key: 'chokepoints',
    title: 'Maritime choke points',
    label: 'Choke points',
    color: PROJECT_COLORS.chokepoints,
    status: 'In progress',
    tagline: 'In progress: studying how news, social media and shipping data around maritime choke points relate.',
    tags: ['Python', 'Embeddings', 'GDELT', 'AIS'],
    // Placeholder: no cover image yet. Cards and the project page draw a
    // labelled placeholder when `cover` is null.
    cover: null,
    to: '/projects/chokepoints',
  },
]
