// Single source of truth for Zentra's "under the hood" stack — the article
// directory. Drives the Zentra teaser list, the StackNav cross-links, and
// each article page's own header (title/dek/tags/cover/reading time), so
// adding, editing, or retiring an article only means touching this file.
// Items without a `to` don't have a published article yet.
export const stackItems = [
  {
    key: 'websockets',
    part: 'WebSockets',
    headline: 'Keeping a forest full of players in sync, 20 times a second',
    dek: "Every roll, every shot, every kill in Zentra travels over a single WebSocket connection. Here's how the netcode holds up when a dozen spheres are trying to eliminate each other in real time.",
    role: 'Live position sync and hit detection — every shot and movement travels in real time.',
    icon: '/images/websockets-logo.svg',
    cover: '/images/websockets-cover.jpg',
    tags: ['Realtime', 'Networking', 'Game dev'],
    readingTime: '8 min read',
    to: '/articles/websockets',
  },
  {
    key: 'redis',
    part: 'Redis',
    headline: "The state that changes 20 times a second doesn't belong in Postgres",
    dek: 'Player positions, hit points, and lobby state churn constantly while a match is live. Redis is where that churn happens — Postgres only hears about it once, at the end.',
    role: 'Holds fast-changing game state, built to keep up as positions update constantly.',
    icon: '/images/redis-logo.png',
    cover: '/images/redis-cover.jpg',
    tags: ['Redis', 'State management', 'Game dev'],
    readingTime: '7 min read',
    to: '/articles/redis',
  },
]
