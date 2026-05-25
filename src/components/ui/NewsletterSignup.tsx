'use client'

import { useState } from 'react'
import { Mail, CheckCircle } from 'lucide-react'

interface NewsletterSignupProps {
  variant?: 'inline' | 'section'
}

export default function NewsletterSignup({ variant = 'section' }: NewsletterSignupProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className={`flex items-center gap-3 ${variant === 'section' ? 'justify-center' : ''}`}>
        <CheckCircle className="w-6 h-6 text-deal flex-shrink-0" />
        <p className="font-semibold text-body">You&apos;re in! Check your inbox to confirm.</p>
      </div>
    )
  }

  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="flex-1 px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
        />
        <button type="submit" disabled={status === 'loading'} className="btn-primary text-sm">
          {status === 'loading' ? 'Joining...' : 'Join'}
        </button>
      </form>
    )
  }

  return (
    <section className="bg-brand-blue rounded-2xl px-6 py-10 md:py-12 text-center text-white my-12">
      <Mail className="w-10 h-10 mx-auto mb-4 opacity-80" />
      <h2 className="text-2xl md:text-3xl font-bold mb-2">Never Miss a Deal</h2>
      <p className="text-brand-blue-light mb-6 max-w-md mx-auto">
        Join 10,000+ smart shoppers getting weekly best picks and price drop alerts. No spam, unsubscribe anytime.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="flex-1 px-4 py-3 rounded-lg text-body text-sm focus:outline-none focus:ring-2 focus:ring-white border-0"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-6 py-3 bg-brand-orange hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors flex-shrink-0 min-h-[48px]"
        >
          {status === 'loading' ? 'Joining...' : 'Get Free Deals'}
        </button>
      </form>
      {status === 'error' && (
        <p className="text-red-300 text-sm mt-3">Something went wrong. Please try again.</p>
      )}
      <p className="text-xs text-brand-blue-light mt-3 opacity-70">No spam. Unsubscribe anytime.</p>
    </section>
  )
}
