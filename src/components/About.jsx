import Reveal from './Reveal.jsx'

const BULLETS = [
  'Full-stack engineer building reliable software for real operational problems. I’ve shipped production applications, repaired data integrations, and built internal tools that make everyday work easier.',
  'Open to software engineering roles and freelance projects.',
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
