'use client'

import { useEffect, useState } from 'react'
import { Loader2, Mail, Bell, CheckCircle, XCircle, Users } from 'lucide-react'

interface Subscriber {
  id: number
  email: string
  isEmailActive: boolean
  isPushActive: boolean
  subscribedAt: string
}

function StatPill({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3">
      <p className={`text-2xl font-extrabold ${color}`}>{value}</p>
      <p className="text-sm text-slate-500">{label}</p>
    </div>
  )
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
    <div className="p-6 max-w-5xl mx-auto">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-900">Subscribers</h1>
        <p className="text-sm text-slate-500 mt-0.5">{subscribers.length} total subscribers</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <StatPill label="Total" value={subscribers.length} color="text-slate-900" />
        <StatPill label="Email active" value={emailActive} color="text-blue-600" />
        <StatPill label="Push active" value={pushActive} color="text-violet-600" />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
          </div>
        ) : subscribers.length === 0 ? (
          <div className="text-center py-20">
            <Users className="w-10 h-10 text-slate-200 mx-auto mb-3" />
            <p className="text-sm text-slate-400">No subscribers yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">Email</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">
                    <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> Email</span>
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">
                    <span className="flex items-center gap-1"><Bell className="w-3.5 h-3.5" /> Push</span>
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {subscribers.map(s => (
                  <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-slate-800">{s.email}</td>
                    <td className="px-4 py-3">
                      {s.isEmailActive
                        ? <span className="inline-flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium"><CheckCircle className="w-3 h-3" />Active</span>
                        : <span className="inline-flex items-center gap-1 text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full font-medium"><XCircle className="w-3 h-3" />Unsubscribed</span>
                      }
                    </td>
                    <td className="px-4 py-3">
                      {s.isPushActive
                        ? <span className="inline-flex items-center gap-1 text-xs text-violet-700 bg-violet-50 px-2 py-0.5 rounded-full font-medium"><Bell className="w-3 h-3" />Active</span>
                        : <span className="text-xs text-slate-300">—</span>
                      }
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-400">{new Date(s.subscribedAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
