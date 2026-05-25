import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { subscribers } from '@/db/schema'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    await db
      .insert(subscribers)
      .values({ email: email.toLowerCase().trim() })
      .onConflictDoNothing()

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
