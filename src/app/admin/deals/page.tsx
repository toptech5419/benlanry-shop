'use client'

import { useEffect, useState } from 'react'
import { Loader2, Plus, X, Trash2 } from 'lucide-react'

interface Deal {
  id: number
  dealPrice: string
  originalPrice: string | null
  discountPercent: number | null
  dealExpiresAt: string | null
  isActive: boolean
  productId: number
  productName: string | null
  productSlug: string | null
}

interface Product { id: number; name: string }

export default function AdminDealsPage() {
  const [deals, setDeals] = useState<Deal[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState<number | null>(null)
  const [form, setForm] = useState({
    productId: '', dealPrice: '', originalPrice: '', discountPercent: '', dealExpiresAt: '',
  })

  async function load() {
    const [dealsRes, prodsRes] = await Promise.all([
      fetch('/api/admin/deals'),
      fetch('/api/admin/products'),
    ])
    setDeals(await dealsRes.json())
    setProducts(await prodsRes.json())
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    await fetch('/api/admin/deals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setForm({ productId: '', dealPrice: '', originalPrice: '', discountPercent: '', dealExpiresAt: '' })
    setShowForm(false)
    await load()
    setSaving(false)
  }

  async function handleDelete(id: number) {
    if (!confirm('Deactivate this deal?')) return
    setDeleting(id)
    await fetch('/api/admin/deals', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    await load()
    setDeleting(null)
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-body">Deals</h1>
          <p className="text-sm text-muted mt-0.5">{deals.filter(d => d.isActive).length} active deals</p>
        </div>
        <button onClick={() => setShowForm(s => !s)} className="btn-primary flex items-center gap-2">
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? 'Cancel' : 'Add Deal'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="card p-6 mb-6">
          <h2 className="font-bold text-body mb-4">New Deal</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-muted uppercase tracking-wide mb-1.5">Product *</label>
              <select required value={form.productId} onChange={e => setForm(f => ({ ...f, productId: e.target.value }))}
                className="w-full border border-border rounded-xl px-3 py-2 text-sm text-body bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue">
                <option value="">— Select product —</option>
                {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wide mb-1.5">Deal Price ($) *</label>
              <input required type="number" step="0.01" value={form.dealPrice} onChange={e => setForm(f => ({ ...f, dealPrice: e.target.value }))}
                className="w-full border border-border rounded-xl px-3 py-2 text-sm text-body focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
                placeholder="29.99" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wide mb-1.5">Original Price ($)</label>
              <input type="number" step="0.01" value={form.originalPrice} onChange={e => setForm(f => ({ ...f, originalPrice: e.target.value }))}
                className="w-full border border-border rounded-xl px-3 py-2 text-sm text-body focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
                placeholder="49.99" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wide mb-1.5">Discount %</label>
              <input type="number" value={form.discountPercent} onChange={e => setForm(f => ({ ...f, discountPercent: e.target.value }))}
                className="w-full border border-border rounded-xl px-3 py-2 text-sm text-body focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
                placeholder="40" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wide mb-1.5">Expires At</label>
              <input type="datetime-local" value={form.dealExpiresAt} onChange={e => setForm(f => ({ ...f, dealExpiresAt: e.target.value }))}
                className="w-full border border-border rounded-xl px-3 py-2 text-sm text-body focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue" />
            </div>
          </div>
          <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2 disabled:opacity-50">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            Add Deal
          </button>
        </form>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-brand-blue animate-spin" />
        </div>
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-surface border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-muted">Product</th>
                <th className="text-left px-4 py-3 font-medium text-muted">Deal Price</th>
                <th className="text-left px-4 py-3 font-medium text-muted">Original</th>
                <th className="text-left px-4 py-3 font-medium text-muted">Discount</th>
                <th className="text-left px-4 py-3 font-medium text-muted">Expires</th>
                <th className="text-right px-4 py-3 font-medium text-muted">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {deals.map(d => (
                <tr key={d.id} className={`hover:bg-surface/50 ${!d.isActive ? 'opacity-40' : ''}`}>
                  <td className="px-4 py-3 font-medium text-body">{d.productName ?? `#${d.productId}`}</td>
                  <td className="px-4 py-3 font-bold text-deal">${d.dealPrice}</td>
                  <td className="px-4 py-3 text-muted line-through">{d.originalPrice ? `$${d.originalPrice}` : '—'}</td>
                  <td className="px-4 py-3">{d.discountPercent ? <span className="badge-deal">-{d.discountPercent}%</span> : '—'}</td>
                  <td className="px-4 py-3 text-muted text-xs">{d.dealExpiresAt ? new Date(d.dealExpiresAt).toLocaleDateString() : 'No expiry'}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => handleDelete(d.id)} disabled={!d.isActive || deleting === d.id}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-muted hover:text-red-500 transition-colors disabled:opacity-30">
                      {deleting === d.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                    </button>
                  </td>
                </tr>
              ))}
              {deals.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-12 text-center text-muted">No deals yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
