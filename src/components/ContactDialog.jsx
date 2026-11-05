'use client'

import { useEffect, useRef, useState } from 'react'
import CTAButton from './CTAButton.jsx'
import IconTile from './IconTile.jsx'
import { META_COLORS } from '../data/iconColors.js'

const INTENTS = ['Hiring', 'Project', 'Feedback', 'Just saying hi']
const MIN_LENGTH = 5
const MAX_LENGTH = 1000
const SHOW_COUNTER_AT = 900

const EMAIL = 'saifkp517@gmail.com'
const LINKEDIN = 'https://www.linkedin.com/in/saifullah-khan-1059aa236/'

// Messages for the error codes returned by POST /api/contact.
const ERROR_COPY = {
  invalid_request: 'Please check your message and try again.',
  too_fast: 'That was quick. Please try again.',
  rate_limited: 'Too many messages from this network. Please try again later, or email me.',
  server_error: 'Something went wrong on my side. Please try again, or email me.',
}
const NETWORK_ERROR = 'Could not reach the server. Check your connection and try again.'

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input:not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])'

const EYEBROW = 'font-mono text-xs uppercase tracking-widest text-white/55'
const FIELD =
  'mt-2 block w-full rounded-sm border border-line bg-ink px-3 font-body text-base text-white placeholder:text-white/35 transition-colors focus:border-accent-500/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-panel motion-reduce:transition-none'
const LINK =
  'inline-flex min-h-[44px] items-center text-accent-400 underline underline-offset-4 transition-colors hover:text-accent-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500'

