'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Zap, Star, Shield } from 'lucide-react'

const categoryPills = [
  { label: '📱 Electronics', slug: 'electronics' },
  { label: '🏠 Home & Kitchen', slug: 'home-kitchen' },
  { label: '👗 Fashion', slug: 'fashion' },
  { label: '💪 Sports', slug: 'sports' },
  { label: '💄 Beauty', slug: 'beauty' },
  { label: '📚 Books', slug: 'books' },
  { label: '🎮 Gaming', slug: 'gaming' },
  { label: '🌿 Garden', slug: 'garden' },
  { label: '🐾 Pets', slug: 'pets' },
  { label: '🧒 Toys', slug: 'toys' },
]

export default function HeroSection() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) router.push(`/search?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <section className="bg-gradient-to-b from-brand-blue-light to-white pt-8 sm:pt-14 pb-8 sm:pb-10">
      <div className="container-main text-center">

        {/* Top pill badge */}
        <div className="inline-flex items-center gap-2 bg-brand-orange-light text-brand-orange text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 rounded-full mb-4">
          <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          Updated daily with the best Amazon picks
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-body mb-3 sm:mb-4 leading-tight">
          Discover. Compare.{' '}
          <span className="text-brand-blue">Buy Smart.</span>
        </h1>

        <p className="text-base sm:text-lg text-muted max-w-xl mx-auto mb-6 sm:mb-8 px-2">
          Expert-curated Amazon products across every category. We test and compare so you always get the best deal.
        </p>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-5 sm:mb-6 px-1">
          <div className="flex items-center bg-white border-2 border-brand-blue rounded-xl shadow-lg overflow-hidden">
            <Search className="flex-shrink-0 ml-3 sm:ml-4 w-4 h-4 sm:w-5 sm:h-5 text-muted" />
            <input
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-1 min-w-0 pl-2 sm:pl-3 pr-1 py-3.5 sm:py-4 text-sm sm:text-base text-body focus:outline-none placeholder:text-muted bg-transparent"
              autoComplete="off"
            />
            <button
              type="submit"
              className="flex-shrink-0 m-1.5 bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 px-3 sm:px-6 py-2.5 min-h-[44px] min-w-[44px]"
              aria-label="Search"
            >
              {/* Icon only on mobile, text on sm+ */}
              <Search className="w-4 h-4 sm:hidden" />
              <span className="hidden sm:inline">Search</span>
            </button>
          </div>
        </form>

        {/* Category pills */}
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-6 sm:mb-10 px-1">
          {categoryPills.map(cat => (
            <a
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white border border-border rounded-full text-xs sm:text-sm font-medium text-body hover:border-brand-blue hover:text-brand-blue transition-all no-underline shadow-sm hover:shadow-md"
            >
              {cat.label}
            </a>
          ))}
        </div>

        {/* Trust signals */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted">
          <div className="flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 fill-amber-400" />
            <span>Expert-curated picks</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-orange" />
            <span>Updated daily</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-deal" />
            <span>Honest reviews — always</span>
          </div>
        </div>

      </div>
    </section>
  )
}
