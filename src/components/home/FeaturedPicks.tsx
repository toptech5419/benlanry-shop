import Link from 'next/link'
import { ArrowRight, Star } from 'lucide-react'
import ProductCard from '@/components/product/ProductCard'
import { db } from '@/db'
import { products } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'

async function getFeaturedProducts() {
  try {
    return await db
      .select()
      .from(products)
      .where(eq(products.isBestPick, true))
      .orderBy(desc(products.createdAt))
      .limit(6)
  } catch {
    return []
  }
}

export default async function FeaturedPicks() {
  const featured = await getFeaturedProducts()

  return (
    <section className="py-12 bg-surface">
      <div className="container-main">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Star className="w-5 h-5 text-brand-orange fill-brand-orange" />
              <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">Editor&apos;s Choice</span>
            </div>
            <h2 className="section-title">Our Top Picks This Week</h2>
          </div>
          <Link href="/best-picks" className="flex items-center gap-1 text-sm font-medium text-brand-blue hover:underline no-underline">
            See all picks <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {featured.length === 0 ? (
          <div className="text-center py-16 text-muted">
            <Star className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p className="font-medium">Best picks coming soon.</p>
            <p className="text-sm mt-1">Check back shortly — we&apos;re adding products now.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map(product => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                slug={product.slug}
                imageUrl={product.imageUrl}
                price={product.price}
                originalPrice={product.originalPrice}
                rating={product.rating}
                reviewCount={product.reviewCount ?? 0}
                isBestPick={product.isBestPick ?? false}
                isDeal={product.isDeal ?? false}
                amazonUrl={product.amazonUrl}
                affiliateTag={product.affiliateTag ?? 'benlanry-20'}
                shortDescription={product.shortDescription}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
