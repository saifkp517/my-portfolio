import Reveal from './Reveal.jsx'
import GithubActivity from './GithubActivity.jsx'

export default function Activity() {
  return (
    <section id="activity" className="pt-6 pb-10 sm:pb-12">
      <Reveal className="px-5 sm:px-6">
        <p className="font-mono text-xs uppercase tracking-widest text-white/55">Activity</p>
      </Reveal>
      <Reveal delay={60} className="mt-4">
        <GithubActivity />
      </Reveal>
    </section>
  )
}
