import { Star, ExternalLink } from 'lucide-react'
import Image from 'next/image'

interface QuickVerdictProps {
  name: string
  verdict: string
  rating: string | null
  price: string | null
  imageUrl: string | null
  amazonUrl: string
  affiliateTag?: string
  isBestPick: boolean
}

export default function QuickVerdict({
  name, verdict, rating, price, imageUrl, amazonUrl, affiliateTag = 'benlanry-20', isBestPick
}: QuickVerdictProps) {
  const buyUrl = `${amazonUrl}${amazonUrl.includes('?') ? '&' : '?'}tag=${affiliateTag}`

  return (
    <div className="bg-brand-blue-light border border-brand-blue/20 rounded-xl p-5 mb-8">
      <div className="flex flex-col sm:flex-row gap-4">
        {imageUrl && (
          <div className="relative w-20 h-20 flex-shrink-0 bg-white rounded-lg overflow-hidden border border-border">
            <Image src={imageUrl} alt={name} fill className="object-contain p-2" sizes="80px" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            {isBestPick && <span className="badge-best-pick">⭐ Best Pick</span>}
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-blue">Quick Verdict</span>
          </div>
          <p className="text-body text-sm leading-relaxed mb-3">{verdict}</p>
          <div className="flex items-center gap-4 flex-wrap">
            {rating && (
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className={`w-4 h-4 ${i <= Math.round(parseFloat(rating)) ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`} />
                ))}
                <span className="text-sm font-semibold ml-1">{parseFloat(rating).toFixed(1)}</span>
              </div>
            )}
            {price && <span className="font-bold text-body">${parseFloat(price).toFixed(2)}</span>}
            <a
              href={buyUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="btn-primary text-sm py-2 no-underline"
            >
              Check Price on Amazon
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
