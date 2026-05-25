import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { subscribers } from '@/db/schema'
import { sendWelcomeEmail } from '@/lib/resend'
import { eq } from 'drizzle-orm'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    const clean = email.toLowerCase().trim()

    const existing = await db.select().from(subscribers).where(eq(subscribers.email, clean)).limit(1)

    if (existing.length === 0) {
      await db.insert(subscribers).values({ email: clean, isEmailActive: true })
      await sendWelcomeEmail(clean).catch(() => {})
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
