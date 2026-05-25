import { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'All Categories',
  description: 'Browse all product categories on Benlanry — electronics, home, fashion, sports, beauty and more.',
}

const ALL_CATEGORIES = [
  { name: 'Electronics', slug: 'electronics', emoji: '📱', description: 'Phones, laptops, TVs, headphones & more' },
  { name: 'Home & Kitchen', slug: 'home-kitchen', emoji: '🏠', description: 'Appliances, cookware, decor & essentials' },
  { name: 'Fashion', slug: 'fashion', emoji: '👗', description: 'Clothing, shoes & accessories' },
  { name: 'Sports & Outdoors', slug: 'sports', emoji: '💪', description: 'Fitness gear, camping & sports accessories' },
  { name: 'Beauty & Care', slug: 'beauty', emoji: '💄', description: 'Skincare, makeup & personal care' },
  { name: 'Books', slug: 'books', emoji: '📚', description: 'Bestsellers, must-reads & hidden gems' },
  { name: 'Gaming', slug: 'gaming', emoji: '🎮', description: 'Consoles, games & peripherals' },
  { name: 'Garden', slug: 'garden', emoji: '🌿', description: 'Tools, plants & outdoor living' },
  { name: 'Pets', slug: 'pets', emoji: '🐾', description: 'Food, toys & everything for your pet' },
  { name: 'Toys & Kids', slug: 'toys', emoji: '🧒', description: 'Toys, games & gifts for kids' },
]

export default function CategoriesPage() {
  return (
    <div className="container-main py-8">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'All Categories' }]} />

      <h1 className="text-3xl md:text-4xl font-extrabold text-body mt-6 mb-2">All Categories</h1>
      <p className="text-muted mb-8">Find the best products in any category — all expert-curated and updated daily.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {ALL_CATEGORIES.map(cat => (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className="card group flex items-center gap-5 p-5 no-underline hover:border-brand-blue transition-all"
          >
            <span className="text-4xl flex-shrink-0">{cat.emoji}</span>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-body group-hover:text-brand-blue transition-colors">{cat.name}</p>
              <p className="text-sm text-muted mt-0.5 line-clamp-2">{cat.description}</p>
            </div>
            <ArrowRight className="w-4 h-4 text-muted group-hover:text-brand-blue transition-colors flex-shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  )
}
