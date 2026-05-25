import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { db } from '@/db'
import { products, categories } from '@/db/schema'
import { eq, and, ne } from 'drizzle-orm'
import Breadcrumb from '@/components/ui/Breadcrumb'
import QuickVerdict from '@/components/product/QuickVerdict'
import ProsCons from '@/components/product/ProsCons'
import ComparisonTable from '@/components/product/ComparisonTable'
import StickyBuyBar from '@/components/product/StickyBuyBar'
import ProductCard from '@/components/product/ProductCard'
import PriceAlertButton from '@/components/ui/PriceAlertButton'
import { ExternalLink, Star, Clock, Tag } from 'lucide-react'

interface PageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const [product] = await db.select().from(products).where(eq(products.slug, params.slug)).limit(1)
  if (!product) return {}
  return {
    title: product.metaTitle ?? product.name,
    description: product.metaDescription ?? product.shortDescription ?? undefined,
    openGraph: {
      title: product.name,
      description: product.shortDescription ?? undefined,
      images: product.imageUrl ? [product.imageUrl] : [],
    },
  }
}

export default async function ProductPage({ params }: PageProps) {
  const [product] = await db.select().from(products).where(eq(products.slug, params.slug)).limit(1)
  if (!product) notFound()

  const category = product.categoryId
    ? (await db.select().from(categories).where(eq(categories.id, product.categoryId)).limit(1))[0]
    : null

  const related = product.categoryId
    ? await db
        .select()
        .from(products)
        .where(and(eq(products.categoryId, product.categoryId), ne(products.id, product.id), eq(products.isActive, true)))
        .limit(4)
    : []

  const compareProducts = [product, ...related.slice(0, 2)].map(p => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    imageUrl: p.imageUrl,
    price: p.price,
    rating: p.rating,
    amazonUrl: p.amazonUrl,
    affiliateTag: p.affiliateTag,
    isBestPick: p.isBestPick ?? false,
    pros: (p.pros as string[]) ?? [],
    cons: (p.cons as string[]) ?? [],
  }))

  const buyUrl = `${product.amazonUrl}${product.amazonUrl.includes('?') ? '&' : '?'}tag=${product.affiliateTag ?? 'benlanry-20'}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.shortDescription,
    image: product.imageUrl,
    ...(product.price ? {
      offers: {
        '@type': 'Offer',
        price: product.price,
        priceCurrency: product.currency ?? 'USD',
        availability: 'https://schema.org/InStock',
        url: buyUrl,
      }
    } : {}),
    ...(product.rating ? {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: product.rating,
        reviewCount: product.reviewCount ?? 1,
        bestRating: 5,
        worstRating: 1,
      }
    } : {}),
  }

  const pros = (product.pros as string[]) ?? []
  const cons = (product.cons as string[]) ?? []
  const specs = (product.specs as Record<string, string>) ?? {}

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="container-main py-8 pb-24">
        <Breadcrumb items={[
          { label: 'Home', href: '/' },
          ...(category ? [{ label: category.name, href: `/category/${category.slug}` }] : []),
          { label: product.name },
        ]} />

        {/* Best Pick banner */}
        {product.isBestPick && (
          <div className="mt-4 bg-brand-orange-light border border-brand-orange/20 rounded-xl px-4 py-3 flex items-center gap-3">
            <span className="text-2xl">⭐</span>
            <div>
              <p className="font-bold text-brand-orange text-sm">Editor&apos;s Best Pick</p>
              <p className="text-xs text-muted">This is our top recommendation in its category.</p>
            </div>
          </div>
        )}

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: product image + buy box (sticky on desktop) */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-4">
              {/* Image */}
              <div className="relative aspect-square bg-surface rounded-2xl overflow-hidden border border-border">
                {product.imageUrl ? (
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-contain p-6"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted">No image</div>
                )}
              </div>

              {/* Buy box */}
              <div className="card p-5 space-y-4">
                {/* Price */}
                <div>
                  {product.price && (
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="text-3xl font-extrabold text-body">${parseFloat(product.price).toFixed(2)}</span>
                      {product.originalPrice && parseFloat(product.originalPrice) > parseFloat(product.price) && (
                        <>
                          <span className="text-lg text-muted line-through">${parseFloat(product.originalPrice).toFixed(2)}</span>
                          <span className="badge-savings">
                            Save ${(parseFloat(product.originalPrice) - parseFloat(product.price)).toFixed(2)}
                          </span>
                        </>
                      )}
                    </div>
                  )}
                  <p className="text-xs text-muted mt-1">Price may vary — check Amazon for current price.</p>
                </div>

                {/* Rating */}
                {product.rating && (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} className={`w-4 h-4 ${i <= Math.round(parseFloat(product.rating!)) ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`} />
                      ))}
                    </div>
                    <span className="font-semibold text-sm">{parseFloat(product.rating).toFixed(1)}</span>
                    <span className="text-sm text-muted">({(product.reviewCount ?? 0).toLocaleString()} reviews)</span>
                  </div>
                )}

                <a
                  href={buyUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="btn-primary w-full text-base no-underline justify-center"
                >
                  Check Price on Amazon
                  <ExternalLink className="w-4 h-4" />
                </a>

                <PriceAlertButton
                  productId={product.id}
                  productName={product.name}
                  currentPrice={product.price}
                />

                <p className="text-xs text-center text-muted">
                  <Tag className="w-3 h-3 inline mr-1" />
                  Affiliate link — we may earn a commission at no extra cost to you.
                </p>
              </div>

              {/* Key specs */}
              {Object.keys(specs).length > 0 && (
                <div className="card p-4">
                  <h3 className="font-semibold text-sm mb-3 text-body">Key Specs</h3>
                  <dl className="space-y-2">
                    {Object.entries(specs).map(([key, val]) => (
                      <div key={key} className="flex items-start gap-2 text-sm">
                        <dt className="font-medium text-muted flex-shrink-0 w-28 truncate">{key}</dt>
                        <dd className="text-body">{val}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </div>
          </div>

          {/* Right: review content */}
          <div className="lg:col-span-2 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              {product.isBestPick && <span className="badge-best-pick">⭐ Best Pick</span>}
              {product.isDeal && <span className="badge-deal">🔥 Deal</span>}
              {category && (
                <Link href={`/category/${category.slug}`} className="text-xs text-brand-blue font-medium no-underline hover:underline">
                  {category.name}
                </Link>
              )}
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold text-body mb-2 leading-tight">{product.name}</h1>

            <div className="flex items-center gap-1.5 text-xs text-muted mb-6">
              <Clock className="w-3.5 h-3.5" />
              Last updated: {new Date(product.updatedAt ?? product.createdAt ?? Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>

            {/* Quick verdict */}
            {product.quickVerdict && (
              <QuickVerdict
                name={product.name}
                verdict={product.quickVerdict}
                rating={product.rating}
                price={product.price}
                imageUrl={product.imageUrl}
                amazonUrl={product.amazonUrl}
                affiliateTag={product.affiliateTag ?? 'benlanry-20'}
                isBestPick={product.isBestPick ?? false}
              />
            )}

            {/* Pros & Cons */}
            {(pros.length > 0 || cons.length > 0) && (
              <ProsCons pros={pros} cons={cons} />
            )}

            {/* Who is it for */}
            {product.whoIsItFor && (
              <div className="my-6 p-4 bg-surface rounded-xl border border-border">
                <h2 className="font-bold text-body mb-2">Who Is This For?</h2>
                <p className="text-sm text-body leading-relaxed">{product.whoIsItFor}</p>
              </div>
            )}

            {/* Full review */}
            {product.fullReview && (
              <div className="prose-review my-6" dangerouslySetInnerHTML={{ __html: product.fullReview }} />
            )}

            {/* Comparison table */}
            {compareProducts.length > 1 && (
              <ComparisonTable products={compareProducts} currentId={product.id} />
            )}

            {/* Verdict */}
            {product.verdict && (
              <div className="my-8 p-5 bg-brand-blue text-white rounded-2xl">
                <h2 className="font-bold text-lg mb-2">Should You Buy It?</h2>
                <p className="text-brand-blue-light leading-relaxed text-sm">{product.verdict}</p>
                <a
                  href={buyUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center gap-2 mt-4 bg-white text-brand-blue font-semibold px-5 py-2.5 rounded-lg hover:bg-brand-blue-light transition-colors no-underline text-sm"
                >
                  Check Price on Amazon <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}

            {/* Related products */}
            {related.length > 0 && (
              <div className="mt-10">
                <h2 className="text-xl font-bold mb-4 text-body">Alternatives to Consider</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {related.slice(0, 4).map(p => (
                    <ProductCard
                      key={p.id}
                      id={p.id}
                      name={p.name}
                      slug={p.slug}
                      imageUrl={p.imageUrl}
                      price={p.price}
                      originalPrice={p.originalPrice}
                      rating={p.rating}
                      reviewCount={p.reviewCount ?? 0}
                      isBestPick={p.isBestPick ?? false}
                      isDeal={p.isDeal ?? false}
                      amazonUrl={p.amazonUrl}
                      affiliateTag={p.affiliateTag ?? 'benlanry-20'}
                      shortDescription={p.shortDescription}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <StickyBuyBar
        name={product.name}
        price={product.price}
        imageUrl={product.imageUrl}
        amazonUrl={product.amazonUrl}
        affiliateTag={product.affiliateTag ?? 'benlanry-20'}
      />
    </>
  )
}
