import { describe, expect, it } from 'vitest'
import { contactSchema } from './schema'

const valid = { intent: 'Hiring', message: 'Hello there, are you free to chat?', email: '', website: '', elapsedMs: 5000 }

describe('contactSchema', () => {
  it('accepts a valid message with no email', () => {
    expect(contactSchema.safeParse(valid).success).toBe(true)
  })

  it('accepts an email and trims it', () => {
    const result = contactSchema.safeParse({ ...valid, email: '  me@example.com ' })
    expect(result.success && result.data.email).toBe('me@example.com')
  })

  it('treats a missing email and website as empty', () => {
    const { email: _e, website: _w, ...rest } = valid
    const result = contactSchema.safeParse(rest)
    expect(result.success && [result.data.email, result.data.website]).toEqual(['', ''])
  })

  it.each([
    ['unknown intent', { intent: 'Spam' }],
    ['message too short', { message: 'hey' }],
    ['message too short after trimming', { message: '   hi   ' }],
    ['message too long', { message: 'x'.repeat(1001) }],
    ['malformed email', { email: 'not-an-email' }],
    ['overlong email', { email: `${'a'.repeat(250)}@example.com` }],
    ['missing elapsedMs', { elapsedMs: undefined }],
    ['negative elapsedMs', { elapsedMs: -1 }],
  ])('rejects %s', (_name, patch) => {
    expect(contactSchema.safeParse({ ...valid, ...patch }).success).toBe(false)
  })

  it('accepts messages at exactly the limits', () => {
    expect(contactSchema.safeParse({ ...valid, message: 'x'.repeat(5) }).success).toBe(true)
    expect(contactSchema.safeParse({ ...valid, message: 'x'.repeat(1000) }).success).toBe(true)
  })
})
