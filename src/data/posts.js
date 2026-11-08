// Every post belongs to a project. A post's `project` is the key of an entry
// in projects.js; `part` is its reading order inside that project. A post's
// URL is derived, never hand-written: the project's own report has no `slug`
// and lives at /projects/<project>; any other article lives at
// /projects/<project>/<slug>.
import { projects } from './projects.js'

const rawPosts = [
  {
    key: 'zentra',
    project: 'zentra',
    title: 'Zentra: architecture report',
    summary: 'Zentra is a browser third-person arena shooter.',
    tags: ['Realtime', 'Game dev'],
    readingTime: null,
    part: 1,
  },
  {
    key: 'zentra-hits-and-deaths',
    project: 'zentra',
    title: 'What happens when you get shot: hit registration in a browser shooter',
    summary: 'Server authority, lag compensation, capsule hit tests and race-free kills in Zentra.',
    tags: ['Realtime', 'Game dev'],
    readingTime: null,
    slug: 'hits',
    part: 2,
  },
  {
    key: 'erp',
    project: 'erp',
    title: 'From handwritten notebooks to a 20-minute weekly audit',
    summary: 'Automated a weekly billing audit from 4–6 hours down to about 20 minutes.',
    tags: ['ERP', 'Business software'],
    readingTime: null,
    part: 1,
  },
]

export const postHref = (post) =>
  post.slug ? `/projects/${post.project}/${post.slug}` : `/projects/${post.project}`

export const posts = rawPosts.map((p) => ({ ...p, to: postHref(p) }))

export const getProject = (key) => projects.find((p) => p.key === key)

export const postsFor = (projectKey) =>
  posts.filter((p) => p.project === projectKey).sort((a, b) => a.part - b.part)

// The articles under a project, excluding the project's own report.
export const articlesFor = (projectKey) => postsFor(projectKey).filter((p) => p.slug)
