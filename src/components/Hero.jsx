import { useRef } from 'react'
import Chip from './Chip.jsx'
import CTAButton from './CTAButton.jsx'
import Reveal from './Reveal.jsx'
import SocialLinks from './SocialLinks.jsx'
import GithubActivity from './GithubActivity.jsx'
import CursorGlow from './CursorGlow.jsx'

const stack = ['TypeScript', 'NestJS', 'Next.js', 'PostgreSQL', 'Redis', 'WebSockets', 'TypeORM', 'Supabase']

export default function Hero() {
  const sectionRef = useRef(null)

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative overflow-hidden pb-16 pt-32 sm:pb-20 sm:pt-40"
    >
      {/* grid texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />
      <CursorGlow containerRef={sectionRef} />

      <div className="relative mx-auto max-w-content px-5 sm:px-8">
        <Reveal className="flex items-center gap-4">
          <img
            src="/images/avatar.png"
            alt="Saifullah Khan"
            className="h-14 w-14 shrink-0 rounded-full border border-line bg-white object-cover"
          />
          <div className="min-w-0">
            <h1 className="font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
              Saifullah Khan
            </h1>
            <p className="mt-1 flex flex-wrap items-center gap-2 font-mono text-xs text-white/50">
              Full-stack developer
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/[0.03] px-2 py-0.5 text-[10px] text-white/45">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
                Open to opportunities
              </span>
            </p>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1">
              <a
                href="mailto:saifkp517@gmail.com"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-white/45 transition-colors hover:text-accent-400"
              >
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M2.5 4h11v8h-11V4zm0 0l5.5 4.5L13.5 4"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                saifkp517@gmail.com
              </a>
              <a
                href="tel:+919148654500"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-white/45 transition-colors hover:text-accent-400"
              >
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M3.5 2.5h2.4l1 3-1.5 1.2a8 8 0 004 4l1.2-1.5 3 1v2.4c0 .6-.5 1-1.1.95C7.6 13.1 2.9 8.4 2.55 3.6c-.05-.6.35-1.1.95-1.1z"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                +91 9148654500
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <p className="mt-6 max-w-xl text-balance text-[15px] leading-relaxed text-white/70 sm:text-base">
            I ship real-time systems, web games and production business software — TypeScript, NestJS,
            PostgreSQL and Redis.
          </p>
        </Reveal>

        <Reveal delay={140} className="mt-6 flex flex-wrap items-center gap-3">
          <CTAButton href="https://zentra-io.vercel.app/" variant="primary">
            Play Zentra
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
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
          <SocialLinks className="ml-1" />
        </Reveal>

        <Reveal delay={200} className="mt-8 flex flex-wrap items-center gap-2">
          {stack.map((item) => (
            <Chip key={item} strong={['TypeScript', 'NestJS', 'PostgreSQL'].includes(item)}>
              {item}
            </Chip>
          ))}
        </Reveal>

        <Reveal delay={260} className="mt-6 max-w-md">
          <GithubActivity />
        </Reveal>
      </div>
    </section>
  )
}
