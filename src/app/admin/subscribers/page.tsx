'use client'

import { useEffect, useState } from 'react'
import { Loader2, Bell, CheckCircle, XCircle } from 'lucide-react'

interface Subscriber {
  id: number
  email: string
  isEmailActive: boolean
  isPushActive: boolean
  subscribedAt: string
}

export default function AdminSubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetch('/api/admin/subscribers')
      .then(r => r.json())
      .then(setSubscribers)
      .finally(() => setLoading(false))
  }, [])

  const emailActive = subscribers.filter(s => s.isEmailActive).length
  const pushActive = subscribers.filter(s => s.isPushActive).length

  return (
    <div className="p-4 sm:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-body">Subscribers</h1>
          <p className="text-sm text-muted mt-0.5">{subscribers.length} total — {emailActive} email, {pushActive} push</p>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        <div className="card p-4 text-center">
          <p className="text-3xl font-extrabold text-body">{subscribers.length}</p>
          <p className="text-xs text-muted mt-1">Total Subscribers</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-3xl font-extrabold text-brand-blue">{emailActive}</p>
          <p className="text-xs text-muted mt-1">Email Active</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-3xl font-extrabold text-brand-orange">{pushActive}</p>
          <p className="text-xs text-muted mt-1">Push Active</p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-brand-blue animate-spin" />
        </div>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-surface border-b border-border">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-muted">Email</th>
                  <th className="text-left px-4 py-3 font-medium text-muted">Email</th>
                  <th className="text-left px-4 py-3 font-medium text-muted">Push</th>
                  <th className="text-left px-4 py-3 font-medium text-muted">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {subscribers.map(s => (
                  <tr key={s.id} className="hover:bg-surface/50">
                    <td className="px-4 py-3 text-body font-medium">{s.email}</td>
                    <td className="px-4 py-3">
                      {s.isEmailActive
                        ? <span className="flex items-center gap-1 text-deal text-xs"><CheckCircle className="w-3.5 h-3.5" />Active</span>
                        : <span className="flex items-center gap-1 text-muted text-xs"><XCircle className="w-3.5 h-3.5" />Unsubscribed</span>
                      }
                    </td>
                    <td className="px-4 py-3">
                      {s.isPushActive
                        ? <span className="flex items-center gap-1 text-deal text-xs"><Bell className="w-3.5 h-3.5" />Active</span>
                        : <span className="text-xs text-muted">—</span>
                      }
                    </td>
                    <td className="px-4 py-3 text-muted text-xs">
                      {new Date(s.subscribedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
                {subscribers.length === 0 && (
                  <tr><td colSpan={4} className="px-4 py-12 text-center text-muted">No subscribers yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
