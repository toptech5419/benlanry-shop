import { NextResponse } from 'next/server'
import { db } from '@/db'
import { subscribers } from '@/db/schema'
import { desc } from 'drizzle-orm'
import { isValidSession, ADMIN_COOKIE } from '@/lib/admin-auth'
import { cookies } from 'next/headers'

export async function GET() {
  const cookieStore = await cookies()
  if (!isValidSession(cookieStore.get(ADMIN_COOKIE)?.value)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const rows = await db
    .select()
    .from(subscribers)
    .orderBy(desc(subscribers.subscribedAt))

  return NextResponse.json(rows)
}
