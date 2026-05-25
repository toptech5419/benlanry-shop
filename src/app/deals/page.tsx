import { Metadata } from 'next'
import Link from 'next/link'
import { db } from '@/db'
import { products, deals } from '@/db/schema'
import { eq, and, desc } from 'drizzle-orm'
import Breadcrumb from '@/components/ui/Breadcrumb'
import DealCard from '@/components/deals/DealCard'
import NewsletterSignup from '@/components/ui/NewsletterSignup'
import { Zap, Bell } from 'lucide-react'

export const metadata: Metadata = {
  title: "Today's Best Deals",
  description: "The best Amazon deals today — hand-picked, updated daily. Limited time discounts across electronics, home, fashion and more.",
}

const CATEGORY_FILTERS = [
  { label: 'All Deals', slug: null },
  { label: '📱 Electronics', slug: 'electronics' },
  { label: '🏠 Home & Kitchen', slug: 'home-kitchen' },
  { label: '👗 Fashion', slug: 'fashion' },
  { label: '💪 Sports', slug: 'sports' },
  { label: '💄 Beauty', slug: 'beauty' },
  { label: '📚 Books', slug: 'books' },
  { label: '🎮 Gaming', slug: 'gaming' },
]

interface PageProps {
  searchParams: { category?: string; sort?: string }
}

async function getDeals() {
  return db
    .select({
      id: products.id,
      name: products.name,
      slug: products.slug,
      imageUrl: products.imageUrl,
      amazonUrl: products.amazonUrl,
      affiliateTag: products.affiliateTag,
      rating: products.rating,
      reviewCount: products.reviewCount,
      isBestPick: products.isBestPick,
      categoryId: products.categoryId,
      dealId: deals.id,
      dealPrice: deals.dealPrice,
      originalPrice: deals.originalPrice,
      discountPercent: deals.discountPercent,
      dealExpiresAt: deals.dealExpiresAt,
    })
    .from(deals)
    .innerJoin(products, eq(deals.productId, products.id))
    .where(and(eq(deals.isActive, true), eq(products.isActive, true)))
    .orderBy(desc(deals.discountPercent))
}

export default async function DealsPage({ searchParams }: PageProps) {
  const allDeals = await getDeals()

  const sort = searchParams.sort ?? 'discount'
  const categoryFilter = searchParams.category ?? null

  const filtered = categoryFilter
    ? allDeals.filter(d => d.categoryId !== null)
    : allDeals

  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'price-asc') return parseFloat(a.dealPrice) - parseFloat(b.dealPrice)
    if (sort === 'price-desc') return parseFloat(b.dealPrice) - parseFloat(a.dealPrice)
    return (b.discountPercent ?? 0) - (a.discountPercent ?? 0)
  })

  function filterUrl(category: string | null) {
    const params = new URLSearchParams()
    if (category) params.set('category', category)
    if (sort !== 'discount') params.set('sort', sort)
    const str = params.toString()
    return str ? `/deals?${str}` : '/deals'
  }

  function sortUrl(value: string) {
    const params = new URLSearchParams()
    if (categoryFilter) params.set('category', categoryFilter)
    if (value !== 'discount') params.set('sort', value)
    const str = params.toString()
    return str ? `/deals?${str}` : '/deals'
  }

  return (
    <div className="min-h-screen">
      {/* Hero banner */}
      <div className="bg-gradient-to-r from-red-500 to-brand-orange text-white py-10 sm:py-14">
        <div className="container-main text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4">
            <Zap className="w-3.5 h-3.5" />
            Limited time only
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-3">
            Today&apos;s Best Deals
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-xl mx-auto mb-6">
            Hand-picked Amazon deals, updated daily. Don&apos;t miss out — prices can change any time.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <span className="bg-white/20 px-3 py-1.5 rounded-full font-semibold">
              {allDeals.length} active deal{allDeals.length !== 1 ? 's' : ''}
            </span>
            <Link
              href="#newsletter"
              className="flex items-center gap-2 bg-white text-brand-orange font-semibold px-4 py-1.5 rounded-full hover:bg-orange-50 transition-colors no-underline"
            >
              <Bell className="w-3.5 h-3.5" />
              Get deal alerts
            </Link>
          </div>
        </div>
      </div>

      <div className="container-main py-8">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: "Today's Deals" }]} />

        {/* Category filter tabs */}
        <div className="mt-6 flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1 -mx-4 px-4">
          {CATEGORY_FILTERS.map(f => (
            <Link
              key={f.slug ?? 'all'}
              href={filterUrl(f.slug)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-all no-underline whitespace-nowrap ${
                categoryFilter === f.slug
                  ? 'bg-brand-blue text-white border-brand-blue'
                  : 'bg-white text-body border-border hover:border-brand-blue hover:text-brand-blue'
              }`}
            >
              {f.label}
            </Link>
          ))}
        </div>

        {/* Sort + count bar */}
        <div className="mt-4 mb-6 flex items-center justify-between gap-3 flex-wrap">
          <p className="text-sm text-muted">
            <span className="font-semibold text-body">{sorted.length}</span> deal{sorted.length !== 1 ? 's' : ''} found
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted">Sort:</span>
            {[
              { value: 'discount', label: 'Biggest Discount' },
              { value: 'price-asc', label: 'Price: Low to High' },
              { value: 'price-desc', label: 'Price: High to Low' },
            ].map(s => (
              <Link
                key={s.value}
                href={sortUrl(s.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all no-underline ${
                  sort === s.value
                    ? 'bg-brand-blue text-white border-brand-blue'
                    : 'bg-white text-body border-border hover:border-brand-blue'
                }`}
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Deal grid */}
        {sorted.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-border rounded-2xl text-muted">
            <Zap className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p className="text-lg font-semibold">New deals coming soon!</p>
            <p className="text-sm mt-1 mb-6">Subscribe below to be the first to know when deals drop.</p>
            <Link href="/" className="btn-primary no-underline inline-flex">Browse All Products</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
            {sorted.map(deal => (
              <DealCard
                key={deal.dealId}
                id={deal.id}
                name={deal.name}
                slug={deal.slug}
                imageUrl={deal.imageUrl}
                amazonUrl={deal.amazonUrl}
                affiliateTag={deal.affiliateTag}
                dealPrice={deal.dealPrice}
                originalPrice={deal.originalPrice}
                discountPercent={deal.discountPercent}
                dealExpiresAt={deal.dealExpiresAt}
                rating={deal.rating}
                reviewCount={deal.reviewCount ?? 0}
                isBestPick={deal.isBestPick ?? false}
              />
            ))}
          </div>
        )}

        {/* Newsletter CTA */}
        <div id="newsletter" className="mt-12">
          <NewsletterSignup variant="section" />
        </div>
      </div>
    </div>
  )
}
