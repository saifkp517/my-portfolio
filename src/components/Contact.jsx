import Reveal from './Reveal.jsx'
import CTAButton from './CTAButton.jsx'
import SocialLinks from './SocialLinks.jsx'

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-line py-16 sm:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-accent-500/10 blur-[110px]"
      />
      <div className="relative mx-auto max-w-content px-5 sm:px-8">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-white/40">Let's connect</p>
        </Reveal>
        <Reveal delay={60}>
          <h2 className="mt-3 max-w-2xl text-balance font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
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
      </div>
    </section>
  )
}
