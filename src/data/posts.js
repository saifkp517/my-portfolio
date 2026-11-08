// Every post belongs to a project. A post's `project` is the key of an entry
// in projects.js; `part` is its reading order inside that project. `to` is the
// route itself: the project's report is src/app/projects/<project>/page.jsx and
// each article is a page nested under it, src/app/projects/<project>/<slug>/page.jsx.
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
    key: 'zentra-hits-and-deaths',
    project: 'zentra',
    title: 'What happens when you get shot: hit registration in a browser shooter',
    summary: 'Server authority, lag compensation, capsule hit tests and race-free kills in Zentra.',
    tags: ['Realtime', 'Game dev'],
    readingTime: null,
    to: '/projects/zentra/hits',
    part: 2,
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

// The articles under a project, excluding the project's own report.
export const articlesFor = (projectKey) => postsFor(projectKey).filter((p) => p.to !== `/projects/${projectKey}`)
