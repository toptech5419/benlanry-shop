'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ExternalLink, X } from 'lucide-react'

interface StickyBuyBarProps {
  name: string
  price: string | null
  imageUrl: string | null
  amazonUrl: string
  affiliateTag?: string
}

export default function StickyBuyBar({
  name, price, imageUrl, amazonUrl, affiliateTag = 'benlanry-20'
}: StickyBuyBarProps) {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const handler = () => {
      if (!dismissed) setVisible(window.scrollY > 400)
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [dismissed])

  if (!visible || dismissed) return null

  const buyUrl = `${amazonUrl}${amazonUrl.includes('?') ? '&' : '?'}tag=${affiliateTag}`

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border shadow-sticky animate-fade-in">
      <div className="container-main py-3">
        <div className="flex items-center gap-3">
          {imageUrl && (
            <div className="relative w-10 h-10 flex-shrink-0 bg-surface rounded-lg overflow-hidden">
              <Image src={imageUrl} alt={name} fill className="object-contain p-1" sizes="40px" />
            </div>
          )}
          <p className="flex-1 text-sm font-medium text-body line-clamp-1 hidden sm:block">{name}</p>
          {price && (
            <span className="font-bold text-body text-sm flex-shrink-0">${parseFloat(price).toFixed(2)}</span>
          )}
          <a
            href={buyUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="btn-primary text-sm flex-shrink-0 no-underline"
          >
            Check Price on Amazon
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={() => setDismissed(true)}
            className="p-1.5 rounded-lg hover:bg-surface transition-colors flex-shrink-0"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4 text-muted" />
          </button>
        </div>
      </div>
    </div>
  )
}
