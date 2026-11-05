import { clientIp, hashIp, isRateLimited, windowStart } from './rateLimit'
import { contactSchema, MIN_ELAPSED_MS, type ContactErrorCode, type ContactResponse } from './schema'
import { logNotify, resendNotify, type Notify } from './notify'
import { memoryStore, supabaseStore, type ContactStore } from './store'

const MAX_BODY_CHARS = 10_000

export type Deps = {
  store: ContactStore
  notify: Notify
  salt: string
  now: () => number
}

function reply(body: ContactResponse, status: number): Response {
  return Response.json(body, { status })
}
const fail = (error: ContactErrorCode, status: number) => reply({ ok: false, error }, status)

/** Reads config from the environment. Returns null if production is misconfigured. */
export function depsFromEnv(env: NodeJS.ProcessEnv = process.env): Deps | null {
  const production = env.NODE_ENV === 'production'
  const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, IP_HASH_SALT } = env

  if (production && !(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY && IP_HASH_SALT)) {
    console.error('[contact] SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY and IP_HASH_SALT must be set')
    return null
  }

  // In development with no database configured, keep messages in memory so the
  // form (and the rate limit) can be tried locally.
  const globalStore = globalThis as { __contactStore?: ContactStore }
  const store =
    SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY
      ? supabaseStore(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
      : (globalStore.__contactStore ??= memoryStore())

  const { RESEND_API_KEY, CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL } = env
  const notify =
    RESEND_API_KEY && CONTACT_FROM_EMAIL && CONTACT_TO_EMAIL
      ? resendNotify(RESEND_API_KEY, CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL)
      : logNotify

  return { store, notify, salt: IP_HASH_SALT ?? 'development-salt', now: Date.now }
}

export async function handleContact(request: Request, deps: Deps | null = depsFromEnv()): Promise<Response> {
  if (!deps) return fail('server_error', 500)

  let payload: unknown
  try {
    const raw = await request.text()
    if (raw.length > MAX_BODY_CHARS) return fail('invalid_request', 400)
    payload = JSON.parse(raw)
  } catch {
    return fail('invalid_request', 400)
  }

  const parsed = contactSchema.safeParse(payload)
  if (!parsed.success) return fail('invalid_request', 400)
  const { intent, message, email, website, elapsedMs } = parsed.data

  // Bots fill every field. Pretend it worked and store nothing.
  if (website) return reply({ ok: true }, 200)
  if (elapsedMs < MIN_ELAPSED_MS) return fail('too_fast', 400)

  const ipHash = hashIp(clientIp(request.headers), deps.salt)

  try {
    if (isRateLimited(await deps.store.countSince(ipHash, windowStart(deps.now())))) {
      return fail('rate_limited', 429)
    }
    await deps.store.insert({
      intent,
      message,
      email: email || null,
      ip_hash: ipHash,
      user_agent: (request.headers.get('user-agent') ?? '').slice(0, 512),
    })
  } catch (error) {
    console.error('[contact] storing message failed:', error instanceof Error ? error.message : error)
    return fail('server_error', 500)
  }

  // The message is safe in the database; a failed email must not fail the request.
  try {
    await deps.notify({ intent, message, email: email || null })
  } catch (error) {
    console.error('[contact] notification failed:', error instanceof Error ? error.message : error)
  }

  return reply({ ok: true }, 200)
}
