'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Menu, X, Zap } from 'lucide-react'

const categories = [
  { name: 'Electronics', slug: 'electronics' },
  { name: 'Home & Kitchen', slug: 'home-kitchen' },
  { name: 'Fashion', slug: 'fashion' },
  { name: 'Sports', slug: 'sports' },
  { name: 'Beauty', slug: 'beauty' },
  { name: 'Books', slug: 'books' },
  { name: 'Toys', slug: 'toys' },
  { name: 'Garden', slug: 'garden' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header className={`sticky top-0 z-50 bg-white transition-shadow duration-200 ${isScrolled ? 'shadow-md' : 'border-b border-border'}`}>
      <div className="container-main">
        <div className="flex items-center h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 text-xl font-extrabold text-brand-blue hover:text-brand-blue-dark no-underline">
            Benlanry
          </Link>

          {/* Search bar — desktop */}
          <form action="/search" className="hidden md:flex flex-1 max-w-xl mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="search"
                name="q"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all"
              />
            </div>
          </form>

          {/* Nav links — desktop */}
          <nav className="hidden md:flex items-center gap-1 ml-auto">
            <Link href="/best-picks" className="px-3 py-2 text-sm font-medium text-body hover:text-brand-blue hover:bg-surface rounded-lg transition-colors no-underline">
              Best Picks
            </Link>
            <Link href="/deals" className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-brand-orange hover:bg-brand-orange-light rounded-lg transition-colors no-underline">
              <Zap className="w-3.5 h-3.5" />
              Deals
            </Link>
            <Link href="/categories" className="px-3 py-2 text-sm font-medium text-body hover:text-brand-blue hover:bg-surface rounded-lg transition-colors no-underline">
              Categories
            </Link>
          </nav>

          {/* Mobile: search + hamburger */}
          <div className="flex items-center gap-2 ml-auto md:hidden">
            <Link href="/search" className="p-2 rounded-lg hover:bg-surface transition-colors">
              <Search className="w-5 h-5 text-body" />
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg hover:bg-surface transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-white animate-fade-in">
          <div className="container-main py-3">
            {/* Mobile search */}
            <form action="/search" className="mb-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  type="search"
                  name="q"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
              </div>
            </form>

            <div className="space-y-1 mb-4">
              <Link href="/best-picks" onClick={() => setMobileOpen(false)} className="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-surface no-underline text-body">
                Best Picks
              </Link>
              <Link href="/deals" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-brand-orange-light text-brand-orange no-underline">
                <Zap className="w-4 h-4" /> Deals
              </Link>
            </div>

            <div className="border-t border-border pt-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted px-3 mb-2">Categories</p>
              <div className="grid grid-cols-2 gap-1">
                {categories.map(cat => (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    onClick={() => setMobileOpen(false)}
                    className="px-3 py-2 text-sm rounded-lg hover:bg-surface text-body no-underline"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
