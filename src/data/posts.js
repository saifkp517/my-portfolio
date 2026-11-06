// Every post belongs to a project. A post's `project` is the key of an entry
// in projects.js; `part` is its reading order inside that project. Both
// write-ups are their project pages, so each post points there.
import { projects } from './projects.js'

export const posts = [
  {
    key: 'zentra',
    project: 'zentra',
    title: 'Zentra: architecture report',
    summary: 'Zentra is a browser third-person arena shooter.',
    tags: ['Realtime', 'Game dev'],
    readingTime: null,
    to: '/projects/zentra',
    part: 1,
  },
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

export const getProject = (key) => projects.find((p) => p.key === key)

export const postsFor = (projectKey) =>
  posts.filter((p) => p.project === projectKey).sort((a, b) => a.part - b.part)
