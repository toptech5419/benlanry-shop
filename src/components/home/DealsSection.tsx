import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Zap, ExternalLink } from 'lucide-react'
import { db } from '@/db'
import { products, deals } from '@/db/schema'
import { eq, and } from 'drizzle-orm'

async function getActiveDeals() {
  try {
    return await db
      .select({
        id: products.id,
        name: products.name,
        slug: products.slug,
        imageUrl: products.imageUrl,
        amazonUrl: products.amazonUrl,
        affiliateTag: products.affiliateTag,
        dealPrice: deals.dealPrice,
        originalPrice: deals.originalPrice,
        discountPercent: deals.discountPercent,
        dealExpiresAt: deals.dealExpiresAt,
      })
      .from(deals)
      .innerJoin(products, eq(deals.productId, products.id))
      .where(and(eq(deals.isActive, true), eq(products.isActive, true)))
      .limit(8)
  } catch {
    return []
  }
}

export default async function DealsSection() {
  const activeDeals = await getActiveDeals()

  return (
    <section className="py-12">
      <div className="container-main">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-brand-orange rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white fill-white" />
            </div>
            <div>
              <h2 className="section-title leading-none">Today&apos;s Best Deals</h2>
              <p className="text-xs text-muted mt-0.5">Updated daily — limited time only</p>
            </div>
          </div>
          <Link href="/deals" className="flex items-center gap-1 text-sm font-medium text-brand-blue hover:underline no-underline">
            View all deals <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {activeDeals.length === 0 ? (
          <div className="text-center py-14 text-muted border border-dashed border-border rounded-xl">
            <Zap className="w-10 h-10 mx-auto mb-3 opacity-20" />
            <p className="font-medium">New deals dropping soon.</p>
            <p className="text-sm mt-1">Subscribe to our newsletter to be the first to know.</p>
          </div>
        ) : (
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4 snap-x snap-mandatory">
            {activeDeals.map(deal => {
              const buyUrl = `${deal.amazonUrl}${deal.amazonUrl.includes('?') ? '&' : '?'}tag=${deal.affiliateTag ?? 'benlanry-20'}`
              return (
                <div key={deal.id} className="card flex-shrink-0 w-52 snap-start p-3 flex flex-col">
                  <Link href={`/product/${deal.slug}`} className="block relative aspect-square bg-surface rounded-lg overflow-hidden mb-3 no-underline">
                    {deal.imageUrl ? (
                      <Image
                        src={deal.imageUrl}
                        alt={deal.name}
                        fill
                        className="object-contain p-3"
                        sizes="208px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted text-xs">No image</div>
                    )}
                    {deal.discountPercent && (
                      <div className="absolute top-1.5 left-1.5 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded">
                        -{deal.discountPercent}%
                      </div>
                    )}
                  </Link>
                  <Link href={`/product/${deal.slug}`} className="text-xs font-semibold text-body line-clamp-2 mb-2 hover:text-brand-blue no-underline">
                    {deal.name}
                  </Link>
                  <div className="flex items-baseline gap-1.5 mb-3 mt-auto">
                    <span className="font-bold text-body">${parseFloat(deal.dealPrice).toFixed(2)}</span>
                    {deal.originalPrice && (
                      <span className="text-xs text-muted line-through">${parseFloat(deal.originalPrice).toFixed(2)}</span>
                    )}
                  </div>
                  <a
                    href={buyUrl}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="btn-primary text-xs py-2 no-underline w-full"
                  >
                    Buy on Amazon <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
