import { Suspense } from 'react'
import HeroSection from '@/components/home/HeroSection'
import CategoryGrid from '@/components/home/CategoryGrid'
import FeaturedPicks from '@/components/home/FeaturedPicks'
import DealsSection from '@/components/home/DealsSection'
import TrendingSection from '@/components/home/TrendingSection'
import NewsletterSignup from '@/components/ui/NewsletterSignup'

function ProductsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 py-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="card overflow-hidden animate-pulse">
          <div className="aspect-square bg-surface" />
          <div className="p-4 space-y-3">
            <div className="h-4 bg-surface rounded w-3/4" />
            <div className="h-3 bg-surface rounded w-1/2" />
            <div className="h-10 bg-surface rounded mt-4" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <CategoryGrid />

      <Suspense fallback={
        <section className="py-12 bg-surface">
          <div className="container-main">
            <div className="h-8 w-56 bg-border rounded animate-pulse mb-6" />
            <ProductsSkeleton />
          </div>
        </section>
      }>
        <FeaturedPicks />
      </Suspense>

      <Suspense fallback={
        <section className="py-12">
          <div className="container-main">
            <div className="h-8 w-48 bg-border rounded animate-pulse mb-6" />
            <div className="flex gap-4 overflow-hidden">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="card flex-shrink-0 w-52 h-72 animate-pulse bg-surface" />
              ))}
            </div>
          </div>
        </section>
      }>
        <DealsSection />
      </Suspense>

      <Suspense fallback={null}>
        <TrendingSection />
      </Suspense>

      <div className="container-main">
        <NewsletterSignup variant="section" />
      </div>
    </>
  )
}
