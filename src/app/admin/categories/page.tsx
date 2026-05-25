'use client'

import { useEffect, useState } from 'react'
import { Loader2, Plus, X } from 'lucide-react'

interface Category {
  id: number
  name: string
  slug: string
  description: string | null
  icon: string | null
  sortOrder: number
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ name: '', slug: '', description: '', icon: '', sortOrder: '0' })

  async function load() {
    const res = await fetch('/api/admin/categories')
    setCategories(await res.json())
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  function handleNameChange(name: string) {
    setForm(f => ({ ...f, name, slug: slugify(name) }))
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    await fetch('/api/admin/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setForm({ name: '', slug: '', description: '', icon: '', sortOrder: '0' })
    setShowForm(false)
    await load()
    setSaving(false)
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-body">Categories</h1>
          <p className="text-sm text-muted mt-0.5">{categories.length} categories</p>
        </div>
        <button onClick={() => setShowForm(s => !s)} className="btn-primary flex items-center gap-2">
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? 'Cancel' : 'Add Category'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="card p-6 mb-6">
          <h2 className="font-bold text-body mb-4">New Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wide mb-1.5">Name *</label>
              <input required value={form.name} onChange={e => handleNameChange(e.target.value)}
                className="w-full border border-border rounded-xl px-3 py-2 text-sm text-body focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
                placeholder="Smart Home" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wide mb-1.5">Slug *</label>
              <input required value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
                className="w-full border border-border rounded-xl px-3 py-2 text-sm text-body focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
                placeholder="smart-home" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wide mb-1.5">Icon (emoji)</label>
              <input value={form.icon} onChange={e => setForm(f => ({ ...f, icon: e.target.value }))}
                className="w-full border border-border rounded-xl px-3 py-2 text-sm text-body focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
                placeholder="🏠" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wide mb-1.5">Sort Order</label>
              <input type="number" value={form.sortOrder} onChange={e => setForm(f => ({ ...f, sortOrder: e.target.value }))}
                className="w-full border border-border rounded-xl px-3 py-2 text-sm text-body focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue" />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-xs font-semibold text-muted uppercase tracking-wide mb-1.5">Description</label>
            <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              rows={2}
              className="w-full border border-border rounded-xl px-3 py-2 text-sm text-body focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue resize-none"
              placeholder="Short description of this category" />
          </div>
          <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2 disabled:opacity-50">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            Save Category
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
                <th className="text-left px-4 py-3 font-medium text-muted">Icon</th>
                <th className="text-left px-4 py-3 font-medium text-muted">Name</th>
                <th className="text-left px-4 py-3 font-medium text-muted">Slug</th>
                <th className="text-left px-4 py-3 font-medium text-muted">Order</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {categories.map(c => (
                <tr key={c.id} className="hover:bg-surface/50">
                  <td className="px-4 py-3 text-xl">{c.icon || '—'}</td>
                  <td className="px-4 py-3 font-medium text-body">{c.name}</td>
                  <td className="px-4 py-3 text-muted font-mono text-xs">{c.slug}</td>
                  <td className="px-4 py-3 text-muted">{c.sortOrder}</td>
                </tr>
              ))}
              {categories.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-12 text-center text-muted">No categories yet. Add one above.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
