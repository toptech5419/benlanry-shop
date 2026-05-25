import Link from 'next/link'
import Image from 'next/image'
import { Star, ExternalLink } from 'lucide-react'

interface ProductCardProps {
  id: number
  name: string
  slug: string
  imageUrl: string | null
  price: string | null
  originalPrice: string | null
  rating: string | null
  reviewCount: number
  isBestPick: boolean
  isDeal: boolean
  amazonUrl: string
  affiliateTag?: string
  shortDescription?: string | null
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`}
        />
      ))}
    </div>
  )
}

function savingsPercent(price: string, original: string) {
  const p = parseFloat(price)
  const o = parseFloat(original)
  if (!p || !o || o <= p) return null
  return Math.round(((o - p) / o) * 100)
}

export default function ProductCard({
  name, slug, imageUrl, price, originalPrice, rating,
  reviewCount, isBestPick, isDeal, amazonUrl, affiliateTag = 'benlanry-20', shortDescription
}: ProductCardProps) {
  const savings = price && originalPrice ? savingsPercent(price, originalPrice) : null
  const buyUrl = `${amazonUrl}${amazonUrl.includes('?') ? '&' : '?'}tag=${affiliateTag}`

  return (
    <div className="card group flex flex-col overflow-hidden h-full">
      {/* Image */}
      <Link href={`/product/${slug}`} className="block relative aspect-square bg-surface overflow-hidden no-underline">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted text-sm">No image</div>
        )}

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {isBestPick && <span className="badge-best-pick">⭐ Best Pick</span>}
          {isDeal && <span className="badge-deal">🔥 Deal</span>}
        </div>

        {savings && (
          <div className="absolute top-2 right-2">
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
              -{savings}%
            </span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <Link href={`/product/${slug}`} className="no-underline">
          <h3 className="font-semibold text-body text-sm leading-snug line-clamp-2 hover:text-brand-blue transition-colors mb-1">
            {name}
          </h3>
        </Link>

        {shortDescription && (
          <p className="text-xs text-muted line-clamp-2 mb-2">{shortDescription}</p>
        )}

        {/* Rating */}
        {rating && (
          <div className="flex items-center gap-1.5 mb-3">
            <StarRating rating={parseFloat(rating)} />
            <span className="text-xs text-muted">({reviewCount.toLocaleString()})</span>
          </div>
        )}

        {/* Price */}
        <div className="mt-auto">
          <div className="flex items-baseline gap-2 mb-3">
            {price && (
              <span className="text-lg font-bold text-body">${parseFloat(price).toFixed(2)}</span>
            )}
            {originalPrice && price && parseFloat(originalPrice) > parseFloat(price) && (
              <span className="text-sm text-muted line-through">${parseFloat(originalPrice).toFixed(2)}</span>
            )}
            {savings && <span className="badge-savings">Save {savings}%</span>}
          </div>

          <a
            href={buyUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="btn-primary w-full text-sm no-underline"
          >
            Check Price on Amazon
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  )
}
