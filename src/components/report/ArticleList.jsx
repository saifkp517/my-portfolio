import Link from 'next/link'
import ArrowOutIcon from './ArrowOutIcon.jsx'
import { articlesFor } from '../../data/posts.js'

// A project's articles, linked from its report. URLs come from the posts data.
export default function ArticleList({ project }) {
  return (
    <ul className="divide-y divide-line border-y border-line">
      {articlesFor(project).map((post) => (
        <li key={post.key}>
          <Link
            href={post.to}
            className="group flex items-start justify-between gap-4 py-3 text-white/75 transition-colors hover:text-accent-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
          >
            <span className="min-w-0">
              <span className="block font-mono text-sm font-semibold leading-snug">{post.title}</span>
              <span className="mt-1 block font-mono text-xs leading-relaxed text-white/55">{post.summary}</span>
            </span>
            <ArrowOutIcon className="mt-0.5" />
          </Link>
        </li>
      ))}
    </ul>
  )
}
