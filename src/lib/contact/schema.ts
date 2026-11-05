import { z } from 'zod'

export const INTENTS = ['Hiring', 'Project', 'Feedback', 'Just saying hi'] as const
export const MESSAGE_MIN = 5
export const MESSAGE_MAX = 1000
/** Humans can't open the sheet and send a message faster than this. */
export const MIN_ELAPSED_MS = 2000

const optionalEmail = z.preprocess(
  (value) => (typeof value === 'string' ? value.trim() : value),
  z.union([z.literal(''), z.string().email().max(254)]),
)

export const contactSchema = z.object({
  intent: z.enum(INTENTS),
  message: z.string().trim().min(MESSAGE_MIN).max(MESSAGE_MAX),
  email: optionalEmail.optional().default(''),
  /** Honeypot: real visitors never see or fill this field. */
  website: z.string().max(1000).optional().default(''),
  /** Milliseconds between opening the sheet and submitting it. */
  elapsedMs: z.number().finite().min(0),
})

export type ContactInput = z.infer<typeof contactSchema>

export type ContactErrorCode = 'invalid_request' | 'too_fast' | 'rate_limited' | 'server_error'
export type ContactResponse = { ok: true } | { ok: false; error: ContactErrorCode }
