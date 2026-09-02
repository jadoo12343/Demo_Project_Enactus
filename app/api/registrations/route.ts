import { NextResponse } from 'next/server'
import { z } from 'zod'
import { sql } from 'drizzle-orm'
import { db } from '@/lib/db'

const attempts = new Map<string, { count: number; resetAt: number }>()
const WINDOW_MS = 60_000
const MAX_ATTEMPTS = 5

const registrationSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(160).transform((value) => value.toLowerCase()),
  roll: z.string().trim().regex(/^\d{4}[A-Z]{3}\d{4}$/, 'Use a valid NSUT roll number.').transform((value) => value.toUpperCase()),
  eventId: z.string().trim().min(1).max(80),
})

export async function POST(request: Request) {
  try {
    const origin = request.headers.get('origin')
    const host = request.headers.get('host')
    if (origin && host && new URL(origin).host !== host) {
      return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 })
    }

    const key = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
    const now = Date.now()
    const attempt = attempts.get(key)
    if (attempt && now < attempt.resetAt && attempt.count >= MAX_ATTEMPTS) {
      return NextResponse.json({ error: 'Too many attempts. Please wait a minute.' }, { status: 429 })
    }
    if (!attempt || now >= attempt.resetAt) attempts.set(key, { count: 1, resetAt: now + WINDOW_MS })
    else attempts.set(key, { count: attempt.count + 1, resetAt: attempt.resetAt })

    const body = registrationSchema.parse(await request.json())
    const result = await db.execute(sql`
      INSERT INTO registrations (name, email, roll_number, event_id)
      VALUES (${body.name}, ${body.email}, ${body.roll}, ${body.eventId})
      ON CONFLICT (email, event_id) DO NOTHING
      RETURNING id
    `)

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'This email is already registered for that event.' }, { status: 409 })
    }

    return NextResponse.json({ ok: true }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: error.issues[0]?.message ?? 'Invalid registration.' }, { status: 400 })
    console.error('[v0] registration submission failed', error)
    return NextResponse.json({ error: 'Registration is temporarily unavailable.' }, { status: 500 })
  }
}
