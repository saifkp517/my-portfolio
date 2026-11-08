import Link from 'next/link'
import { articlesFor } from '../../data/posts.js'

// Same glyph as the external-link icon: a box open at the top right with an arrow leaving it.
function ArrowOutIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="mt-0.5 shrink-0">
      <path
        d="M11 5H8a3 3 0 00-3 3v8a3 3 0 003 3h8a3 3 0 003-3v-3M10.5 13.5L19 5M14 4.5h5.5V10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

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
            <ArrowOutIcon />
          </Link>
        </li>
      ))}
    </ul>
  )
}
