import Reveal from './Reveal.jsx'
import CTAButton from './CTAButton.jsx'

const links = [
  {
    label: 'Email',
    value: 'saifkhan501721@gmail.com',
    href: 'mailto:saifkhan501721@gmail.com',
  },
  {
    label: 'GitHub',
    value: 'github.com/saifkp517',
    href: 'https://github.com/saifkp517',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/saifullah-khan',
    href: 'https://www.linkedin.com/in/saifullah-khan-1059aa236/',
  },
  {
    label: 'Phone',
    value: '+91 91486 54500',
    href: 'tel:+919148654500',
  },
]

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-line py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-accent-500/10 blur-[110px]"
      />
      <div className="relative mx-auto max-w-content px-5 sm:px-8">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-accent-400">Let's connect</p>
        </Reveal>
        <Reveal delay={60}>
          <h2 className="mt-3 max-w-2xl text-balance font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl">
            Hiring for a full-stack or real-time role? Let's talk.
          </h2>
        </Reveal>

        <Reveal delay={120} className="mt-9">
          <CTAButton
            href="https://www.linkedin.com/in/saifullah-khan-1059aa236/"
            target="_blank"
            rel="noreferrer"
            variant="primary"
          >
            Get in touch
          </CTAButton>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
          {links.map((link, i) => (
            <Reveal key={link.label} delay={i * 60}>
              <a
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                className="group block rounded-xl border border-line bg-panel p-5 transition-colors hover:border-accent-500/40"
              >
                <span className="block font-mono text-[11px] uppercase tracking-wide text-white/40">
                  {link.label}
                </span>
                <span className="mt-1 block truncate text-sm font-medium text-white/85 group-hover:text-accent-400">
                  {link.value}
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
