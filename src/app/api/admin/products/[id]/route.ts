import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { products } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { isValidSession, ADMIN_COOKIE } from '@/lib/admin-auth'
import { cookies } from 'next/headers'

async function checkAuth() {
  const cookieStore = await cookies()
  return isValidSession(cookieStore.get(ADMIN_COOKIE)?.value)
}

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!await checkAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const [product] = await db.select().from(products).where(eq(products.id, Number(id))).limit(1)
  if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(product)
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!await checkAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const body = await req.json()

  const updateData: Record<string, unknown> = { updatedAt: new Date() }
  const fields = [
    'name','slug','description','shortDescription','categoryId','amazonUrl','affiliateTag',
    'imageUrl','price','originalPrice','rating','reviewCount','pros','cons',
    'isBestPick','isDeal','isActive','quickVerdict','fullReview','whoIsItFor',
    'verdict','metaTitle','metaDescription',
  ]
  for (const field of fields) {
    if (field in body) updateData[field] = body[field]
  }

  const [updated] = await db.update(products).set(updateData).where(eq(products.id, Number(id))).returning()
  return NextResponse.json(updated)
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!await checkAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  await db.update(products).set({ isActive: false }).where(eq(products.id, Number(id)))
  return NextResponse.json({ success: true })
}
