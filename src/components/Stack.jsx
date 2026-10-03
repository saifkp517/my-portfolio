import Reveal from './Reveal.jsx'
import TechIcon from './TechIcon.jsx'
import { STACK_CATEGORIES } from '../data/techStack.js'
import { hexToRgba } from '../lib/color.js'

export default function Stack() {
  return (
    <section id="stack" className="px-5 py-10 sm:px-6 sm:py-12">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-widest text-white/55">Stack</p>
      </Reveal>
      <Reveal delay={60} className="mt-5 divide-y divide-line border-y border-line">
        {STACK_CATEGORIES.map((cat) => (
          <div key={cat.label} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:gap-6">
            <p className="w-full shrink-0 font-mono text-xs text-white/55 sm:w-28">{cat.label}</p>
            <div className="flex flex-wrap gap-2">
              {cat.items.map((item) => (
                <span
                  key={item.name}
                  className="inline-flex items-center gap-1.5 rounded-sm border px-2.5 py-1.5 font-mono text-xs text-white/70"
                  style={{
                    backgroundColor: hexToRgba(item.color, 0.11),
                    borderColor: hexToRgba(item.color, 0.11),
                  }}
                >
                  <TechIcon slug={item.slug} color={item.color} />
                  {item.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  )
}
