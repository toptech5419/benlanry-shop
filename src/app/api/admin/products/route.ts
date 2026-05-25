import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { products, categories } from '@/db/schema'
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
      id: products.id,
      name: products.name,
      slug: products.slug,
      price: products.price,
      isBestPick: products.isBestPick,
      isDeal: products.isDeal,
      isActive: products.isActive,
      rating: products.rating,
      createdAt: products.createdAt,
      categoryId: products.categoryId,
      categoryName: categories.name,
    })
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .orderBy(desc(products.createdAt))

  return NextResponse.json(rows)
}

export async function POST(req: NextRequest) {
  if (!await checkAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()

  const [product] = await db.insert(products).values({
    name: body.name,
    slug: body.slug,
    description: body.description || null,
    shortDescription: body.shortDescription || null,
    categoryId: body.categoryId ? Number(body.categoryId) : null,
    amazonUrl: body.amazonUrl,
    affiliateTag: body.affiliateTag || 'benlanry-20',
    imageUrl: body.imageUrl || null,
    price: body.price || null,
    originalPrice: body.originalPrice || null,
    rating: body.rating || null,
    reviewCount: body.reviewCount ? Number(body.reviewCount) : 0,
    pros: body.pros || [],
    cons: body.cons || [],
    isBestPick: body.isBestPick ?? false,
    isDeal: body.isDeal ?? false,
    isActive: body.isActive ?? true,
    quickVerdict: body.quickVerdict || null,
    fullReview: body.fullReview || null,
    whoIsItFor: body.whoIsItFor || null,
    verdict: body.verdict || null,
    metaTitle: body.metaTitle || null,
    metaDescription: body.metaDescription || null,
  }).returning()

  return NextResponse.json(product, { status: 201 })
}
