import { createHash } from 'node:crypto'

/** At most this many stored messages per IP in the trailing window. */
export const RATE_LIMIT = { max: 5, windowMs: 60 * 60 * 1000 }

/** `recentCount` is how many messages this IP already stored inside the window. */
export function isRateLimited(recentCount: number): boolean {
  return recentCount >= RATE_LIMIT.max
}

export function windowStart(now: number): string {
  return new Date(now - RATE_LIMIT.windowMs).toISOString()
}

/** Only a salted hash of the IP is ever stored, never the address itself. */
export function hashIp(ip: string, salt: string): string {
  return createHash('sha256').update(`${salt}:${ip}`).digest('hex')
}

export function clientIp(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  return forwarded || headers.get('x-real-ip')?.trim() || 'unknown'
}
