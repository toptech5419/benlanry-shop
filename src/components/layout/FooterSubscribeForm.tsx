'use client'

import { useState } from 'react'
import { CheckCircle, Loader2 } from 'lucide-react'

export default function FooterSubscribeForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    setStatus(res.ok ? 'done' : 'error')
  }

  if (status === 'done') {
    return (
      <div className="flex items-center gap-2 text-deal text-sm bg-green-50 border border-green-100 px-4 py-3 rounded-xl">
        <CheckCircle className="w-4 h-4 shrink-0" />
        You&apos;re subscribed! Check your inbox.
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
      />
      {status === 'error' && <p className="text-xs text-red-500">Something went wrong. Try again.</p>}
      <button type="submit" disabled={status === 'loading'} className="btn-primary text-sm py-2.5 flex items-center justify-center gap-2 disabled:opacity-60">
        {status === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
        Get Weekly Deals
      </button>
    </form>
  )
}
