import { Metadata } from 'next'
import { db } from '@/db'
import { products } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'
import ProductCard from '@/components/product/ProductCard'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { Star } from 'lucide-react'

export const metadata: Metadata = {
  title: "Editor's Best Picks",
  description: "Our hand-picked, expert-tested top product recommendations across every category.",
}

export default async function BestPicksPage() {
  const picks = await db
    .select()
    .from(products)
    .where(eq(products.isBestPick, true))
    .orderBy(desc(products.createdAt))

  return (
    <div className="container-main py-8">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: "Editor's Best Picks" }]} />

      <div className="mt-6 mb-8 flex items-center gap-4">
        <div className="w-12 h-12 bg-brand-orange-light rounded-2xl flex items-center justify-center flex-shrink-0">
          <Star className="w-6 h-6 text-brand-orange fill-brand-orange" />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-body">Editor&apos;s Best Picks</h1>
          <p className="text-muted mt-1">Hand-picked, expert-tested recommendations. Updated regularly.</p>
        </div>
      </div>

      {picks.length === 0 ? (
        <div className="text-center py-20 text-muted">
          <Star className="w-12 h-12 mx-auto mb-4 opacity-20" />
          <p className="text-lg font-semibold">Best picks coming soon!</p>
          <p className="text-sm mt-1">We&apos;re testing and curating the very best products right now.</p>
        </div>
      ) : (
        <>
          <p className="text-sm text-muted mb-6">{picks.length} expert-tested picks</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {picks.map(product => (
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
        </>
      )}
    </div>
  )
}
