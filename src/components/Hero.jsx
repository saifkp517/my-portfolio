import CTAButton from './CTAButton.jsx'
import SocialLinks from './SocialLinks.jsx'
import LocalClock from './LocalClock.jsx'
import ObfuscatedPhone from './ObfuscatedPhone.jsx'
import HeroCover from './HeroCover.jsx'
import FullBleedRule from './frame/FullBleedRule.jsx'
import { CORE_STACK } from '../data/coreStack.js'
import { projects } from '../data/projects.js'
import { META_COLORS } from '../data/iconColors.js'
import { hexToRgba } from '../lib/color.js'

const STACK_TEXT = CORE_STACK.map((t) => t.name).join(' · ')
const ZENTRA = projects.find((p) => p.key === 'zentra')

function MetaIconTile({ children, color }) {
  return (
    <span
      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-sm border"
      style={{ backgroundColor: hexToRgba(color, 0.11), borderColor: hexToRgba(color, 0.11), color }}
    >
      {children}
    </span>
  )
}

function MetaRow({ icon, color, children, rightBorder }) {
  return (
    <div
      className={`flex items-center gap-2.5 border-b border-line px-5 py-3 sm:px-6 ${
        rightBorder ? 'sm:border-r' : ''
      }`}
    >
      <MetaIconTile color={color}>{icon}</MetaIconTile>
      <span className="min-w-0 truncate font-mono text-sm text-white/75">{children}</span>
    </div>
  )
}

const ICONS = {
  role: (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M5.5 3.5L2 8l3.5 4.5M10.5 3.5L14 8l-3.5 4.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  stack: (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M8 2.5l5.5 2.75L8 8 2.5 5.25 8 2.5zM2.5 8.75L8 11.5l5.5-2.75M2.5 11.75L8 14.5l5.5-2.75"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  location: (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M8 14.5s4.5-4.17 4.5-7.5a4.5 4.5 0 10-9 0c0 3.33 4.5 7.5 4.5 7.5z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="7" r="1.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  ),
  time: (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8 5v3.2l2.2 1.3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  email: (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M2.5 4h11v8h-11V4zm0 0l5.5 4.5L13.5 4"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  phone: (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3.5 2.5h2.4l1 3-1.5 1.2a8 8 0 004 4l1.2-1.5 3 1v2.4c0 .6-.5 1-1.1.95C7.6 13.1 2.9 8.4 2.55 3.6c-.05-.6.35-1.1.95-1.1z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
}

export default function Hero() {
  return (
    <section id="top" className="flex flex-col">
      {/* Row A — Cover: Dither background (replaces the old Zentra screenshot) */}
      <div className="relative h-[clamp(180px,28vh,280px)] overflow-hidden bg-ink">
        <HeroCover />
      </div>

      <FullBleedRule />

      {/* Row B — Identity */}
      <div className="flex items-stretch px-5 sm:px-6">
        <div className="flex h-16 w-16 shrink-0 border-r border-line sm:h-24 sm:w-24">
          <img
            src="/images/avatar.png"
            alt="Saifullah Khan"
            className="h-full w-full bg-white object-cover"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-center pl-3 py-3 sm:pl-5">
          <h1 className="flex items-center gap-2 font-body text-xl font-medium leading-tight tracking-tight text-white sm:text-[32px]">
            Saifullah Khan
            <span
              className="h-2 w-2 shrink-0 rounded-full bg-accent-500"
              role="img"
              aria-label="Open to opportunities"
              title="Open to opportunities"
            />
          </h1>
          <p className="mt-1 truncate font-mono text-xs text-white/60">
            I ship real-time systems, web games and business software.
          </p>
        </div>
      </div>

      <FullBleedRule />

      {/* Row C — Social icons */}
      <div className="px-5 py-3 sm:px-6">
        <SocialLinks size="sm" />
      </div>

      <FullBleedRule />

      {/* Row D — Meta grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <MetaRow icon={ICONS.role} color={META_COLORS.role} rightBorder>
          Full-stack developer
        </MetaRow>
        <MetaRow icon={ICONS.stack} color={META_COLORS.stack}>
          {STACK_TEXT}
        </MetaRow>
        <MetaRow icon={ICONS.location} color={META_COLORS.location} rightBorder>
          India
        </MetaRow>
        <MetaRow icon={ICONS.time} color={META_COLORS.time}>
          <LocalClock />
        </MetaRow>
        <MetaRow icon={ICONS.email} color={META_COLORS.email} rightBorder>
          <a href="mailto:saifkp517@gmail.com" className="transition-colors hover:text-accent-400">
            saifkp517@gmail.com
          </a>
        </MetaRow>
        <MetaRow icon={ICONS.phone} color={META_COLORS.phone}>
          <ObfuscatedPhone className="transition-colors hover:text-accent-400" />
        </MetaRow>
      </div>

      <FullBleedRule />

      {/* Row E — CTA */}
      <div className="px-5 py-4 sm:px-6">
        <div className="flex flex-wrap items-center gap-3">
          <CTAButton href="https://zentra-io.vercel.app/" variant="primary">
            Play Zentra
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M5 3.5l7 4.5-7 4.5v-9z" fill="currentColor" />
            </svg>
          </CTAButton>
          <CTAButton
            href="https://docs.google.com/document/d/117cdGu3azu3W2vlKu8MnX3lV8y8EJDJcKI-AsZ8yk2M/edit?usp=sharing"
            target="_blank"
            rel="noreferrer"
            variant="secondary"
          >
            Resume
          </CTAButton>
        </div>
        {ZENTRA && <p className="mt-2.5 font-mono text-xs text-white/55">{ZENTRA.tagline}</p>}
      </div>
    </section>
  )
}
