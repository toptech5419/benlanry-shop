import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink, Check, X } from 'lucide-react'

interface CompareProduct {
  id: number
  name: string
  slug: string
  imageUrl: string | null
  price: string | null
  rating: string | null
  amazonUrl: string
  affiliateTag: string | null
  isBestPick: boolean
  pros: string[]
  cons: string[]
}

export default function ComparisonTable({ products, currentId }: { products: CompareProduct[], currentId: number }) {
  if (products.length < 2) return null

  return (
    <div className="my-8">
      <h2 className="text-xl font-bold mb-4 text-body">How It Compares</h2>
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="bg-surface border-b border-border">
              <th className="text-left px-4 py-3 font-semibold text-muted w-28">Product</th>
              {products.map(p => (
                <th key={p.id} className={`px-4 py-3 text-center ${p.id === currentId ? 'bg-brand-blue-light' : ''}`}>
                  <div className="flex flex-col items-center gap-1.5">
                    {p.imageUrl && (
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white border border-border">
                        <Image src={p.imageUrl} alt={p.name} fill className="object-contain p-1" sizes="48px" />
                      </div>
                    )}
                    <Link href={`/product/${p.slug}`} className="font-semibold text-body text-xs leading-tight line-clamp-2 hover:text-brand-blue no-underline max-w-[120px]">
                      {p.name}
                    </Link>
                    {p.isBestPick && <span className="badge-best-pick text-[10px]">Best Pick</span>}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 font-medium text-muted">Price</td>
              {products.map(p => (
                <td key={p.id} className={`px-4 py-3 text-center font-bold ${p.id === currentId ? 'bg-brand-blue-light/50' : ''}`}>
                  {p.price ? `$${parseFloat(p.price).toFixed(2)}` : '—'}
                </td>
              ))}
            </tr>
            <tr className="border-b border-border bg-surface/50">
              <td className="px-4 py-3 font-medium text-muted">Rating</td>
              {products.map(p => (
                <td key={p.id} className={`px-4 py-3 text-center ${p.id === currentId ? 'bg-brand-blue-light/50' : ''}`}>
                  {p.rating ? (
                    <span className="inline-flex items-center gap-1 font-semibold">
                      ⭐ {parseFloat(p.rating).toFixed(1)}
                    </span>
                  ) : '—'}
                </td>
              ))}
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 font-medium text-muted">Top Pro</td>
              {products.map(p => (
                <td key={p.id} className={`px-4 py-3 text-center text-xs ${p.id === currentId ? 'bg-brand-blue-light/50' : ''}`}>
                  {p.pros[0] ? (
                    <span className="flex items-start gap-1 justify-center text-deal">
                      <Check className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />{p.pros[0]}
                    </span>
                  ) : '—'}
                </td>
              ))}
            </tr>
            <tr className="border-b border-border bg-surface/50">
              <td className="px-4 py-3 font-medium text-muted">Top Con</td>
              {products.map(p => (
                <td key={p.id} className={`px-4 py-3 text-center text-xs ${p.id === currentId ? 'bg-brand-blue-light/50' : ''}`}>
                  {p.cons[0] ? (
                    <span className="flex items-start gap-1 justify-center text-red-500">
                      <X className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />{p.cons[0]}
                    </span>
                  ) : '—'}
                </td>
              ))}
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-muted">Buy</td>
              {products.map(p => {
                const buyUrl = `${p.amazonUrl}${p.amazonUrl.includes('?') ? '&' : '?'}tag=${p.affiliateTag ?? 'benlanry-20'}`
                return (
                  <td key={p.id} className={`px-4 py-3 text-center ${p.id === currentId ? 'bg-brand-blue-light/50' : ''}`}>
                    <a
                      href={buyUrl}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg no-underline transition-colors ${p.id === currentId ? 'bg-brand-blue text-white hover:bg-brand-blue-dark' : 'border border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white'}`}
                    >
                      Amazon <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                )
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
