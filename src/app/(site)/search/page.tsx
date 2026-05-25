import { Metadata } from 'next'
import { db } from '@/db'
import { products } from '@/db/schema'
import { ilike, or, eq, and, desc } from 'drizzle-orm'
import ProductCard from '@/components/product/ProductCard'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { Search, TrendingUp, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface PageProps {
  searchParams: { q?: string }
}

const POPULAR_SEARCHES = [
  'wireless earbuds', 'air fryer', 'laptop', 'coffee maker',
  'running shoes', 'skincare', 'gaming chair', 'smart watch',
]

const BROWSE_CATEGORIES = [
  { label: '📱 Electronics', slug: 'electronics' },
  { label: '🏠 Home & Kitchen', slug: 'home-kitchen' },
  { label: '💪 Sports', slug: 'sports' },
  { label: '💄 Beauty', slug: 'beauty' },
  { label: '🎮 Gaming', slug: 'gaming' },
  { label: '👗 Fashion', slug: 'fashion' },
]

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  return {
    title: searchParams.q ? `"${searchParams.q}" — Search Results` : 'Search Products',
    description: searchParams.q
      ? `Search results for "${searchParams.q}" on Benlanry.`
      : 'Search across all expert-curated Amazon product picks on Benlanry.',
  }
}

export default async function SearchPage({ searchParams }: PageProps) {
  const q = searchParams.q?.trim() ?? ''

  const results = q.length >= 2
    ? await db
        .select()
        .from(products)
        .where(and(
          eq(products.isActive, true),
          or(
            ilike(products.name, `%${q}%`),
            ilike(products.description, `%${q}%`),
            ilike(products.shortDescription, `%${q}%`)
          )
        ))
        .orderBy(desc(products.isBestPick), desc(products.rating))
        .limit(48)
    : []

  const bestPicks = !q
    ? await db.select().from(products).where(and(eq(products.isActive, true), eq(products.isBestPick, true))).orderBy(desc(products.createdAt)).limit(4)
    : []

  return (
    <div className="container-main py-8 pb-16">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Search' }]} />

      {/* Search input */}
      <div className="mt-6 mb-8 max-w-2xl">
        <form action="/search">
          <div className="flex items-center bg-white border-2 border-brand-blue rounded-xl shadow-sm overflow-hidden">
            <Search className="flex-shrink-0 ml-4 w-5 h-5 text-muted" />
            <input
              type="search"
              name="q"
              defaultValue={q}
              placeholder="Search products, brands, categories..."
              className="flex-1 min-w-0 pl-3 pr-2 py-4 text-base text-body focus:outline-none placeholder:text-muted bg-transparent"
              autoFocus
            />
            <button
              type="submit"
              className="flex-shrink-0 m-1.5 bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold px-5 py-2.5 rounded-lg transition-colors min-h-[44px]"
            >
              Search
            </button>
          </div>
        </form>

        {q && (
          <p className="mt-3 text-sm text-muted">
            {results.length > 0
              ? <><span className="font-semibold text-body">{results.length}</span> results for &quot;<span className="font-semibold text-body">{q}</span>&quot;</>
              : <>No results for &quot;<span className="font-semibold text-body">{q}</span>&quot;</>
            }
          </p>
        )}
      </div>

      {/* Empty state — show popular searches + categories */}
      {!q && (
        <div className="space-y-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-brand-blue" />
              <h2 className="font-bold text-body">Popular Searches</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {POPULAR_SEARCHES.map(term => (
                <Link
                  key={term}
                  href={`/search?q=${encodeURIComponent(term)}`}
                  className="px-4 py-2 bg-surface border border-border rounded-full text-sm text-body hover:border-brand-blue hover:text-brand-blue transition-all no-underline"
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-body">Browse by Category</h2>
              <Link href="/categories" className="text-sm text-brand-blue flex items-center gap-1 no-underline hover:underline">
                All categories <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {BROWSE_CATEGORIES.map(cat => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="card px-4 py-3 text-sm font-medium text-body hover:text-brand-blue hover:border-brand-blue transition-all no-underline flex items-center justify-between"
                >
                  {cat.label}
                  <ArrowRight className="w-3.5 h-3.5 text-muted" />
                </Link>
              ))}
            </div>
          </div>

          {bestPicks.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-body">⭐ Editor&apos;s Best Picks</h2>
                <Link href="/best-picks" className="text-sm text-brand-blue flex items-center gap-1 no-underline hover:underline">
                  See all <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {bestPicks.map(product => (
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
          )}
        </div>
      )}

      {/* No results */}
      {q && results.length === 0 && (
        <div className="text-center py-16 text-muted">
          <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
          <p className="font-semibold text-lg text-body">No products found for &quot;{q}&quot;</p>
          <p className="text-sm mt-1 mb-4">Try a different keyword, or browse below.</p>
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {POPULAR_SEARCHES.slice(0, 5).map(term => (
              <Link
                key={term}
                href={`/search?q=${encodeURIComponent(term)}`}
                className="px-3 py-1.5 bg-surface border border-border rounded-full text-sm text-body hover:border-brand-blue no-underline"
              >
                {term}
              </Link>
            ))}
          </div>
          <Link href="/categories" className="btn-primary no-underline inline-flex">Browse All Categories</Link>
        </div>
      )}

      {/* Results grid — best picks sorted first */}
      {results.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {results.map(product => (
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
  )
}
