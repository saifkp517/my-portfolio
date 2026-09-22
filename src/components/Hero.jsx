import Chip from './Chip.jsx'
import CTAButton from './CTAButton.jsx'
import Reveal from './Reveal.jsx'

const stack = [
  'TypeScript',
  'NestJS',
  'Next.js',
  'PostgreSQL',
  'Redis',
  'WebSockets',
  'TypeORM',
  'Supabase',
  'Metabase',
]

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40">
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
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-10 h-[28rem] w-[28rem] rounded-full bg-accent-500/15 blur-[130px]"
      />

      <div className="relative mx-auto max-w-content px-5 sm:px-8">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-accent-400">
            Saifullah Khan / Full-stack developer
          </p>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="mt-5 max-w-3xl text-balance font-display text-3xl font-semibold leading-[1.15] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.4rem]">
            I ship real-time systems, web games and production business software.
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-6 max-w-2xl text-balance text-base leading-relaxed text-white/65 sm:text-lg">
            Proficient in TypeScript, NestJS, PostgreSQL and NoSQL. I excel at ideating, building and
            launching MVPs for rapid market feedback, and I'm currently deepening my expertise in
            scalability while balancing speed, creativity and production readiness.
          </p>
        </Reveal>

        <Reveal delay={240} className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <CTAButton href="https://zentra-io.vercel.app/" variant="primary">
            Play Zentra
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M5 3.5l7 4.5-7 4.5v-9z" fill="currentColor" />
            </svg>
          </CTAButton>
          <CTAButton href="#erp" variant="secondary">
            View the ERP case study
          </CTAButton>
          <CTAButton
            href="https://docs.google.com/document/d/117cdGu3azu3W2vlKu8MnX3lV8y8EJDJcKI-AsZ8yk2M/edit?usp=sharing"
            target="_blank"
            rel="noreferrer"
            variant="ghost"
            className="!px-2"
          >
            Resume
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M3.5 8h9m0 0L8.5 4m4 4L8.5 12"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </CTAButton>
        </Reveal>

        <Reveal delay={320} className="mt-14 flex flex-wrap items-center gap-2 sm:mt-16">
          {stack.map((item) => (
            <Chip key={item} strong={['TypeScript', 'NestJS', 'PostgreSQL'].includes(item)}>
              {item}
            </Chip>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
