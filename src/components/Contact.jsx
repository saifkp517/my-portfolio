import Reveal from './Reveal.jsx'
import CTAButton from './CTAButton.jsx'
import SocialLinks from './SocialLinks.jsx'

export default function Contact() {
  return (
    <section id="contact" className="px-5 py-12 sm:px-6 sm:py-16">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-widest text-white/55">Let's connect</p>
      </Reveal>
      <Reveal delay={60}>
        <h2 className="mt-3 text-balance font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
          Hiring for a full-stack or real-time role? Let's talk.
        </h2>
      </Reveal>

      <Reveal delay={120} className="mt-6 flex flex-wrap items-center gap-3">
        <CTAButton
          href="https://www.linkedin.com/in/saifullah-khan-1059aa236/"
          target="_blank"
          rel="noreferrer"
          variant="primary"
        >
          Get in touch
        </CTAButton>
        <SocialLinks />
      </Reveal>
    </section>
  )
}
