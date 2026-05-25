import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { subscribers } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('email')
  if (!email) {
    return NextResponse.json({ error: 'Email required' }, { status: 400 })
  }

  try {
    await db
      .update(subscribers)
      .set({ isEmailActive: false })
      .where(eq(subscribers.email, email.toLowerCase().trim()))

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
