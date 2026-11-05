import { createClient } from '@supabase/supabase-js'

export type ContactRow = {
  intent: string
  message: string
  email: string | null
  ip_hash: string
  user_agent: string
}

/** The two things the handler needs from a database. */
export interface ContactStore {
  countSince(ipHash: string, sinceIso: string): Promise<number>
  insert(row: ContactRow): Promise<void>
}

/** Postgres via Supabase, using the server-only service-role key. */
export function supabaseStore(url: string, serviceRoleKey: string): ContactStore {
  const db = createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
  return {
    async countSince(ipHash, sinceIso) {
      const { count, error } = await db
        .from('contact_messages')
        .select('id', { count: 'exact', head: true })
        .eq('ip_hash', ipHash)
        .gte('created_at', sinceIso)
      if (error) throw new Error(error.message)
      return count ?? 0
    },
    async insert(row) {
      const { error } = await db.from('contact_messages').insert(row)
      if (error) throw new Error(error.message)
    },
  }
}

/** Local-development and test stand-in. Never used in production. */
export function memoryStore(now: () => number = Date.now): ContactStore & { rows: (ContactRow & { createdAt: number })[] } {
  const rows: (ContactRow & { createdAt: number })[] = []
  return {
    rows,
    async countSince(ipHash, sinceIso) {
      const since = Date.parse(sinceIso)
      return rows.filter((row) => row.ip_hash === ipHash && row.createdAt >= since).length
    },
    async insert(row) {
      rows.push({ ...row, createdAt: now() })
    },
  }
}
