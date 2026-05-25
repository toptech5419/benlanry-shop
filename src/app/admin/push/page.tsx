'use client'

import { useState } from 'react'
import { Send, Bell, Loader2, CheckCircle } from 'lucide-react'

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
      body: JSON.stringify({
        title: form.title,
        message: form.message,
        url: form.url || 'https://benlanry.shop',
      }),
    })

    setSending(false)
    if (res.ok) {
      setSuccess(true)
      setForm({ title: '', message: '', url: '' })
    } else {
      setError('Failed to send notification. Check OneSignal configuration.')
    }
  }

  return (
    <div className="p-4 sm:p-8 max-w-xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-body">Push Notifications</h1>
        <p className="text-sm text-muted mt-0.5">Send a browser push notification to all subscribed users.</p>
      </div>

      <div className="card p-6 mb-6 flex items-start gap-4">
        <div className="w-10 h-10 bg-brand-blue-light rounded-xl flex items-center justify-center shrink-0">
          <Bell className="w-5 h-5 text-brand-blue" />
        </div>
        <div>
          <p className="font-medium text-body text-sm">Broadcast to all push subscribers</p>
          <p className="text-xs text-muted mt-0.5">
            This will send a notification to every user who has opted in to push notifications via OneSignal.
          </p>
        </div>
      </div>

      <form onSubmit={handleSend} className="card p-6 space-y-4">
        {success && (
          <div className="flex items-center gap-2 text-deal text-sm bg-green-50 px-4 py-3 rounded-xl">
            <CheckCircle className="w-4 h-4" /> Notification sent successfully!
          </div>
        )}
        {error && (
          <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl">{error}</p>
        )}

        <div>
          <label className="block text-xs font-semibold text-muted uppercase tracking-wide mb-1.5">Title *</label>
          <input
            required
            value={form.title}
            onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
            className="w-full border border-border rounded-xl px-3 py-2 text-sm text-body bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
            placeholder="🔥 Flash Sale — 50% off today only!"
            maxLength={65}
          />
          <p className="text-xs text-muted mt-1">{form.title.length}/65 characters</p>
        </div>

        <div>
          <label className="block text-xs font-semibold text-muted uppercase tracking-wide mb-1.5">Message *</label>
          <textarea
            required
            rows={3}
            value={form.message}
            onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
            className="w-full border border-border rounded-xl px-3 py-2 text-sm text-body bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue resize-none"
            placeholder="Echo Dot is $18.99 today — lowest price ever. Tap to see the deal."
            maxLength={130}
          />
          <p className="text-xs text-muted mt-1">{form.message.length}/130 characters</p>
        </div>

        <div>
          <label className="block text-xs font-semibold text-muted uppercase tracking-wide mb-1.5">Tap URL (optional)</label>
          <input
            value={form.url}
            onChange={e => setForm(f => ({ ...f, url: e.target.value }))}
            className="w-full border border-border rounded-xl px-3 py-2 text-sm text-body bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
            placeholder="https://benlanry.shop/deals"
          />
          <p className="text-xs text-muted mt-1">Leave blank to go to the homepage.</p>
        </div>

        <button
          type="submit"
          disabled={sending}
          className="btn-primary flex items-center gap-2 disabled:opacity-50"
        >
          {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          Send Notification
        </button>
      </form>
    </div>
  )
}
