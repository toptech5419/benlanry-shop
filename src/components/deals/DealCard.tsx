import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink, Star } from 'lucide-react'
import CountdownTimer from './CountdownTimer'

interface DealCardProps {
  id: number
  name: string
  slug: string
  imageUrl: string | null
  amazonUrl: string
  affiliateTag: string | null
  dealPrice: string
  originalPrice: string | null
  discountPercent: number | null
  dealExpiresAt: Date | null
  rating: string | null
  reviewCount: number
  isBestPick: boolean
}

export default function DealCard({
  name, slug, imageUrl, amazonUrl, affiliateTag,
  dealPrice, originalPrice, discountPercent, dealExpiresAt,
  rating, reviewCount, isBestPick,
}: DealCardProps) {
  const buyUrl = `${amazonUrl}${amazonUrl.includes('?') ? '&' : '?'}tag=${affiliateTag ?? 'benlanry-20'}`
  const savings = originalPrice
    ? (parseFloat(originalPrice) - parseFloat(dealPrice)).toFixed(2)
    : null

  return (
    <div className="card group flex flex-col overflow-hidden h-full relative">
      {/* Discount ribbon */}
      {discountPercent && (
        <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-extrabold px-2 py-1 rounded-lg shadow-sm">
          -{discountPercent}%
        </div>
      )}
      {isBestPick && (
        <div className="absolute top-3 right-3 z-10">
          <span className="badge-best-pick text-[10px]">⭐ Best Pick</span>
        </div>
      )}

      {/* Image */}
      <Link href={`/product/${slug}`} className="block relative aspect-square bg-surface overflow-hidden no-underline">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted text-sm">No image</div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <Link href={`/product/${slug}`} className="no-underline">
          <h3 className="font-semibold text-body text-sm leading-snug line-clamp-2 hover:text-brand-blue transition-colors">
            {name}
          </h3>
        </Link>

        {/* Rating */}
        {rating && (
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-semibold">{parseFloat(rating).toFixed(1)}</span>
            <span className="text-xs text-muted">({reviewCount.toLocaleString()})</span>
          </div>
        )}

        {/* Countdown */}
        {dealExpiresAt && <CountdownTimer expiresAt={new Date(dealExpiresAt)} />}

        {/* Price block */}
        <div className="mt-auto pt-2 border-t border-border space-y-2">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-xl font-extrabold text-body">
              ${parseFloat(dealPrice).toFixed(2)}
            </span>
            {originalPrice && (
              <span className="text-sm text-muted line-through">
                ${parseFloat(originalPrice).toFixed(2)}
              </span>
            )}
          </div>
          {savings && (
            <p className="text-xs font-semibold text-deal">You save ${savings}</p>
          )}

          <a
            href={buyUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="btn-primary w-full text-sm no-underline"
          >
            Buy on Amazon
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  )
}
