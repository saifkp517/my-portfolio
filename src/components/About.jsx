import Reveal from './Reveal.jsx'
import { CORE_STACK } from '../data/coreStack.js'

const STACK_NAMES = CORE_STACK.map((t) => t.name)
const STACK_TEXT = `${STACK_NAMES.slice(0, -1).join(', ')} and ${STACK_NAMES[STACK_NAMES.length - 1]}`

const BULLETS = [
  'I ship real-time systems, web games and production business software.',
  `Core stack: ${STACK_TEXT}.`,
]

export default function About() {
  return (
    <section id="about" className="px-5 py-10 sm:px-6 sm:py-12">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-widest text-white/55">About</p>
      </Reveal>
      <Reveal delay={60}>
        <ul className="mt-5 space-y-3">
          {BULLETS.map((bullet) => (
            <li key={bullet} className="flex gap-2.5 text-sm leading-relaxed text-white/75">
              <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-white/30" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
