import Chip from './Chip.jsx'
import CTAButton from './CTAButton.jsx'
import Reveal from './Reveal.jsx'

const modules = [
  {
    title: 'Watchman + Billing',
    desc: 'Both records captured separately and cross-checked automatically, with a reconciliation page and tools that make audit and editing easier.',
  },
  {
    title: 'Trucks',
    desc: 'Arrivals, departures and cargo tied to dispatch records.',
  },
  {
    title: 'Users & Permissions',
    desc: 'Role-based access for watchman, salesperson, production and admin.',
  },
  {
    title: 'Ageing Report',
    desc: 'Outstanding receivables by age, for collections follow-up.',
  },
  {
    title: 'Reporting',
    desc: 'Metabase connected directly to the Supabase Postgres instance, giving the owner dashboards without querying the database.',
  },
]

export default function Erp() {
  return (
    <section id="erp" className="border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-accent-400">Project 2</p>
        </Reveal>
        <Reveal delay={60}>
          <h2 className="mt-3 max-w-2xl text-balance font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl">
            Custom ERP for a concrete block manufacturer
          </h2>
        </Reveal>

        <Reveal delay={100} className="mt-4 flex flex-wrap gap-2">
          {['Next.js', 'NestJS', 'PostgreSQL (TypeORM)', 'Supabase', 'Metabase'].map((s) => (
            <Chip key={s}>{s}</Chip>
          ))}
        </Reveal>

        <Reveal delay={120}>
          <a
            href="https://app.notion.com/p/Custom-ERP-for-a-Concrete-Block-Manufacturer-Replacing-Manual-Reconciliation-with-a-Single-Source-3af6a4af6be580a2bb0fe216efb5b63a"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block text-sm font-medium text-white/60 underline underline-offset-4 transition-colors hover:text-accent-400"
          >
            Read the full write-up →
          </a>
        </Reveal>

        {/* Headline stat */}
        <Reveal delay={140}>
          <div className="mt-10 flex flex-col items-start gap-6 rounded-2xl border border-line bg-panel p-8 sm:flex-row sm:items-center sm:gap-10 sm:p-10">
            <div className="font-display text-4xl font-bold tracking-tight text-accent-500 sm:text-5xl md:text-6xl">
              4–6 hrs
              <span className="mx-2 text-white/25">→</span>
              ~20 min
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-white/65 sm:border-l sm:border-line sm:pl-8">
              A weekly billing audit, automated down from most of an afternoon to about twenty
              minutes.
            </p>
          </div>
        </Reveal>

        {/* Problem / Solution */}
        <div className="mt-14 grid grid-cols-1 gap-8 sm:mt-16 sm:grid-cols-2 sm:gap-10">
          <Reveal>
            <h3 className="font-mono text-xs uppercase tracking-widest text-white/40">Problem</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Billing ran off two independently maintained paper logs — a watchman's record of what
              physically left the factory, and a salesperson's record of what was sold. The owner
              had to cross-check them line by line every week before labor payments, which was slow
              and error-prone.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h3 className="font-mono text-xs uppercase tracking-widest text-white/40">Solution</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              A full-stack ERP that captures both records at the point of entry and reconciles them
              automatically, removing the weekly manual audit.
            </p>
          </Reveal>
        </div>

        {/* Module grid */}
        <div className="mt-16 sm:mt-20">
          <Reveal>
            <h3 className="font-mono text-xs uppercase tracking-widest text-white/40">Modules</h3>
          </Reveal>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((mod, i) => (
              <Reveal key={mod.title} delay={i * 70}>
                <div className="h-full overflow-hidden rounded-xl border border-line bg-panel transition-colors hover:border-accent-500/30">
                  {mod.title === 'Reporting' ? (
                    <div className="grid grid-cols-2 gap-px border-b border-line bg-line">
                      <div className="flex aspect-[8/10] items-center justify-center bg-white">
                        <img
                          src="/images/reporting-1.png"
                          alt="Reporting module Metabase dashboard screenshot 1"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex aspect-[8/10] items-center justify-center bg-white">
                        <img
                          src="/images/reporting-2.png"
                          alt="Reporting module Metabase dashboard screenshot 2"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex aspect-[16/10] items-center justify-center border-b border-line bg-white text-center">
                      {mod.title === 'Watchman + Billing' ? (
                        <img
                          src="/images/watchman-billing.png"
                          alt="Watchman + Billing module screenshot"
                          className="h-full w-full object-cover"
                        />
                      ) : mod.title === 'Trucks' ? (
                        <img
                          src="/images/trucks.png"
                          alt="Trucks module screenshot"
                          className="h-full w-full object-cover"
                        />
                      ) : mod.title === 'Users & Permissions' ? (
                        <img
                          src="/images/users-permissions.png"
                          alt="Users & Permissions module screenshot"
                          className="h-full w-full object-cover"
                        />
                      ) : mod.title === 'Ageing Report' ? (
                        <img
                          src="/images/ageing-report.png"
                          alt="Ageing Report module screenshot"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="px-4 font-mono text-[11px] text-ink/35">
                          Add screenshot here — {mod.title}
                        </span>
                      )}
                    </div>
                  )}
                  <div className="p-5">
                    <h4 className="font-mono text-sm font-semibold text-white">{mod.title}</h4>
                    <p className="mt-2 text-xs leading-relaxed text-white/60">{mod.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Callout */}
        <Reveal delay={160}>
          <div className="mt-14 flex flex-col items-start gap-6 rounded-xl border border-accent-500/25 bg-accent-500/[0.05] p-7 sm:mt-16 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <p className="max-w-xl text-sm leading-relaxed text-white/75">
              This runs on live production data, so I can't share credentials publicly — but I'm
              happy to give a quick guided demo. Metabase reports aren't shown during demos, for
              privacy.
            </p>
            <CTAButton
              href="https://www.linkedin.com/in/saifullah-khan-1059aa236/"
              target="_blank"
              rel="noreferrer"
              variant="primary"
              className="shrink-0"
            >
              Request a demo
            </CTAButton>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
