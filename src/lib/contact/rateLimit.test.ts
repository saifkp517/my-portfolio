import { describe, expect, it } from 'vitest'
import { RATE_LIMIT, clientIp, hashIp, isRateLimited, windowStart } from './rateLimit'

describe('isRateLimited', () => {
  it('allows the first 5 messages and blocks the 6th', () => {
    expect(RATE_LIMIT.max).toBe(5)
    expect([0, 1, 4].map(isRateLimited)).toEqual([false, false, false])
    expect([5, 6, 50].map(isRateLimited)).toEqual([true, true, true])
  })
})

describe('windowStart', () => {
  it('is exactly one hour before now', () => {
    const now = Date.UTC(2026, 9, 30, 12, 0, 0)
    expect(windowStart(now)).toBe('2026-10-30T11:00:00.000Z')
  })
})

describe('hashIp', () => {
  it('is a stable SHA-256 hex digest that depends on the salt', () => {
    const a = hashIp('203.0.113.7', 'salt-a')
    expect(a).toMatch(/^[0-9a-f]{64}$/)
    expect(hashIp('203.0.113.7', 'salt-a')).toBe(a)
    expect(hashIp('203.0.113.7', 'salt-b')).not.toBe(a)
    expect(hashIp('203.0.113.8', 'salt-a')).not.toBe(a)
    expect(a).not.toContain('203.0.113.7')
  })
})

describe('clientIp', () => {
  it('uses the first x-forwarded-for entry, then x-real-ip, then "unknown"', () => {
    expect(clientIp(new Headers({ 'x-forwarded-for': '1.1.1.1, 2.2.2.2' }))).toBe('1.1.1.1')
    expect(clientIp(new Headers({ 'x-real-ip': '3.3.3.3' }))).toBe('3.3.3.3')
    expect(clientIp(new Headers())).toBe('unknown')
  })
})
