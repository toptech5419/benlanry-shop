import { Metadata } from 'next'
import { db } from '@/db'
import { products } from '@/db/schema'
import { ilike, or, eq, and } from 'drizzle-orm'
import ProductCard from '@/components/product/ProductCard'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { Search } from 'lucide-react'
import Link from 'next/link'

interface PageProps {
  searchParams: { q?: string }
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  return {
    title: searchParams.q ? `"${searchParams.q}" — Search Results` : 'Search Products',
  }
}

export default async function SearchPage({ searchParams }: PageProps) {
  const q = searchParams.q?.trim() ?? ''

  const results = q.length >= 2
    ? await db
        .select()
        .from(products)
        .where(
          and(
            eq(products.isActive, true),
            or(
              ilike(products.name, `%${q}%`),
              ilike(products.description, `%${q}%`),
              ilike(products.shortDescription, `%${q}%`)
            )
          )
        )
        .limit(48)
    : []

  return (
    <div className="container-main py-8">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Search' }]} />

      <div className="mt-6 mb-8">
        <form action="/search" className="max-w-xl">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
            <input
              type="search"
              name="q"
              defaultValue={q}
              placeholder="Search products..."
              className="w-full pl-11 pr-4 py-3.5 border-2 border-brand-blue rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
              autoFocus
            />
          </div>
        </form>

        {q && (
          <p className="mt-4 text-muted text-sm">
            {results.length > 0
              ? <><span className="font-semibold text-body">{results.length}</span> results for &quot;<span className="font-semibold text-body">{q}</span>&quot;</>
              : <>No results for &quot;<span className="font-semibold text-body">{q}</span>&quot;</>
            }
          </p>
        )}
      </div>

      {!q && (
        <div className="text-center py-16 text-muted">
          <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
          <p className="font-semibold text-lg">What are you looking for?</p>
          <p className="text-sm mt-1">Search across all our curated Amazon picks.</p>
        </div>
      )}

      {q && results.length === 0 && (
        <div className="text-center py-16 text-muted">
          <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
          <p className="font-semibold text-lg">No products found</p>
          <p className="text-sm mt-1 mb-6">Try a different search term or browse our categories.</p>
          <Link href="/categories" className="btn-primary no-underline inline-flex">Browse Categories</Link>
        </div>
      )}

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
