import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Chip from '../../components/Chip.jsx'
import CTAButton from '../../components/CTAButton.jsx'
import Reveal from '../../components/Reveal.jsx'
import Footer from '../../components/Footer.jsx'
import ProjectHeader from '../../components/projects/ProjectHeader.jsx'
import { stackItems } from '../../data/stack.js'

const deepDives = [
  {
    title: 'The netcode',
    desc: 'Real-time position sync, shooting, and keeping engagement.',
  },
  {
    title: 'Keeping the FPS high',
    desc: 'The tricks that stopped it turning into a slideshow.',
  },
  {
    title: 'Filling empty lobbies',
    desc: 'Bot architecture — how bots navigate terrain, aim, and feel human.',
  },
]

export default function ZentraProject() {
  useEffect(() => {
    const previous = document.title
    document.title = 'Zentra — Saifullah Khan'
    return () => {
      document.title = previous
    }
  }, [])

  return (
    <div className="min-h-screen bg-ink">
      <ProjectHeader />
      <main className="mx-auto max-w-content px-5 py-14 sm:px-8 sm:py-20">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-accent-400">Project 1</p>
        </Reveal>
        <Reveal delay={60}>
          <h1 className="mt-3 max-w-2xl text-balance font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl">
            Zentra — a forest-based PVP shooter .io game
          </h1>
        </Reveal>

        <Reveal delay={100} className="mt-4 flex flex-wrap gap-2">
          {['NestJS', 'WebSockets', 'Redis', 'PostgreSQL'].map((s) => (
            <Chip key={s}>{s}</Chip>
          ))}
        </Reveal>

        {/* Play + screenshot */}
        <Reveal delay={140}>
          <div className="group relative mt-10 overflow-hidden rounded-2xl border border-line bg-panel">
            <div className="flex items-center justify-center bg-white">
              <img
                src="/images/zentra-gameplay.webp"
                alt="Zentra gameplay screenshot showing voxel forest with player character"
                className="h-auto w-full"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 flex translate-y-full flex-col items-start gap-4 border-t border-line bg-panel/95 p-6 backdrop-blur-sm transition-transform duration-300 ease-out group-hover:translate-y-0 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-white/60">Play it in the browser — no signup.</p>
              <CTAButton href="https://zentra-io.vercel.app/" variant="primary">
                Play now
              </CTAButton>
            </div>
          </div>
        </Reveal>

        {/* Story */}
        <Reveal delay={180}>
          <p className="mt-10 text-balance font-display text-lg font-medium text-accent-400">
            I didn't have a startup idea, so I built a game.
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/65">
            Games are the lowest-friction way to get users. Nobody signs up for a CRUD app for fun,
            but they'll click PLAY.
          </p>
        </Reveal>

        <Reveal delay={220}>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/70">
            You're a sphere, rolling around noisy, uneven terrain while pixelated rain falls.
            Everyone has a gun and the highest score wins. Canopies work as cover or ambush spots,
            enemy radar reveals positions, and you can trigger temporary invincibility mid-fight.
          </p>
        </Reveal>

        {/* Architecture breakdown */}
        <div className="mt-14">
          <Reveal>
            <h3 className="font-mono text-xs uppercase tracking-widest text-white/40">
              Under the hood
            </h3>
          </Reveal>
          <div className="mt-6 divide-y divide-line rounded-xl border border-line bg-panel">
            {stackItems.map((item, i) => (
              <Reveal key={item.key} delay={i * 70}>
                <div className="flex flex-col gap-4 p-5 sm:flex-row sm:gap-5 sm:p-6">
                  <div className="aspect-[16/10] w-full shrink-0 overflow-hidden rounded-lg border border-line bg-white/[0.03] sm:aspect-auto sm:h-24 sm:w-32">
                    {item.cover ? (
                      <img src={item.cover} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center p-1.5">
                        <span className="text-center font-mono text-[8px] uppercase leading-tight tracking-wide text-white/25">
                          Add cover image
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-white/35">
                      Under the hood / {item.to ? 'Published' : 'Coming soon'}
                    </p>
                    <div className="mt-2 border-t border-dashed border-white/15 pt-3">
                      <h4 className="text-balance font-display text-base font-semibold leading-snug tracking-tight text-white sm:text-lg">
                        {item.to ? (
                          <Link to={item.to} className="transition-colors hover:text-accent-400">
                            {item.headline}
                          </Link>
                        ) : (
                          item.headline
                        )}
                      </h4>
                      <p className="mt-1 font-mono text-xs italic text-white/40">{item.part}</p>
                      <p className="mt-3 text-sm leading-relaxed text-white/65">
                        {item.role}{' '}
                        {item.to && (
                          <>
                            For the full breakdown,{' '}
                            <Link
                              to={item.to}
                              className="text-accent-400 underline underline-offset-4 transition-colors hover:text-accent-300"
                            >
                              read the article
                            </Link>
                            .
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Deep dives teaser */}
        <Reveal delay={100}>
          <div className="mt-14 rounded-xl border border-dashed border-white/15 p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-white/40">
              Deep dives coming
            </p>
            <ul className="mt-4 space-y-3">
              {deepDives.map((d) => (
                <li key={d.title} className="flex items-start gap-3 text-sm text-white/65">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500/60" />
                  <span>
                    <span className="font-medium text-white/85">{d.title}</span> — {d.desc}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 font-mono text-[11px] text-white/35">Not published yet.</p>
          </div>
        </Reveal>

        <div className="mt-14 flex items-center justify-between border-t border-line pt-8 text-sm">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 font-mono text-xs text-white/50 transition-colors hover:text-accent-400"
          >
            ← Back to projects
          </Link>
          <a
            href="https://zentra-io.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-accent-400 transition-colors hover:text-accent-300"
          >
            Play Zentra ↗
          </a>
        </div>
      </main>
      <Footer />
    </div>
  )
}
