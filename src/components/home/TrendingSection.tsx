import Link from 'next/link'
import { ArrowRight, TrendingUp } from 'lucide-react'
import ProductCard from '@/components/product/ProductCard'
import { db } from '@/db'
import { products } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'

async function getTrendingProducts() {
  try {
    return await db
      .select()
      .from(products)
      .where(eq(products.isActive, true))
      .orderBy(desc(products.reviewCount))
      .limit(4)
  } catch {
    return []
  }
}

export default async function TrendingSection() {
  const trending = await getTrendingProducts()
  if (trending.length === 0) return null

  return (
    <section className="py-12 bg-surface">
      <div className="container-main">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-brand-blue" />
            <h2 className="section-title">Trending Right Now</h2>
          </div>
          <Link href="/categories" className="flex items-center gap-1 text-sm font-medium text-brand-blue hover:underline no-underline">
            Browse all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {trending.map(product => (
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
      </div>
    </section>
  )
}
