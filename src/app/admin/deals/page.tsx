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
}

interface Product { id: number; name: string }

export default function AdminDealsPage() {
  const [deals, setDeals] = useState<Deal[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState<number | null>(null)
  const [form, setForm] = useState({ productId: '', dealPrice: '', originalPrice: '', discountPercent: '', dealExpiresAt: '' })

  async function load() {
    const [dr, pr] = await Promise.all([fetch('/api/admin/deals'), fetch('/api/admin/products')])
    setDeals(await dr.json())
    setProducts(await pr.json())
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    await fetch('/api/admin/deals', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    setForm({ productId: '', dealPrice: '', originalPrice: '', discountPercent: '', dealExpiresAt: '' })
    setShowForm(false)
    await load()
    setSaving(false)
  }

  async function handleDelete(id: number) {
    if (!confirm('Deactivate this deal?')) return
    setDeleting(id)
    await fetch('/api/admin/deals', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    await load()
    setDeleting(null)
  }

  const activeCount = deals.filter(d => d.isActive).length

  return (
    <div className="p-6 max-w-5xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Deals</h1>
          <p className="text-sm text-slate-500 mt-0.5">{activeCount} active deal{activeCount !== 1 ? 's' : ''}</p>
        </div>
        <button
          onClick={() => setShowForm(s => !s)}
          className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
            showForm ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? 'Cancel' : 'Add Deal'}
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <form onSubmit={handleAdd} className="bg-white rounded-xl border border-slate-200 p-5 mb-6">
          <h2 className="text-sm font-semibold text-slate-700 mb-4">New Deal</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-500 mb-1.5">Product *</label>
              <select required value={form.productId} onChange={e => setForm(f => ({ ...f, productId: e.target.value }))}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                <option value="">— Select a product —</option>
                {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5">Deal Price ($) *</label>
              <input required type="number" step="0.01" value={form.dealPrice} onChange={e => setForm(f => ({ ...f, dealPrice: e.target.value }))}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="29.99" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5">Original Price ($)</label>
              <input type="number" step="0.01" value={form.originalPrice} onChange={e => setForm(f => ({ ...f, originalPrice: e.target.value }))}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="49.99" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5">Discount %</label>
              <input type="number" value={form.discountPercent} onChange={e => setForm(f => ({ ...f, discountPercent: e.target.value }))}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="40" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5">Expires At</label>
              <input type="datetime-local" value={form.dealExpiresAt} onChange={e => setForm(f => ({ ...f, dealExpiresAt: e.target.value }))}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <button type="submit" disabled={saving} className="flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              Add Deal
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="text-sm text-slate-500 hover:text-slate-700">Cancel</button>
          </div>
        </form>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
          </div>
        ) : deals.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-sm text-slate-400">No deals yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">Product</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">Deal Price</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">Was</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">Savings</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">Expires</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">Status</th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {deals.map(d => {
                  const expired = d.dealExpiresAt && new Date(d.dealExpiresAt) < new Date()
                  return (
                    <tr key={d.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 font-medium text-slate-800">{d.productName ?? `Product #${d.productId}`}</td>
                      <td className="px-4 py-3 font-bold text-emerald-600">${d.dealPrice}</td>
                      <td className="px-4 py-3 text-slate-400 line-through text-xs">{d.originalPrice ? `$${d.originalPrice}` : '—'}</td>
                      <td className="px-4 py-3">
                        {d.discountPercent
                          ? <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">-{d.discountPercent}%</span>
                          : '—'}
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-400">
                        {d.dealExpiresAt ? new Date(d.dealExpiresAt).toLocaleDateString() : 'No expiry'}
                      </td>
                      <td className="px-4 py-3">
                        {!d.isActive || expired
                          ? <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-medium">Inactive</span>
                          : <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">Active</span>
                        }
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button onClick={() => handleDelete(d.id)} disabled={!d.isActive || deleting === d.id}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors disabled:opacity-30">
                          {deleting === d.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
