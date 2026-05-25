import { NextResponse } from 'next/server'
import { db } from '@/db'
import { products, categories, subscribers, deals } from '@/db/schema'
import { count, eq } from 'drizzle-orm'
import { isValidSession, ADMIN_COOKIE } from '@/lib/admin-auth'
import { cookies } from 'next/headers'

export async function GET() {
  const cookieStore = await cookies()
  if (!isValidSession(cookieStore.get(ADMIN_COOKIE)?.value)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const [productCount] = await db.select({ count: count() }).from(products).where(eq(products.isActive, true))
  const [categoryCount] = await db.select({ count: count() }).from(categories)
  const [subscriberCount] = await db.select({ count: count() }).from(subscribers).where(eq(subscribers.isEmailActive, true))
  const [dealCount] = await db.select({ count: count() }).from(deals).where(eq(deals.isActive, true))
  const [bestPickCount] = await db.select({ count: count() }).from(products).where(eq(products.isBestPick, true))

  return NextResponse.json({
    products: productCount.count,
    categories: categoryCount.count,
    subscribers: subscriberCount.count,
    deals: dealCount.count,
    bestPicks: bestPickCount.count,
  })
}
