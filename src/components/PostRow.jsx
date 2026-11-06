import Link from 'next/link'
import Chip from './Chip.jsx'
import MetaIconTile from './frame/MetaIconTile.jsx'
import { getProject } from '../data/posts.js'
import { PROJECT_COLORS } from '../data/iconColors.js'

// One article as a ruled row: a tinted part-number tile on the left (same
// shape as the hero's meta tiles), title and summary beside it. Rows run the
// full width of whatever cell they sit in, with the parent list supplying the
// divider rules. `inProject` rows live inside a project cell: the project
// eyebrow is dropped (the cell already says which project), and from md up
// (where cells sit side by side) the summary and tags are hidden so the row
// stays compact.
export default function PostRow({ post, inProject = false }) {
  const project = getProject(post.project)
  const nn = String(post.part).padStart(2, '0')
  const color = project?.color ?? PROJECT_COLORS.zentra
  return (
    <Link
      href={post.to}
      className={`group flex items-start gap-3 px-5 py-4 transition-colors hover:bg-white/[0.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-500 sm:px-6 ${
        inProject ? 'md:py-3' : ''
      }`}
    >
      <MetaIconTile color={color} className="mt-px font-mono text-[10px] font-semibold">
        <span className="sr-only">Part </span>
        {nn}
      </MetaIconTile>
      <span className="flex min-w-0 flex-1 flex-col gap-1">
        {!inProject && (
          <span className="font-mono text-[11px] uppercase tracking-widest text-white/40">
            {project?.label ?? project?.title}
          </span>
        )}
        <span className="block text-balance font-mono text-sm font-semibold leading-snug tracking-tight text-white transition-colors group-hover:text-accent-400">
          {post.title}
        </span>
        <span
          className={`block font-mono text-xs leading-relaxed text-white/60 ${inProject ? 'md:hidden' : ''}`}
        >
          {post.summary}
        </span>
        {(post.readingTime || post.tags.length > 0) && (
          <span
            className={`flex flex-wrap items-center gap-1.5 ${inProject ? 'mt-2 md:mt-0' : 'mt-2'}`}
          >
            {post.readingTime && (
              <span className="mr-1 font-mono text-xs text-white/40">{post.readingTime}</span>
            )}
            {post.tags.map((t) => (
              <span key={t} className={inProject ? 'md:hidden' : 'contents'}>
                <Chip>{t}</Chip>
              </span>
            ))}
          </span>
        )}
      </span>
    </Link>
  )
}
