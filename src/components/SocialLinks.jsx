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
]

export default function SocialLinks({ className = '' }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {LINKS.map(({ label, href, icon }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noreferrer' : undefined}
          aria-label={label}
          title={label}
          className="flex h-9 w-9 items-center justify-center rounded-md border border-line bg-white/[0.03] text-white/55 transition-colors hover:border-accent-500/40 hover:text-accent-400"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            {icon}
          </svg>
        </a>
      ))}
    </div>
  )
}
