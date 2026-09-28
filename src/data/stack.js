// Single source of truth for Zentra's "under the hood" stack, shared by the
// Zentra section cards and the article cross-links. Items without a `to`
// don't have a published article yet.
export const stackItems = [
  {
    key: 'websockets',
    part: 'WebSockets',
    role: 'Live position sync and hit detection — every shot and movement travels in real time.',
    icon: '/images/websockets-logo.svg',
    to: '/articles/websockets',
  },
  {
    key: 'redis',
    part: 'Redis',
    role: 'Holds fast-changing game state, built to keep up as positions update constantly.',
    icon: '/images/redis-logo.png',
    to: '/articles/redis',
  },
  {
    key: 'postgresql',
    part: 'PostgreSQL',
    role: 'Persists accounts and scores — the durable layer behind an otherwise fast-moving game.',
  },
  {
    key: 'nestjs',
    part: 'NestJS',
    role: 'The backend that ties the above together into one coherent server.',
  },
]
