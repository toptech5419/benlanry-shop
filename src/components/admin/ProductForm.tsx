'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Plus, X } from 'lucide-react'

interface Category { id: number; name: string }

interface ProductFormData {
  name: string
  slug: string
  shortDescription: string
  description: string
  categoryId: string
  amazonUrl: string
  affiliateTag: string
  imageUrl: string
  price: string
  originalPrice: string
  rating: string
  reviewCount: string
  pros: string[]
  cons: string[]
  isBestPick: boolean
  isDeal: boolean
  isActive: boolean
  quickVerdict: string
  whoIsItFor: string
  verdict: string
  metaTitle: string
  metaDescription: string
}

const empty: ProductFormData = {
  name: '', slug: '', shortDescription: '', description: '',
  categoryId: '', amazonUrl: '', affiliateTag: 'benlanry-20',
  imageUrl: '', price: '', originalPrice: '', rating: '', reviewCount: '',
  pros: [''], cons: [''], isBestPick: false, isDeal: false, isActive: true,
  quickVerdict: '', whoIsItFor: '', verdict: '', metaTitle: '', metaDescription: '',
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="block text-xs font-semibold text-muted uppercase tracking-wide mb-1.5">{children}</label>
}

function Input({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`w-full border border-border rounded-xl px-3 py-2 text-sm text-body bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue ${props.className ?? ''}`} />
}

