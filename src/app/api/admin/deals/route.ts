import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { deals, products } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'
import { isValidSession, ADMIN_COOKIE } from '@/lib/admin-auth'
import { cookies } from 'next/headers'

async function checkAuth() {
  const cookieStore = await cookies()
  return await isValidSession(cookieStore.get(ADMIN_COOKIE)?.value)
}

export async function GET() {
  if (!await checkAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const rows = await db
    .select({
      id: deals.id,
      dealPrice: deals.dealPrice,
      originalPrice: deals.originalPrice,
      discountPercent: deals.discountPercent,
      dealExpiresAt: deals.dealExpiresAt,
      isActive: deals.isActive,
      createdAt: deals.createdAt,
      productId: products.id,
      productName: products.name,
      productSlug: products.slug,
    })
    .from(deals)
    .leftJoin(products, eq(deals.productId, products.id))
    .orderBy(desc(deals.createdAt))

  return NextResponse.json(rows)
}

export async function POST(req: NextRequest) {
  if (!await checkAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()

  const [deal] = await db.insert(deals).values({
    productId: Number(body.productId),
    dealPrice: body.dealPrice,
    originalPrice: body.originalPrice || null,
    discountPercent: body.discountPercent ? Number(body.discountPercent) : null,
    dealExpiresAt: body.dealExpiresAt ? new Date(body.dealExpiresAt) : null,
    isActive: true,
  }).returning()

  await db.update(products).set({ isDeal: true }).where(eq(products.id, Number(body.productId)))

  return NextResponse.json(deal, { status: 201 })
}

export async function DELETE(req: NextRequest) {
  if (!await checkAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await req.json()
  await db.update(deals).set({ isActive: false }).where(eq(deals.id, Number(id)))
  return NextResponse.json({ success: true })
}
