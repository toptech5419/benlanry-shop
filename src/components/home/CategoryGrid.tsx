import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const categories = [
  { name: 'Electronics', slug: 'electronics', emoji: '📱', description: 'Phones, laptops, TVs & more', count: 0 },
  { name: 'Home & Kitchen', slug: 'home-kitchen', emoji: '🏠', description: 'Appliances, cookware & decor', count: 0 },
  { name: 'Fashion', slug: 'fashion', emoji: '👗', description: 'Clothing, shoes & accessories', count: 0 },
  { name: 'Sports & Outdoors', slug: 'sports', emoji: '💪', description: 'Fitness, camping & gear', count: 0 },
  { name: 'Beauty & Care', slug: 'beauty', emoji: '💄', description: 'Skincare, makeup & wellness', count: 0 },
  { name: 'Books', slug: 'books', emoji: '📚', description: 'Bestsellers & must-reads', count: 0 },
  { name: 'Gaming', slug: 'gaming', emoji: '🎮', description: 'Consoles, games & accessories', count: 0 },
  { name: 'Pets', slug: 'pets', emoji: '🐾', description: 'Food, toys & pet supplies', count: 0 },
  { name: 'Toys & Kids', slug: 'toys', emoji: '🧒', description: 'Toys, games & learning', count: 0 },
]

export default function CategoryGrid() {
  return (
    <section className="py-12">
      <div className="container-main">
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title">Shop by Category</h2>
          <Link href="/categories" className="flex items-center gap-1 text-sm font-medium text-brand-blue hover:underline no-underline">
            All categories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-4">
          {categories.map(cat => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="card group flex items-center gap-4 p-4 no-underline hover:border-brand-blue transition-all"
            >
              <span className="text-3xl flex-shrink-0" role="img" aria-label={cat.name}>
                {cat.emoji}
              </span>
              <div className="min-w-0">
                <p className="font-semibold text-body text-sm group-hover:text-brand-blue transition-colors truncate">
                  {cat.name}
                </p>
                <p className="text-xs text-muted truncate">{cat.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
