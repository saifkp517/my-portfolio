import { beforeEach, describe, expect, it, vi } from 'vitest'
import { handleContact, type Deps } from './handler'
import { buildEmail } from './notify'
import { memoryStore } from './store'

const body = { intent: 'Project', message: 'Can you build us a booking backend?', email: 'founder@example.com', website: '', elapsedMs: 8000 }

function post(payload: unknown, ip = '203.0.113.7') {
  return new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'x-forwarded-for': ip, 'user-agent': 'vitest' },
    body: typeof payload === 'string' ? payload : JSON.stringify(payload),
  })
}

let deps: Deps & { store: ReturnType<typeof memoryStore>; notify: ReturnType<typeof vi.fn> }

beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => {})
  deps = { store: memoryStore(), notify: vi.fn().mockResolvedValue(undefined), salt: 'test-salt', now: Date.now }
})

describe('POST /api/contact handler', () => {
  it('stores a valid message, emails it and returns ok', async () => {
    const res = await handleContact(post(body), deps)
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ ok: true })
    expect(deps.store.rows).toHaveLength(1)
    expect(deps.store.rows[0]).toMatchObject({ intent: 'Project', email: 'founder@example.com', user_agent: 'vitest' })
    expect(deps.store.rows[0].ip_hash).toMatch(/^[0-9a-f]{64}$/)
    expect(deps.notify).toHaveBeenCalledOnce()
  })

  it('stores a missing email as null', async () => {
    await handleContact(post({ ...body, email: '' }), deps)
    expect(deps.store.rows[0].email).toBeNull()
  })

  it.each([
    ['not JSON', 'nope'],
    ['an invalid payload', { ...body, message: 'hi' }],
    ['an oversized body', JSON.stringify({ ...body, message: 'x'.repeat(20_000) })],
  ])('returns 400 invalid_request for %s', async (_name, payload) => {
    const res = await handleContact(post(payload), deps)
    expect(res.status).toBe(400)
    expect(await res.json()).toEqual({ ok: false, error: 'invalid_request' })
    expect(deps.store.rows).toHaveLength(0)
  })

  it('silently succeeds without storing when the honeypot is filled', async () => {
    const res = await handleContact(post({ ...body, website: 'http://spam.example' }), deps)
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ ok: true })
    expect(deps.store.rows).toHaveLength(0)
    expect(deps.notify).not.toHaveBeenCalled()
  })

  it('rejects submissions faster than 2 seconds', async () => {
    const res = await handleContact(post({ ...body, elapsedMs: 800 }), deps)
    expect(res.status).toBe(400)
    expect(await res.json()).toEqual({ ok: false, error: 'too_fast' })
    expect(deps.store.rows).toHaveLength(0)
  })

  it('rate limits the 6th message from one IP within the hour, but not other IPs', async () => {
    for (let i = 0; i < 5; i++) expect((await handleContact(post(body), deps)).status).toBe(200)

    const sixth = await handleContact(post(body), deps)
    expect(sixth.status).toBe(429)
    expect(await sixth.json()).toEqual({ ok: false, error: 'rate_limited' })
    expect(deps.store.rows).toHaveLength(5)

    expect((await handleContact(post(body, '198.51.100.9'), deps)).status).toBe(200)
  })

  it('lets an IP send again once its messages are older than an hour', async () => {
    let now = Date.now()
    deps = { ...deps, store: memoryStore(() => now), now: () => now }
    for (let i = 0; i < 5; i++) await handleContact(post(body), deps)
    expect((await handleContact(post(body), deps)).status).toBe(429)
    now += 61 * 60 * 1000
    expect((await handleContact(post(body), deps)).status).toBe(200)
  })

  it('still returns ok when the email fails but the message was stored', async () => {
    deps.notify.mockRejectedValue(new Error('resend down'))
    const res = await handleContact(post(body), deps)
    expect(res.status).toBe(200)
    expect(deps.store.rows).toHaveLength(1)
  })

  it('returns 500 server_error, with no internals, when the database fails', async () => {
    deps.store.insert = async () => {
      throw new Error('connection refused to db.internal:5432')
    }
    const res = await handleContact(post(body), deps)
    expect(res.status).toBe(500)
    const text = await res.text()
    expect(JSON.parse(text)).toEqual({ ok: false, error: 'server_error' })
    expect(text).not.toContain('internal')
    expect(deps.notify).not.toHaveBeenCalled()
  })

  it('returns 500 when production config is missing', async () => {
    expect((await handleContact(post(body), null)).status).toBe(500)
  })
})

describe('buildEmail', () => {
  it('uses the first 50 characters of the message in the subject and sets reply-to', () => {
    const message = `${'a'.repeat(60)}\nsecond line`
    const mail = buildEmail({ intent: 'Hiring', message, email: 'me@example.com' })
    expect(mail.subject).toBe(`[Portfolio] Hiring: ${'a'.repeat(50)}`)
    expect(mail.text).toContain('second line')
    expect(mail.replyTo).toBe('me@example.com')
  })

  it('has no reply-to when no email was given, and never breaks the subject across lines', () => {
    const mail = buildEmail({ intent: 'Feedback', message: 'line one\nline two', email: null })
    expect(mail.replyTo).toBeUndefined()
    expect(mail.subject).not.toContain('\n')
  })
})
