import Link from 'next/link'
import { Search, Home, Star, Percent } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="container-main py-20 text-center max-w-lg">
      <div className="text-8xl font-extrabold text-brand-blue/10 mb-4 select-none">404</div>
      <h1 className="text-2xl font-extrabold text-body mb-3">Page not found</h1>
      <p className="text-muted mb-8 leading-relaxed">
        That page doesn&apos;t exist. Try searching for what you need, or browse our top picks below.
      </p>

      <form action="/search" className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
        <input
          type="search"
          name="q"
          placeholder="Search products..."
          className="w-full pl-11 pr-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
        />
      </form>

      <div className="flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary flex items-center gap-2">
          <Home className="w-4 h-4" /> Home
        </Link>
        <Link href="/best-picks" className="btn-outline flex items-center gap-2">
          <Star className="w-4 h-4" /> Best Picks
        </Link>
        <Link href="/deals" className="btn-outline flex items-center gap-2">
          <Percent className="w-4 h-4" /> Deals
        </Link>
      </div>
    </div>
  )
}
