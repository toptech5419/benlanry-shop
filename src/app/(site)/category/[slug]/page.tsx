import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { db } from '@/db'
import { products, categories } from '@/db/schema'
import { eq, and, desc, asc, gte, lte } from 'drizzle-orm'
import ProductCard from '@/components/product/ProductCard'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { SlidersHorizontal } from 'lucide-react'

const CATEGORY_META: Record<string, { name: string; emoji: string; description: string }> = {
  'electronics': { name: 'Electronics', emoji: '📱', description: 'Best phones, laptops, TVs, headphones and more.' },
  'home-kitchen': { name: 'Home & Kitchen', emoji: '🏠', description: 'Top-rated appliances, cookware, and home essentials.' },
  'fashion': { name: 'Fashion', emoji: '👗', description: 'Clothing, shoes and accessories worth buying.' },
  'sports': { name: 'Sports & Outdoors', emoji: '💪', description: 'Fitness gear, camping equipment, and sports accessories.' },
  'beauty': { name: 'Beauty & Care', emoji: '💄', description: 'Skincare, makeup, and personal care products.' },
  'books': { name: 'Books', emoji: '📚', description: 'Bestsellers, must-reads and hidden gems.' },
  'gaming': { name: 'Gaming', emoji: '🎮', description: 'Consoles, games, peripherals and accessories.' },
  'garden': { name: 'Garden', emoji: '🌿', description: 'Tools, plants, and outdoor living essentials.' },
  'pets': { name: 'Pets', emoji: '🐾', description: 'Food, toys and everything your pet needs.' },
  'toys': { name: 'Toys & Kids', emoji: '🧒', description: 'Educational toys, games and gifts for kids.' },
}

const SORT_OPTIONS = [
  { value: 'best-pick', label: 'Best Pick First' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest' },
]

interface PageProps {
  params: { slug: string }
  searchParams: { sort?: string; min?: string; max?: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const meta = CATEGORY_META[params.slug]
  if (!meta) return {}
  return {
    title: `Best ${meta.name} Picks`,
    description: meta.description,
    openGraph: { title: `Best ${meta.name} — Benlanry`, description: meta.description },
  }
}

async function getCategoryProducts(slug: string, sort: string, min?: string, max?: string) {
  const dbCategory = await db.select().from(categories).where(eq(categories.slug, slug)).limit(1)

  let query = db.select().from(products).where(eq(products.isActive, true)).$dynamic()

  if (dbCategory.length > 0) {
    query = query.where(and(eq(products.isActive, true), eq(products.categoryId, dbCategory[0].id)))
  }

  if (min) query = query.where(gte(products.price, min))
  if (max) query = query.where(lte(products.price, max))

  switch (sort) {
    case 'rating': query = query.orderBy(desc(products.rating)); break
    case 'price-asc': query = query.orderBy(asc(products.price)); break
    case 'price-desc': query = query.orderBy(desc(products.price)); break
    case 'newest': query = query.orderBy(desc(products.createdAt)); break
    default: query = query.orderBy(desc(products.isBestPick), desc(products.rating)); break
  }

  return query.limit(48)
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const meta = CATEGORY_META[params.slug]
  if (!meta) notFound()

  const sort = searchParams.sort ?? 'best-pick'
  const allProducts = await getCategoryProducts(params.slug, sort, searchParams.min, searchParams.max)

  function sortUrl(value: string) {
    const p = new URLSearchParams(searchParams as Record<string, string>)
    p.set('sort', value)
    return `?${p.toString()}`
  }

  return (
    <div className="container-main py-8">
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Categories', href: '/categories' },
        { label: meta.name },
      ]} />

      {/* Category hero */}
      <div className="mt-4 mb-8 flex items-center gap-4">
        <span className="text-5xl">{meta.emoji}</span>
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-body">{meta.name}</h1>
          <p className="text-muted mt-1">{meta.description}</p>
        </div>
      </div>

      {/* Sort & filter bar */}
      <div className="flex items-center gap-3 flex-wrap mb-6 pb-6 border-b border-border">
        <div className="flex items-center gap-2 text-sm font-medium text-muted">
          <SlidersHorizontal className="w-4 h-4" />
          Sort by:
        </div>
        <div className="flex flex-wrap gap-2">
          {SORT_OPTIONS.map(option => (
            <Link
              key={option.value}
              href={sortUrl(option.value)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all no-underline ${
                sort === option.value
                  ? 'bg-brand-blue text-white border-brand-blue'
                  : 'bg-white text-body border-border hover:border-brand-blue hover:text-brand-blue'
              }`}
            >
              {option.label}
            </Link>
          ))}
        </div>
        {allProducts.length > 0 && (
          <span className="ml-auto text-sm text-muted">{allProducts.length} products</span>
        )}
      </div>

      {/* Product grid */}
      {allProducts.length === 0 ? (
        <div className="text-center py-20 text-muted">
          <span className="text-5xl block mb-4">{meta.emoji}</span>
          <p className="text-lg font-semibold">Products coming soon!</p>
          <p className="text-sm mt-1">We&apos;re curating the best {meta.name.toLowerCase()} picks right now.</p>
          <Link href="/" className="btn-primary mt-6 inline-flex no-underline">Back to Home</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {allProducts.map(product => (
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
