import Link from 'next/link'
import Chip from './Chip.jsx'
import { getProject } from '../data/posts.js'

// One article in a list. The badge (PROJECT · 01) is what tells the reader
// which project the article belongs to.
export default function PostRow({ post, inProject = false }) {
  const project = getProject(post.project)
  return (
    <Link
      href={post.to}
      className="group flex flex-col gap-1 py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
    >
      <span className="font-mono text-[11px] uppercase tracking-widest text-accent-400">
        {inProject
          ? `Part ${String(post.part).padStart(2, '0')}`
          : `${project?.label ?? project?.title} · ${String(post.part).padStart(2, '0')}`}
      </span>
      <span className="block text-balance font-display text-base font-semibold leading-snug tracking-tight text-white transition-colors group-hover:text-accent-400 sm:text-lg">
        {post.title}
      </span>
      <span className="block text-sm leading-relaxed text-white/65">{post.summary}</span>
      <span className="mt-2 flex flex-wrap items-center gap-1.5">
        {post.readingTime && (
          <span className="mr-1 font-mono text-xs text-white/40">{post.readingTime}</span>
        )}
        {post.tags.map((t) => (
          <Chip key={t}>{t}</Chip>
        ))}
      </span>
    </Link>
  )
}
