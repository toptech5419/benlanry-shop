'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Plus, X, ChevronDown, ChevronUp, Info, CheckCircle2, ExternalLink } from 'lucide-react'

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

function extractAsin(url: string): string | null {
  const match = url.match(/\/dp\/([A-Z0-9]{10})/i)
  return match ? match[1].toUpperCase() : null
}

function buildCleanUrl(asin: string, tag: string): string {
  return `https://www.amazon.com/dp/${asin}?tag=${tag}`
}

function FieldLabel({ children, hint }: { children: React.ReactNode; hint?: string }) {
  return (
    <div className="flex items-center gap-1.5 mb-1.5">
      <label className="text-xs font-semibold text-muted uppercase tracking-wide">{children}</label>
      {hint && (
        <span className="group relative">
          <Info className="w-3.5 h-3.5 text-muted cursor-help" />
          <span className="absolute left-0 bottom-5 z-10 w-56 bg-body text-white text-xs rounded-lg px-3 py-2 leading-relaxed hidden group-hover:block shadow-lg">
            {hint}
          </span>
        </span>
      )}
    </div>
  )
}

function Input({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`w-full border border-border rounded-xl px-3 py-2 text-sm text-body bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue ${props.className ?? ''}`} />
}

function Textarea({ ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className="w-full border border-border rounded-xl px-3 py-2 text-sm text-body bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue resize-none" />
}

function CharCount({ value, max }: { value: string; max: number }) {
  const len = value.length
  const over = len > max
  return (
    <p className={`text-xs mt-1 text-right ${over ? 'text-red-500' : 'text-muted'}`}>
      {len}/{max}
    </p>
  )
}

function ArrayField({ label, items, onChange, placeholder }: { label: string; items: string[]; onChange: (v: string[]) => void; placeholder?: string }) {
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
            <Input value={item} onChange={e => update(i, e.target.value)} placeholder={placeholder ?? `${label} ${i + 1}`} />
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

function QuickGuide() {
  const [open, setOpen] = useState(false)

  const steps = [
    {
      n: '1',
      title: 'Get the affiliate link from Amazon',
      detail: 'Go to the product page on Amazon. You\'ll see the SiteStripe bar at the top. Click "Text" → copy the link. It looks like: amazon.com/dp/B09B8V1LZ3?tag=benlanry-20',
    },
    {
      n: '2',
      title: 'Paste it in the Amazon URL field below',
      detail: 'The ASIN (product ID) is automatically detected and the clean affiliate URL is built for you.',
    },
    {
      n: '3',
      title: 'Copy the product title from Amazon',
      detail: 'Highlight the full product title on the Amazon page → copy → paste into the Product Name field.',
    },
    {
      n: '4',
      title: 'Get the product image URL',
      detail: 'On the Amazon product page, right-click the main product image → select "Copy image address" → paste into the Image URL field. You\'ll see a preview instantly.',
    },
    {
      n: '5',
      title: 'Fill in price, rating & review count',
      detail: 'The price is on the product page (e.g. $49.99). The star rating is shown below the title (e.g. 4.6). The review count is next to the stars (e.g. 23,456 — enter numbers only).',
    },
    {
      n: '6',
      title: 'Write your review content',
      detail: 'Add a quick verdict, pros & cons, and a full review. This is what makes the page rank on Google — don\'t skip it.',
    },
  ]

  return (
    <div className="bg-brand-blue-light border border-brand-blue/20 rounded-2xl overflow-hidden mb-6">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-brand-blue shrink-0" />
          <span className="text-sm font-semibold text-brand-blue">How to add a product in under 2 minutes</span>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-brand-blue" /> : <ChevronDown className="w-4 h-4 text-brand-blue" />}
      </button>

      {open && (
        <div className="px-5 pb-5 space-y-3 border-t border-brand-blue/20">
          {steps.map(s => (
            <div key={s.n} className="flex gap-3 pt-3">
              <div className="w-6 h-6 bg-brand-blue text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                {s.n}
              </div>
              <div>
                <p className="text-sm font-semibold text-body">{s.title}</p>
                <p className="text-xs text-muted mt-0.5 leading-relaxed">{s.detail}</p>
              </div>
            </div>
          ))}
          <div className="pt-2 border-t border-brand-blue/20 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-deal shrink-0 mt-0.5" />
            <p className="text-xs text-muted leading-relaxed">
              <strong className="text-body">Tip:</strong> Once your Associates account is approved and you have qualifying sales, you can apply for the Product Advertising API which will let you sync prices automatically.
            </p>
          </div>
        </div>
      )}
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
  const [asin, setAsin] = useState<string | null>(() => extractAsin(initialData?.amazonUrl ?? ''))
  const [asinWarning, setAsinWarning] = useState('')
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    fetch('/api/admin/categories').then(r => r.json()).then(setCategories)
  }, [])

  function set<K extends keyof ProductFormData>(key: K, value: ProductFormData[K]) {
    setForm(f => ({ ...f, [key]: value }))
  }

  function handleNameChange(name: string) {
    setForm(f => ({ ...f, name, slug: productId ? f.slug : slugify(name) }))
  }

  function handleAmazonUrlChange(raw: string) {
    setAsinWarning('')
    if (raw.includes('amzn.to') || raw.includes('amzn.eu')) {
      setAsin(null)
      setAsinWarning('Short links (amzn.to) don\'t contain the ASIN. Open the link in your browser first, then copy the full URL from the address bar.')
      setForm(f => ({ ...f, amazonUrl: raw }))
      return
    }
    const detected = extractAsin(raw)
    setAsin(detected)
    if (detected) {
      const clean = buildCleanUrl(detected, form.affiliateTag || 'benlanry-20')
      setForm(f => ({ ...f, amazonUrl: clean }))
    } else {
      setForm(f => ({ ...f, amazonUrl: raw }))
    }
  }

  function handleAffiliateTagChange(tag: string) {
    setForm(f => {
      const newUrl = asin ? buildCleanUrl(asin, tag) : f.amazonUrl
      return { ...f, affiliateTag: tag, amazonUrl: newUrl }
    })
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

      <QuickGuide />

      {/* Basic info */}
      <section className="card p-6 space-y-4">
        <h2 className="font-bold text-body">Basic Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <FieldLabel hint="Copy the product title directly from Amazon and paste it here.">Product Name *</FieldLabel>
            <Input required value={form.name} onChange={e => handleNameChange(e.target.value)} placeholder="Echo Dot (5th Gen)" />
          </div>
          <div>
            <FieldLabel hint="Auto-generated from the product name. You can edit it but keep it short and lowercase with hyphens.">URL Slug *</FieldLabel>
            <Input required value={form.slug} onChange={e => set('slug', e.target.value)} placeholder="echo-dot-5th-gen" />
          </div>
        </div>
        <div>
          <FieldLabel hint="One sentence shown on product cards. E.g. 'The best budget smart speaker for Alexa users.'">Short Description</FieldLabel>
          <Input value={form.shortDescription} onChange={e => set('shortDescription', e.target.value)} placeholder="One-line summary shown on product cards" />
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

        {/* URL field */}
        <div>
          <FieldLabel hint="Paste the link from Amazon SiteStripe. The ASIN is extracted automatically and the affiliate tag is added for you.">
            Amazon Product URL *
          </FieldLabel>
          <Input
            required
            value={form.amazonUrl}
            onChange={e => handleAmazonUrlChange(e.target.value)}
            placeholder="Paste your SiteStripe link here — e.g. https://www.amazon.com/dp/B09B8V1LZ3"
          />
          {asin && (
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-flex items-center gap-1.5 text-xs bg-green-50 text-deal border border-green-200 px-2.5 py-1 rounded-full font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" /> ASIN detected: {asin}
              </span>
              <a
                href={form.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-brand-blue hover:underline flex items-center gap-1"
              >
                Preview on Amazon <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}
          {asinWarning && (
            <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 px-3 py-2 rounded-lg mt-2 leading-relaxed">
              ⚠ {asinWarning}
            </p>
          )}
        </div>

        {/* Affiliate tag + prices */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <FieldLabel hint="Your Amazon Associates tracking tag. Don't change this unless you've registered a new tag.">Affiliate Tag</FieldLabel>
            <Input value={form.affiliateTag} onChange={e => handleAffiliateTagChange(e.target.value)} />
          </div>
          <div>
            <FieldLabel hint="The current price shown on Amazon. Check it just before saving.">Current Price ($)</FieldLabel>
            <Input type="number" step="0.01" value={form.price} onChange={e => set('price', e.target.value)} placeholder="49.99" />
          </div>
          <div>
            <FieldLabel hint="The crossed-out original price if it's on sale. Leave blank if no sale.">Original Price ($)</FieldLabel>
            <Input type="number" step="0.01" value={form.originalPrice} onChange={e => set('originalPrice', e.target.value)} placeholder="69.99" />
          </div>
        </div>

        {/* Image URL + preview */}
        <div>
          <FieldLabel hint="Right-click the main product image on Amazon → 'Copy image address' → paste here.">
            Product Image URL
          </FieldLabel>
          <div className="flex gap-3 items-start">
            <div className="flex-1">
              <Input
                value={form.imageUrl}
                onChange={e => { set('imageUrl', e.target.value); setImageError(false) }}
                placeholder="Right-click Amazon image → Copy image address → paste here"
              />
              <p className="text-xs text-muted mt-1.5 leading-relaxed">
                On Amazon: right-click the main product photo → <strong>Copy image address</strong> → paste above.
              </p>
            </div>
            {form.imageUrl && !imageError && (
              <div className="w-20 h-20 border border-border rounded-xl overflow-hidden bg-surface shrink-0 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={form.imageUrl}
                  alt="Preview"
                  className="w-full h-full object-contain p-1"
                  onError={() => setImageError(true)}
                />
              </div>
            )}
            {form.imageUrl && imageError && (
              <div className="w-20 h-20 border border-red-200 rounded-xl bg-red-50 shrink-0 flex flex-col items-center justify-center text-center p-2">
                <p className="text-xs text-red-500 leading-tight">Image not loading — check the URL</p>
              </div>
            )}
          </div>
        </div>

        {/* Rating + reviews */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <FieldLabel hint="Found below the product title on Amazon. E.g. '4.6 out of 5 stars' → enter 4.6">
              Star Rating (0–5)
            </FieldLabel>
            <Input type="number" step="0.1" min="0" max="5" value={form.rating} onChange={e => set('rating', e.target.value)} placeholder="4.6" />
          </div>
          <div>
            <FieldLabel hint="The number next to the stars on Amazon. E.g. '23,456 ratings' → enter 23456 (numbers only, no commas).">
              Review Count
            </FieldLabel>
            <Input type="number" value={form.reviewCount} onChange={e => set('reviewCount', e.target.value)} placeholder="23456" />
          </div>
        </div>
      </section>

      {/* Editorial */}
      <section className="card p-6 space-y-4">
        <div>
          <h2 className="font-bold text-body">Editorial Content</h2>
          <p className="text-xs text-muted mt-0.5">This is what makes your page rank on Google. Take your time with it.</p>
        </div>
        <div>
          <FieldLabel hint="1–2 sentences. Your main verdict. This appears in a highlighted box at the top of the product page.">
            Quick Verdict
          </FieldLabel>
          <Textarea rows={2} value={form.quickVerdict} onChange={e => set('quickVerdict', e.target.value)} placeholder="The best smart speaker under $50 for most people — easy setup, great Alexa integration, and surprisingly good audio." />
        </div>
        <ArrayField
          label="Pros"
          items={form.pros}
          onChange={v => set('pros', v)}
          placeholder="e.g. Excellent sound quality for the price"
        />
        <ArrayField
          label="Cons"
          items={form.cons}
          onChange={v => set('cons', v)}
          placeholder="e.g. No 3.5mm headphone jack"
        />
        <div>
          <FieldLabel hint="Who should buy this product? Be specific — this helps readers self-identify.">Who Is It For?</FieldLabel>
          <Textarea rows={2} value={form.whoIsItFor} onChange={e => set('whoIsItFor', e.target.value)} placeholder="Ideal for smart home beginners, renters, and anyone who wants Alexa in every room without spending over $50." />
        </div>
        <div>
          <FieldLabel hint="Write a detailed review — performance, build quality, value for money. Aim for at least 200 words. More detail = better Google rankings.">
            Full Review
          </FieldLabel>
          <Textarea rows={8} value={form.description} onChange={e => set('description', e.target.value)} placeholder="Write your full review here. Cover performance, build quality, ease of use, and how it compares to alternatives..." />
          {form.description && (
            <p className="text-xs text-muted mt-1">{form.description.split(/\s+/).filter(Boolean).length} words</p>
          )}
        </div>
        <div>
          <FieldLabel hint="Your closing 1–2 sentence recommendation. Repeat who should buy it and why.">
            Verdict (closing)
          </FieldLabel>
          <Textarea rows={2} value={form.verdict} onChange={e => set('verdict', e.target.value)} placeholder="If you want a no-fuss Alexa speaker at an unbeatable price, this is it. Skip if you need Spotify direct playback." />
        </div>
      </section>

      {/* Badges */}
      <section className="card p-6 space-y-4">
        <h2 className="font-bold text-body">Badges & Visibility</h2>
        <div className="flex flex-wrap gap-6">
          {([
            ['isBestPick', 'Best Pick badge', 'Shows a gold "Best Pick" badge on this product'],
            ['isDeal', 'Deal badge', 'Shows a red "Deal" badge and lists it on the /deals page'],
            ['isActive', 'Visible on site', 'Uncheck to hide this product without deleting it'],
          ] as const).map(([key, label, hint]) => (
            <label key={key} className="flex items-start gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={form[key]}
                onChange={e => set(key, e.target.checked)}
                className="w-4 h-4 accent-brand-blue mt-0.5"
              />
              <div>
                <span className="text-sm text-body font-medium">{label}</span>
                <p className="text-xs text-muted">{hint}</p>
              </div>
            </label>
          ))}
        </div>
      </section>

      {/* SEO */}
      <section className="card p-6 space-y-4">
        <div>
          <h2 className="font-bold text-body">SEO</h2>
          <p className="text-xs text-muted mt-0.5">Leave blank to auto-generate from the product name and description.</p>
        </div>
        <div>
          <FieldLabel hint="What appears as the blue link in Google results. Ideal length: 50–60 characters.">
            Meta Title
          </FieldLabel>
          <Input value={form.metaTitle} onChange={e => set('metaTitle', e.target.value)} placeholder="Leave blank to auto-generate" maxLength={70} />
          <CharCount value={form.metaTitle} max={60} />
        </div>
        <div>
          <FieldLabel hint="The description snippet shown under the title in Google. Ideal length: 150–160 characters.">
            Meta Description
          </FieldLabel>
          <Textarea rows={2} value={form.metaDescription} onChange={e => set('metaDescription', e.target.value)} placeholder="Leave blank to auto-generate" maxLength={200} />
          <CharCount value={form.metaDescription} max={160} />
        </div>
      </section>

      <div className="flex gap-3 pb-8">
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
