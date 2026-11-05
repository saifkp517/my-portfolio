import Link from 'next/link'
import Chip from './Chip.jsx'
import { getProject } from '../data/posts.js'

// One article in a list. The badge (PROJECT · 01) is what tells the reader
// which project the article belongs to. `inProject` rows live inside a project
// card: the badge becomes "Part 01", and from md up (where cards sit side by
// side) the summary and tags are hidden so the row stays compact.
export default function PostRow({ post, inProject = false }) {
  const project = getProject(post.project)
  const nn = String(post.part).padStart(2, '0')
  return (
    <Link
      href={post.to}
      className={`group flex flex-col gap-1 py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 ${
        inProject ? 'md:py-3' : ''
      }`}
    >
      <span className="font-mono text-[11px] uppercase tracking-widest text-accent-400">
        {inProject ? `Part ${nn}` : `${project?.label ?? project?.title} · ${nn}`}
      </span>
      <span
        className={`block text-balance font-display text-base font-semibold leading-snug tracking-tight text-white transition-colors group-hover:text-accent-400 sm:text-lg ${
          inProject ? 'md:text-[14px]' : ''
        }`}
      >
        {post.title}
      </span>
      <span className={`block text-sm leading-relaxed text-white/65 ${inProject ? 'md:hidden' : ''}`}>
        {post.summary}
      </span>
      <span className={`flex flex-wrap items-center gap-1.5 ${inProject ? 'mt-2 md:mt-0' : 'mt-2'}`}>
        {post.readingTime && (
          <span className="mr-1 font-mono text-xs text-white/40">{post.readingTime}</span>
        )}
        {post.tags.map((t) => (
          <span key={t} className={inProject ? 'md:hidden' : 'contents'}>
            <Chip>{t}</Chip>
          </span>
        ))}
      </span>
    </Link>
  )
}
