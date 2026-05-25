'use client'

import { useState } from 'react'
import { Bell, BellRing, CheckCircle } from 'lucide-react'

interface PriceAlertButtonProps {
  productId: number
  productName: string
  currentPrice: string | null
}

export default function PriceAlertButton({ productId, productName, currentPrice }: PriceAlertButtonProps) {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [targetPrice, setTargetPrice] = useState(
    currentPrice ? (parseFloat(currentPrice) * 0.9).toFixed(2) : ''
  )
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/price-alert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, email, targetPrice: parseFloat(targetPrice) }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex items-center gap-2 text-deal text-sm font-medium">
        <CheckCircle className="w-4 h-4" />
        Alert set! We&apos;ll email you when price drops.
      </div>
    )
  }

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-sm text-muted hover:text-brand-blue transition-colors"
      >
        {open ? <BellRing className="w-4 h-4 text-brand-blue" /> : <Bell className="w-4 h-4" />}
        Set price alert
      </button>

      {open && (
        <form onSubmit={handleSubmit} className="mt-3 p-4 bg-surface border border-border rounded-xl animate-fade-in space-y-3">
          <p className="text-sm font-medium text-body">Alert me when <span className="text-brand-blue">{productName}</span> drops to:</p>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">$</span>
            <input
              type="number"
              value={targetPrice}
              onChange={e => setTargetPrice(e.target.value)}
              step="0.01"
              min="0"
              required
              className="w-28 px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
            />
          </div>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
          />
          <div className="flex gap-2">
            <button type="submit" disabled={status === 'loading'} className="btn-primary text-sm py-2">
              {status === 'loading' ? 'Setting...' : 'Set Alert'}
            </button>
            <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 text-sm text-muted hover:text-body transition-colors">
              Cancel
            </button>
          </div>
          {status === 'error' && <p className="text-red-500 text-xs">Something went wrong. Try again.</p>}
        </form>
      )}
    </div>
  )
}
