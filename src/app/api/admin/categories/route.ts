import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { categories } from '@/db/schema'
import { asc } from 'drizzle-orm'
import { isValidSession, ADMIN_COOKIE } from '@/lib/admin-auth'
import { cookies } from 'next/headers'

async function checkAuth() {
  const cookieStore = await cookies()
  return await isValidSession(cookieStore.get(ADMIN_COOKIE)?.value)
}

export async function GET() {
  if (!await checkAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const rows = await db.select().from(categories).orderBy(asc(categories.sortOrder))
  return NextResponse.json(rows)
}

export async function POST(req: NextRequest) {
  if (!await checkAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const [cat] = await db.insert(categories).values({
    name: body.name,
    slug: body.slug,
    description: body.description || null,
    icon: body.icon || null,
    sortOrder: body.sortOrder ? Number(body.sortOrder) : 0,
  }).returning()
  return NextResponse.json(cat, { status: 201 })
}
