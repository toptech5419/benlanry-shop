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
    <section className="bg-gradient-to-b from-brand-blue-light to-white pt-14 pb-10">
      <div className="container-main text-center">
        {/* Headline */}
        <div className="inline-flex items-center gap-2 bg-brand-orange-light text-brand-orange text-sm font-semibold px-4 py-1.5 rounded-full mb-5">
          <Zap className="w-3.5 h-3.5" />
          Updated daily with the best Amazon picks
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-body mb-4 text-balance leading-tight">
          Discover. Compare.{' '}
          <span className="text-brand-blue">Buy Smart.</span>
        </h1>

        <p className="text-lg text-muted max-w-xl mx-auto mb-8">
          Expert-curated Amazon products across every category. We test and compare so you always get the best deal.
        </p>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-6">
          <div className="relative flex items-center bg-white border-2 border-brand-blue rounded-xl shadow-lg overflow-hidden">
            <Search className="absolute left-4 w-5 h-5 text-muted flex-shrink-0" />
            <input
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search products, brands, categories..."
              className="flex-1 pl-12 pr-4 py-4 text-base text-body focus:outline-none placeholder:text-muted"
              autoComplete="off"
            />
            <button
              type="submit"
              className="flex-shrink-0 m-1.5 bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold px-6 py-2.5 rounded-lg transition-colors"
            >
              Search
            </button>
          </div>
        </form>

        {/* Category pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categoryPills.map(cat => (
            <a
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="px-4 py-2 bg-white border border-border rounded-full text-sm font-medium text-body hover:border-brand-blue hover:text-brand-blue transition-all no-underline shadow-sm hover:shadow-md"
            >
              {cat.label}
            </a>
          ))}
        </div>

        {/* Trust signals */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-muted">
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>Expert-curated picks</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-brand-orange" />
            <span>Updated daily</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-deal" />
            <span>Honest reviews — always</span>
          </div>
        </div>
      </div>
    </section>
  )
}
