import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { priceAlerts } from '@/db/schema'

export async function POST(req: NextRequest) {
  try {
    const { productId, email, targetPrice } = await req.json()

    if (!productId || !email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
    }

    await db.insert(priceAlerts).values({
      productId: Number(productId),
      email: email.toLowerCase().trim(),
      targetPrice: targetPrice ? String(targetPrice) : null,
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
