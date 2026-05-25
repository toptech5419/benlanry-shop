import Link from 'next/link'

const categories = [
  { name: 'Electronics', slug: 'electronics' },
  { name: 'Home & Kitchen', slug: 'home-kitchen' },
  { name: 'Fashion', slug: 'fashion' },
  { name: 'Sports & Outdoors', slug: 'sports' },
  { name: 'Beauty & Personal Care', slug: 'beauty' },
  { name: 'Books', slug: 'books' },
]

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border mt-16">
      <div className="container-main py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="text-xl font-extrabold text-brand-blue no-underline">
              Benlanry
            </Link>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              Expert-curated Amazon picks. We test, compare, and recommend — so you buy smart every time.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-body mb-3">Categories</h3>
            <ul className="space-y-2">
              {categories.map(cat => (
                <li key={cat.slug}>
                  <Link href={`/category/${cat.slug}`} className="text-sm text-muted hover:text-brand-blue no-underline transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-body mb-3">Resources</h3>
            <ul className="space-y-2">
              {[
                { label: 'Best Picks', href: '/best-picks' },
                { label: "Today's Deals", href: '/deals' },
                { label: 'Compare Products', href: '/categories' },
                { label: 'Our Methodology', href: '/methodology' },
                { label: 'About Benlanry', href: '/about' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted hover:text-brand-blue no-underline transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-body mb-3">Get Deal Alerts</h3>
            <p className="text-sm text-muted mb-3">Join 10,000+ smart shoppers. No spam, ever.</p>
            <form className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
              <button type="submit" className="btn-primary text-sm py-2.5">
                Get Weekly Deals
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted">
          <p>© {new Date().getFullYear()} Benlanry. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/affiliate-disclosure" className="hover:text-brand-blue no-underline transition-colors">Affiliate Disclosure</Link>
            <Link href="/privacy-policy" className="hover:text-brand-blue no-underline transition-colors">Privacy Policy</Link>
            <Link href="/methodology" className="hover:text-brand-blue no-underline transition-colors">Our Methodology</Link>
          </div>
          <p className="text-center md:text-right">
            As an Amazon Associate, Benlanry earns from qualifying purchases.
          </p>
        </div>
      </div>
    </footer>
  )
}