function Textarea({ ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className="w-full border border-border rounded-xl px-3 py-2 text-sm text-body bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue resize-none" />
}

function ArrayField({ label, items, onChange }: { label: string; items: string[]; onChange: (v: string[]) => void }) {
  function update(i: number, val: string) {
    const next = [...items]; next[i] = val; onChange(next)
  }
  function add() { onChange([...items, '']) }
  function remove(i: number) { onChange(items.filter((_, idx) => idx !== i)) }

  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <Input value={item} onChange={e => update(i, e.target.value)} placeholder={`${label} ${i + 1}`} />
            {items.length > 1 && (
              <button type="button" onClick={() => remove(i)} className="p-2 text-muted hover:text-red-500 transition-colors">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={add} className="text-xs text-brand-blue hover:underline flex items-center gap-1">
          <Plus className="w-3.5 h-3.5" /> Add {label.toLowerCase()}
        </button>
      </div>
    </div>
  )
}

export default function ProductForm({
  initialData,
  productId,
}: {
  initialData?: Partial<ProductFormData> & { pros?: string[] | null; cons?: string[] | null }
  productId?: number
}) {
  const router = useRouter()
  const [form, setForm] = useState<ProductFormData>({
    ...empty,
    ...initialData,
    pros: initialData?.pros?.length ? initialData.pros : [''],
    cons: initialData?.cons?.length ? initialData.cons : [''],
  })
  const [categories, setCategories] = useState<Category[]>([])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/admin/categories').then(r => r.json()).then(setCategories)
  }, [])

  function set<K extends keyof ProductFormData>(key: K, value: ProductFormData[K]) {
    setForm(f => ({ ...f, [key]: value }))
  }

  function handleNameChange(name: string) {
    setForm(f => ({ ...f, name, slug: productId ? f.slug : slugify(name) }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const body = {
      ...form,
      pros: form.pros.filter(Boolean),
      cons: form.cons.filter(Boolean),
      categoryId: form.categoryId || null,
    }

    const url = productId ? `/api/admin/products/${productId}` : '/api/admin/products'
    const method = productId ? 'PATCH' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    setSaving(false)
    if (res.ok) {
      router.push('/admin/products')
      router.refresh()
    } else {
      setError('Failed to save product. Check all required fields.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl">{error}</p>}

      {/* Basic info */}
      <section className="card p-6 space-y-4">
        <h2 className="font-bold text-body">Basic Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <FieldLabel>Product Name *</FieldLabel>
            <Input required value={form.name} onChange={e => handleNameChange(e.target.value)} placeholder="Echo Dot (5th Gen)" />
          </div>
          <div>
            <FieldLabel>URL Slug *</FieldLabel>
            <Input required value={form.slug} onChange={e => set('slug', e.target.value)} placeholder="echo-dot-5th-gen" />
          </div>
        </div>
        <div>
          <FieldLabel>Short Description</FieldLabel>
          <Input value={form.shortDescription} onChange={e => set('shortDescription', e.target.value)} placeholder="One-line summary shown on cards" />
        </div>
        <div>
          <FieldLabel>Category</FieldLabel>
          <select
            value={form.categoryId}
            onChange={e => set('categoryId', e.target.value)}
            className="w-full border border-border rounded-xl px-3 py-2 text-sm text-body bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
          >
            <option value="">— Select category —</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
      </section>

      {/* Amazon */}
      <section className="card p-6 space-y-4">
        <h2 className="font-bold text-body">Amazon Details</h2>
        <div>
          <FieldLabel>Amazon Product URL *</FieldLabel>
          <Input required value={form.amazonUrl} onChange={e => set('amazonUrl', e.target.value)} placeholder="https://www.amazon.com/dp/B09B8V1LZ3" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <FieldLabel>Affiliate Tag</FieldLabel>
            <Input value={form.affiliateTag} onChange={e => set('affiliateTag', e.target.value)} />
          </div>
          <div>
            <FieldLabel>Current Price ($)</FieldLabel>
            <Input type="number" step="0.01" value={form.price} onChange={e => set('price', e.target.value)} placeholder="49.99" />
          </div>
          <div>
            <FieldLabel>Original Price ($)</FieldLabel>
            <Input type="number" step="0.01" value={form.originalPrice} onChange={e => set('originalPrice', e.target.value)} placeholder="69.99" />
          </div>
        </div>
        <div>
          <FieldLabel>Product Image URL</FieldLabel>
          <Input value={form.imageUrl} onChange={e => set('imageUrl', e.target.value)} placeholder="https://m.media-amazon.com/images/..." />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <FieldLabel>Amazon Rating (0–5)</FieldLabel>
            <Input type="number" step="0.1" min="0" max="5" value={form.rating} onChange={e => set('rating', e.target.value)} placeholder="4.6" />
          </div>
          <div>
            <FieldLabel>Review Count</FieldLabel>
            <Input type="number" value={form.reviewCount} onChange={e => set('reviewCount', e.target.value)} placeholder="12450" />
          </div>
        </div>
      </section>

      {/* Editorial */}
      <section className="card p-6 space-y-4">
        <h2 className="font-bold text-body">Editorial Content</h2>
        <div>
          <FieldLabel>Quick Verdict (1–2 sentences)</FieldLabel>
          <Textarea rows={2} value={form.quickVerdict} onChange={e => set('quickVerdict', e.target.value)} placeholder="The best smart speaker under $50 for most people." />
        </div>
        <ArrayField label="Pros" items={form.pros} onChange={v => set('pros', v)} />
        <ArrayField label="Cons" items={form.cons} onChange={v => set('cons', v)} />
        <div>
          <FieldLabel>Who Is It For?</FieldLabel>
          <Textarea rows={2} value={form.whoIsItFor} onChange={e => set('whoIsItFor', e.target.value)} placeholder="Ideal for smart home beginners, renters, and anyone who wants Alexa in every room." />
        </div>
        <div>
          <FieldLabel>Full Review</FieldLabel>
          <Textarea rows={8} value={form.description} onChange={e => set('description', e.target.value)} placeholder="Write the full review here..." />
        </div>
        <div>
          <FieldLabel>Verdict (closing recommendation)</FieldLabel>
          <Textarea rows={2} value={form.verdict} onChange={e => set('verdict', e.target.value)} placeholder="If you want a no-fuss Alexa speaker at an unbeatable price, this is it." />
        </div>
      </section>

      {/* Flags */}
      <section className="card p-6 space-y-4">
        <h2 className="font-bold text-body">Badges & Visibility</h2>
        <div className="flex flex-wrap gap-6">
          {([
            ['isBestPick', 'Best Pick badge'],
            ['isDeal', 'Deal badge'],
            ['isActive', 'Visible on site'],
          ] as const).map(([key, label]) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={form[key]}
                onChange={e => set(key, e.target.checked)}
                className="w-4 h-4 accent-brand-blue"
              />
              <span className="text-sm text-body">{label}</span>
            </label>
          ))}
        </div>
      </section>

      {/* SEO */}
      <section className="card p-6 space-y-4">
        <h2 className="font-bold text-body">SEO (optional)</h2>
        <div>
          <FieldLabel>Meta Title</FieldLabel>
          <Input value={form.metaTitle} onChange={e => set('metaTitle', e.target.value)} placeholder="Leave blank to auto-generate" />
        </div>
        <div>
          <FieldLabel>Meta Description</FieldLabel>
          <Textarea rows={2} value={form.metaDescription} onChange={e => set('metaDescription', e.target.value)} placeholder="Leave blank to auto-generate" />
        </div>
      </section>

      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2 disabled:opacity-50">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
          {productId ? 'Save Changes' : 'Create Product'}
        </button>
        <button type="button" onClick={() => router.back()} className="btn-outline">
          Cancel
        </button>
      </div>
    </form>
  )
}
