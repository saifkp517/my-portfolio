// Every article belongs to a project. A post's `project` is the key of an
// entry in projects.js; `part` is its reading order inside that project.
// Posts are built from the article directory in stack.js — add an entry there
// (or push another object below) and it shows up everywhere automatically.
import { stackItems } from './stack.js'
import { projects } from './projects.js'

const zentraPosts = stackItems
  .filter((item) => item.to)
  .map((item, i) => ({
    key: item.key,
    project: 'zentra',
    title: item.headline,
    summary: item.dek,
    tags: item.tags,
    readingTime: item.readingTime,
    to: item.to,
    part: i + 1,
  }))

// The ERP write-up is its project page itself, so the post points there.
const erpPosts = [
  {
    key: 'erp',
    project: 'erp',
    title: 'From handwritten notebooks to a 20-minute weekly audit',
    summary: 'Automated a weekly billing audit from 4–6 hours down to about 20 minutes.',
    tags: ['ERP', 'Business software'],
    readingTime: null,
    to: '/projects/erp',
    part: 1,
  },
]

export const posts = [...zentraPosts, ...erpPosts]

export const getProject = (key) => projects.find((p) => p.key === key)

export const postsFor = (projectKey) =>
  posts.filter((p) => p.project === projectKey).sort((a, b) => a.part - b.part)

// No dates yet, so "latest" means the highest part number first.
export const latestPosts = (n) => [...posts].sort((a, b) => b.part - a.part).slice(0, n)