export default function ContactDialog({ onClose }) {
  const dialogRef = useRef(null)
  const messageRef = useRef(null)
  const closeRef = useRef(null)
  const openedAt = useRef(Date.now())

  const [intent, setIntent] = useState('Just saying hi')
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [error, setError] = useState('')

  // Open as a modal (native focus containment, inert background, Esc), and give
  // focus back to whatever opened it on close.
  useEffect(() => {
    const dialog = dialogRef.current
    const trigger = document.activeElement
    dialog.showModal()
    return () => {
      dialog.close()
      trigger?.focus?.()
    }
  }, [])

  // iOS shrinks the visual viewport (not the layout viewport) when the keyboard
  // opens, which would leave the bottom sheet, and its Send button, behind the
  // keyboard. Track it so the sheet sits above the keyboard and fits what's left.
  useEffect(() => {
    const viewport = window.visualViewport
    const dialog = dialogRef.current
    if (!viewport) return
    const update = () => {
      const keyboard = Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop)
      dialog.style.setProperty('--keyboard', `${keyboard}px`)
      dialog.style.setProperty('--visible-height', `${viewport.height}px`)
    }
    update()
    viewport.addEventListener('resize', update)
    viewport.addEventListener('scroll', update)
    return () => {
      viewport.removeEventListener('resize', update)
      viewport.removeEventListener('scroll', update)
    }
  }, [])

  // The Send button unmounts on success, so move focus somewhere sensible.
  useEffect(() => {
    if (status === 'success') closeRef.current?.focus()
  }, [status])

  function trapTab(event) {
    if (event.key !== 'Tab') return
    const items = [...dialogRef.current.querySelectorAll(FOCUSABLE)].filter((el) => el.offsetParent !== null)
    if (!items.length) return
    const first = items[0]
    const last = items[items.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  async function submit(event) {
    event.preventDefault()
    if (status === 'loading') return
    if (message.trim().length < MIN_LENGTH) {
      setError(`Please write at least ${MIN_LENGTH} characters.`)
      setStatus('error')
      messageRef.current?.focus()
      return
    }
    const website = new FormData(event.currentTarget).get('website') ?? ''
    setStatus('loading')
    setError('')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          intent,
          message,
          email,
          website,
          elapsedMs: Date.now() - openedAt.current,
        }),
      })
      const data = await response.json().catch(() => null)
      if (response.ok && data?.ok) {
        setStatus('success')
        return
      }
      setError(ERROR_COPY[data?.error] ?? ERROR_COPY.server_error)
    } catch {
      setError(NETWORK_ERROR)
    }
    setStatus('error')
  }

  const sending = status === 'loading'

  return (
    <dialog
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-title"
      onKeyDown={trapTab}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      className="hero-enter fixed inset-x-0 bottom-0 top-auto m-0 w-full max-w-none flex-col overflow-hidden rounded-t-xl border border-b-0 border-line bg-panel p-0 text-white backdrop:bg-ink/80 open:flex max-sm:bottom-[var(--keyboard,0px)] max-sm:max-h-[min(90dvh,calc(var(--visible-height,100dvh)-1rem))] sm:inset-0 sm:m-auto sm:h-fit sm:max-h-[90dvh] sm:max-w-md sm:rounded-xl sm:border-b"
    >
      <header className="flex shrink-0 items-center justify-between border-b border-line py-1 pl-5 pr-2 sm:pl-6">
        <h2 id="contact-title" className="font-display text-base font-semibold tracking-tight text-white">
          Say hi 👋
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="inline-flex h-11 w-11 items-center justify-center rounded-sm text-white/60 transition-colors hover:text-accent-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 motion-reduce:transition-none"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </button>
      </header>

      {status === 'success' ? (
        <div className="px-5 py-6 sm:px-6">
          <div role="status" className="flex items-start gap-3">
            <IconTile color={META_COLORS.accent}>
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </IconTile>
            <p className="text-sm leading-relaxed text-white/75">Thanks, got it. I usually reply within 24h.</p>
          </div>
          <CTAButton ref={closeRef} variant="secondary" onClick={onClose} className="mt-6 min-h-[44px] w-full">
            Close
          </CTAButton>
        </div>
      ) : (
        <form onSubmit={submit} className="flex min-h-0 flex-1 flex-col">
          <div className="min-h-0 flex-1 space-y-5 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6">
            <fieldset>
              <legend className={EYEBROW}>What's this about?</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {INTENTS.map((item) => {
                  const selected = intent === item
                  return (
                    <label
                      key={item}
                      className={`inline-flex min-h-[44px] cursor-pointer items-center rounded-md border px-3 font-mono text-xs tracking-wide transition-colors focus-within:ring-2 focus-within:ring-accent-500 focus-within:ring-offset-2 focus-within:ring-offset-panel motion-reduce:transition-none ${
                        selected
                          ? 'border-accent-500/40 bg-accent-500/10 text-accent-400'
                          : 'border-white/12 bg-white/[0.03] text-white/60 hover:text-white/80'
                      }`}
                    >
                      <input
                        type="radio"
                        name="intent"
                        value={item}
                        checked={selected}
                        onChange={() => setIntent(item)}
                        className="sr-only"
                      />
                      {item}
                    </label>
                  )
                })}
              </div>
            </fieldset>

            <div>
              <label htmlFor="contact-message" className={EYEBROW}>
                Message
              </label>
              <textarea
                ref={messageRef}
                id="contact-message"
                name="message"
                required
                rows={4}
                minLength={MIN_LENGTH}
                maxLength={MAX_LENGTH}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                className={`${FIELD} resize-none py-3 leading-relaxed`}
              />
              {message.length >= SHOW_COUNTER_AT && (
                <p aria-live="polite" className="mt-1.5 text-right font-mono text-xs text-white/55">
                  {message.length}/{MAX_LENGTH}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="contact-email" className={EYEBROW}>
                Email <span className="normal-case tracking-normal text-white/45">(optional)</span>
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                maxLength={254}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                aria-describedby="contact-email-help"
                className={`${FIELD} h-11`}
              />
              <p id="contact-email-help" className="mt-1.5 text-xs leading-relaxed text-white/55">
                so I can reply
                {!email.trim() && '. Without one I can’t, but feedback is still welcome.'}
              </p>
            </div>

            {/* Honeypot: invisible to people, tempting to bots. */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>
                Website
                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>
          </div>

          <div className="shrink-0 space-y-3 border-t border-line px-5 pb-4 pt-4 sm:px-6">
            <div aria-live="polite" className="empty:hidden">
              {status === 'error' && <p className="text-sm leading-relaxed text-meta-rose">{error}</p>}
            </div>
            <CTAButton type="submit" disabled={sending} className="min-h-[44px] w-full disabled:opacity-60">
              {sending && (
                <span
                  aria-hidden="true"
                  className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-ink/30 border-t-ink motion-reduce:animate-none"
                />
              )}
              {sending ? 'Sending…' : status === 'error' ? 'Try again' : 'Send'}
            </CTAButton>
          </div>
        </form>
      )}

      <p className="shrink-0 border-t border-line px-5 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1 font-mono text-xs text-white/55 sm:px-6 sm:pb-1">
        <a href={`mailto:${EMAIL}`} className={LINK}>
          or email me directly
        </a>
        <span aria-hidden="true" className="mx-3 text-white/30">
          ·
        </span>
        <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className={LINK}>
          LinkedIn<span className="sr-only"> (opens in a new tab)</span>
        </a>
      </p>
    </dialog>
  )
}
