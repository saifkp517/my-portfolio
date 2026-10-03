import { SOCIAL_COLORS } from '../data/iconColors.js'
import { hexToRgba } from '../lib/color.js'

const LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com/saifkp517',
    icon: (
      <path
        d="M8 1.5C4.41 1.5 1.5 4.42 1.5 8.03c0 2.89 1.86 5.33 4.45 6.2.32.06.44-.14.44-.31v-1.2c-1.81.4-2.19-.79-2.19-.79-.3-.75-.72-.96-.72-.96-.59-.4.04-.39.04-.39.65.05 1 .67 1 .67.58 1 1.51.71 1.88.54.06-.42.23-.71.41-.87-1.45-.16-2.97-.72-2.97-3.22 0-.71.25-1.29.67-1.75-.07-.17-.29-.84.06-1.75 0 0 .55-.17 1.79.67.52-.14 1.08-.22 1.63-.22.55 0 1.11.08 1.63.22 1.24-.84 1.79-.67 1.79-.67.35.91.13 1.58.06 1.75.42.46.67 1.04.67 1.75 0 2.51-1.53 3.06-2.98 3.22.24.2.45.6.45 1.21v1.79c0 .17.12.38.45.31 2.58-.87 4.44-3.31 4.44-6.2C14.5 4.42 11.59 1.5 8 1.5z"
        fill="currentColor"
        fillRule="evenodd"
      />
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/saifullah-khan-1059aa236/',
    icon: (
      <path
        d="M4.75 6.25v6.25M4.75 3.75v.01M7.75 12.5V6.25M7.75 8.75c0-1.4.85-2.5 2.1-2.5 1.2 0 1.9.85 1.9 2.5v3.75"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: 'Email',
    href: 'mailto:saifkp517@gmail.com',
    icon: (
      <path
        d="M2.5 4h11v8h-11V4zm0 0l5.5 4.5L13.5 4"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
]

const SIZES = {
  md: 'h-11 w-11',
  sm: 'h-7 w-7',
}

export default function SocialLinks({ className = '', size = 'md', iconSize = 16 }) {
  const px = size === 'sm' ? 13 : iconSize
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {LINKS.map(({ label, href, icon }) => {
        const color = SOCIAL_COLORS[label]
        return (
          <a
            key={label}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noreferrer' : undefined}
            aria-label={label}
            title={label}
            style={{
              backgroundColor: hexToRgba(color, 0.11),
              borderColor: hexToRgba(color, 0.11),
              color,
            }}
            className={`flex items-center justify-center rounded-sm border transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ink ${SIZES[size]}`}
          >
            <svg width={px} height={px} viewBox="0 0 16 16" fill="none" aria-hidden="true">
              {icon}
            </svg>
          </a>
        )
      })}
    </div>
  )
}
