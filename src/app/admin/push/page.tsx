'use client'

import { useState } from 'react'
import { Send, Loader2, CheckCircle, Smartphone } from 'lucide-react'

export default function AdminPushPage() {
  const [form, setForm] = useState({ title: '', message: '', url: '' })
  const [sending, setSending] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  async function handleSend(e: React.FormEvent) {
    e.preventDefault()
    setSending(true)
    setError('')
    setSuccess(false)
    const res = await fetch('/api/notifications/push', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: form.title, message: form.message, url: form.url || 'https://benlanry.shop' }),
    })
    setSending(false)
    if (res.ok) { setSuccess(true); setForm({ title: '', message: '', url: '' }) }
    else setError('Failed to send. Check your OneSignal configuration.')
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-900">Push Notifications</h1>
        <p className="text-sm text-slate-500 mt-0.5">Broadcast to all subscribed users instantly.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* Form */}
        <form onSubmit={handleSend} className="lg:col-span-3 bg-white rounded-xl border border-slate-200 p-5 space-y-4">
          <h2 className="text-sm font-semibold text-slate-700">Compose Notification</h2>

          {success && (
            <div className="flex items-center gap-2 text-emerald-700 text-sm bg-emerald-50 border border-emerald-200 px-4 py-3 rounded-lg">
              <CheckCircle className="w-4 h-4 shrink-0" /> Notification sent successfully!
            </div>
          )}
          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-3 rounded-lg">{error}</p>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">Title *</label>
            <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} maxLength={65}
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
              placeholder="🔥 Flash Sale — 50% off today only!" />
            <p className="text-xs text-slate-400 mt-1 text-right">{form.title.length}/65</p>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">Message *</label>
            <textarea required rows={3} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} maxLength={130}
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none transition-colors"
              placeholder="Echo Dot is $18.99 today — lowest price ever. Tap to see the deal." />
            <p className="text-xs text-slate-400 mt-1 text-right">{form.message.length}/130</p>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">Tap URL <span className="text-slate-400 font-normal">(optional)</span></label>
            <input value={form.url} onChange={e => setForm(f => ({ ...f, url: e.target.value }))}
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
              placeholder="https://benlanry.shop/deals" />
            <p className="text-xs text-slate-400 mt-1">Defaults to homepage if left blank.</p>
          </div>

          <button type="submit" disabled={sending || !form.title || !form.message}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors">
            {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            {sending ? 'Sending…' : 'Send to All Subscribers'}
          </button>
        </form>

        {/* Tips panel */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Smartphone className="w-4 h-4 text-slate-400" />
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Tips</p>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex gap-2"><span className="text-blue-400 shrink-0">→</span> Keep titles under 50 chars for best display</li>
              <li className="flex gap-2"><span className="text-blue-400 shrink-0">→</span> Include a price or % to drive clicks</li>
              <li className="flex gap-2"><span className="text-blue-400 shrink-0">→</span> Link directly to the deal page, not homepage</li>
              <li className="flex gap-2"><span className="text-blue-400 shrink-0">→</span> Send during 10am–12pm for best open rates</li>
              <li className="flex gap-2"><span className="text-blue-400 shrink-0">→</span> Don&apos;t send more than once a day</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Example</p>
            <div className="bg-slate-100 rounded-lg p-3">
              <p className="text-sm font-semibold text-slate-800">{form.title || '🔥 Deal Alert!'}</p>
              <p className="text-xs text-slate-500 mt-1">{form.message || 'Your notification preview will appear here.'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
