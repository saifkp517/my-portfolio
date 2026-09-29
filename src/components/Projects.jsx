import { Link } from 'react-router-dom'
import Chip from './Chip.jsx'
import Reveal from './Reveal.jsx'
import { projects } from '../data/projects.js'

export default function Projects() {
  return (
    <section id="projects" className="border-t border-line py-16 sm:py-20">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-white/40">Projects</p>
        </Reveal>

        <div className="mt-6 divide-y divide-line rounded-xl border border-line bg-panel">
          {projects.map((item, i) => (
            <Reveal key={item.key} delay={i * 70}>
              <div className="flex gap-4 p-5 sm:gap-5 sm:p-6">
                <Link
                  to={item.to}
                  className="h-20 w-28 shrink-0 overflow-hidden rounded-lg border border-line bg-white sm:h-24 sm:w-32"
                >
                  <img src={item.cover} alt="" className="h-full w-full object-cover" />
                </Link>

                <div className="min-w-0">
                  <h3 className="text-balance font-display text-base font-semibold leading-snug tracking-tight text-white sm:text-lg">
                    <Link to={item.to} className="transition-colors hover:text-accent-400">
                      {item.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">{item.tagline}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {item.tags.map((t) => (
                      <Chip key={t}>{t}</Chip>
                    ))}
                  </div>
                  <Link
                    to={item.to}
                    className="mt-3 inline-block font-mono text-xs font-semibold text-accent-400 transition-colors hover:text-accent-300"
                  >
                    Read the case study →
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
