import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { priceAlerts, products } from '@/db/schema'
import { eq, and, isNull } from 'drizzle-orm'
import { sendPriceDropEmail } from '@/lib/resend'
import { sql } from 'drizzle-orm'

// Vercel cron job — runs daily at 9am UTC
// Add to vercel.json: { "crons": [{ "path": "/api/cron/price-alerts", "schedule": "0 9 * * *" }] }
export async function GET(req: NextRequest) {
  // Verify this is called by Vercel Cron (or internally)
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Get all active price alerts where current product price <= target price
    const alerts = await db
      .select({
        alertId: priceAlerts.id,
        email: priceAlerts.email,
        targetPrice: priceAlerts.targetPrice,
        productId: products.id,
        productName: products.name,
        productSlug: products.slug,
        currentPrice: products.price,
        originalPrice: products.originalPrice,
        amazonUrl: products.amazonUrl,
        affiliateTag: products.affiliateTag,
      })
      .from(priceAlerts)
      .innerJoin(products, eq(priceAlerts.productId, products.id))
      .where(
        and(
          eq(priceAlerts.isActive, true),
          isNull(priceAlerts.notifiedAt),
          eq(products.isActive, true),
        )
      )

    let notified = 0

    for (const alert of alerts) {
      if (!alert.currentPrice) continue

      const current = parseFloat(alert.currentPrice)
      const target = alert.targetPrice ? parseFloat(alert.targetPrice) : null
      const original = alert.originalPrice ? parseFloat(alert.originalPrice) : current * 1.2

      // Notify if price is at or below target (or dropped 10%+ if no target set)
      const shouldNotify = target
        ? current <= target
        : current <= original * 0.9

      if (shouldNotify) {
        await sendPriceDropEmail(
          alert.email,
          alert.productName,
          alert.productSlug,
          current,
          original,
          alert.amazonUrl,
          alert.affiliateTag ?? 'benlanry-20'
        ).catch(() => {})

        // Mark as notified
        await db
          .update(priceAlerts)
          .set({ notifiedAt: sql`NOW()`, isActive: false })
          .where(eq(priceAlerts.id, alert.alertId))

        notified++
      }
    }

    return NextResponse.json({ success: true, checked: alerts.length, notified })
  } catch {
    return NextResponse.json({ error: 'Cron job failed' }, { status: 500 })
  }
}
