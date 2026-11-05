import { Resend } from 'resend'
import type { ContactInput } from './schema'

export type Notification = Pick<ContactInput, 'intent' | 'message'> & { email: string | null }

export function buildEmail(note: Notification) {
  const preview = note.message.replace(/\s+/g, ' ').slice(0, 50)
  return {
    subject: `[Portfolio] ${note.intent}: ${preview}`,
    text: `Intent: ${note.intent}\nFrom: ${note.email ?? 'no email given'}\n\n${note.message}\n`,
    replyTo: note.email ?? undefined,
  }
}

export type Notify = (note: Notification) => Promise<void>

/** Emails the message to me through Resend. Throws if Resend rejects it. */
export function resendNotify(apiKey: string, from: string, to: string): Notify {
  const resend = new Resend(apiKey)
  return async (note) => {
    const { error } = await resend.emails.send({ from, to, ...buildEmail(note) })
    if (error) throw new Error(error.message)
  }
}

/** Used when Resend isn't configured: log it so local development still works. */
export const logNotify: Notify = async (note) => {
  console.info('[contact] RESEND_API_KEY not set, message not emailed:', note)
}
