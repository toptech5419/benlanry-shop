'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Pencil, Trash2, CheckCircle, XCircle, Loader2 } from 'lucide-react'

interface Product {
  id: number
  name: string
  slug: string
  price: string | null
  isBestPick: boolean
  isDeal: boolean
  isActive: boolean
  rating: string | null
  createdAt: string
  categoryName: string | null
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<number | null>(null)

  async function load() {
    const res = await fetch('/api/admin/products')
    setProducts(await res.json())
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function handleDelete(id: number, name: string) {
    if (!confirm(`Deactivate "${name}"? It will be hidden from the site.`)) return
    setDeleting(id)
    await fetch(`/api/admin/products/${id}`, { method: 'DELETE' })
    await load()
    setDeleting(null)
  }

  return (
    <div className="p-4 sm:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-body">Products</h1>
          <p className="text-sm text-muted mt-0.5">{products.length} products total</p>
        </div>
        <Link href="/admin/products/new" className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Product
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-brand-blue animate-spin" />
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 text-muted">
          <Package className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p className="font-medium">No products yet.</p>
          <Link href="/admin/products/new" className="text-brand-blue hover:underline text-sm mt-2 inline-block">Add your first product →</Link>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-surface border-b border-border">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-muted">Product</th>
                  <th className="text-left px-4 py-3 font-medium text-muted">Category</th>
                  <th className="text-left px-4 py-3 font-medium text-muted">Price</th>
                  <th className="text-left px-4 py-3 font-medium text-muted">Badges</th>
                  <th className="text-left px-4 py-3 font-medium text-muted">Status</th>
                  <th className="text-right px-4 py-3 font-medium text-muted">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {products.map(p => (
                  <tr key={p.id} className="hover:bg-surface/50 transition-colors">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-body line-clamp-1">{p.name}</p>
                        <p className="text-xs text-muted">{p.slug}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted">{p.categoryName || '—'}</td>
                    <td className="px-4 py-3 font-medium text-body">{p.price ? `$${p.price}` : '—'}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        {p.isBestPick && <span className="badge-best-pick text-xs">Best Pick</span>}
                        {p.isDeal && <span className="badge-deal text-xs">Deal</span>}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {p.isActive
                        ? <span className="flex items-center gap-1 text-deal text-xs font-medium"><CheckCircle className="w-3.5 h-3.5" />Active</span>
                        : <span className="flex items-center gap-1 text-muted text-xs font-medium"><XCircle className="w-3.5 h-3.5" />Inactive</span>
                      }
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/products/${p.id}/edit`}
                          className="p-1.5 rounded-lg hover:bg-brand-blue-light text-muted hover:text-brand-blue transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(p.id, p.name)}
                          disabled={deleting === p.id}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-muted hover:text-red-500 transition-colors disabled:opacity-50"
                        >
                          {deleting === p.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

function Package({ className }: { className?: string }) {
  return <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" /></svg>
}
