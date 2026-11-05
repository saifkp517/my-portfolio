import CTAButton from './CTAButton.jsx'
import { LINKS } from './SocialLinks.jsx'

const GITHUB_ICON = LINKS.find((link) => link.label === 'GitHub').icon

// Compact: sits on a text-link row (home cards). Smaller to match the link
// beside it, with an invisible pseudo-element keeping the tap area at 44px.
const COMPACT =
  "relative !h-8 gap-1.5 px-3 text-xs font-semibold before:absolute before:-inset-y-[6px] before:inset-x-0 before:content-['']"

// The secondary "View code" button: a CTAButton with a GitHub icon, so it
// matches the other secondary buttons exactly.
export default function CodeLink({ href, compact = false, className = '' }) {
  return (
    <CTAButton
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      variant="secondary"
      className={`${compact ? COMPACT : ''} ${className}`}
    >
      <svg width={compact ? 13 : 14} height={compact ? 13 : 14} viewBox="0 0 16 16" fill="none" aria-hidden="true">
        {GITHUB_ICON}
      </svg>
      View code<span className="sr-only"> (opens in a new tab)</span>
    </CTAButton>
  )
}
