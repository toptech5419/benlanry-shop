'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Package, Tag, Users, Percent, Star, Plus, Bell, ArrowUpRight, TrendingUp } from 'lucide-react'

interface Stats {
  products: number
  categories: number
  subscribers: number
  deals: number
  bestPicks: number
}

interface RecentProduct {
  id: number
  name: string
  categoryName: string | null
  price: string | null
  isActive: boolean
  isBestPick: boolean
  isDeal: boolean
  createdAt: string
}

function StatCard({ label, value, icon: Icon, href, color, sub }: {
  label: string; value: number; icon: React.ElementType; href: string; color: string; sub?: string
}) {
  return (
    <Link href={href} className="bg-white rounded-xl border border-slate-200 p-5 flex items-start justify-between hover:shadow-md transition-shadow group">
      <div>
        <p className="text-2xl font-extrabold text-slate-900">{value.toLocaleString()}</p>
        <p className="text-sm text-slate-500 mt-0.5">{label}</p>
        {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
      </div>
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${color}`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
    </Link>
  )
}

function SkeletonCard() {
  return <div className="bg-white rounded-xl border border-slate-200 p-5 h-24 animate-pulse" />
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [recent, setRecent] = useState<RecentProduct[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/stats').then(r => r.json()),
      fetch('/api/admin/products').then(r => r.json()),
    ]).then(([s, p]) => {
      setStats(s)
      setRecent((p as RecentProduct[]).slice(0, 5))
      setLoading(false)
    })
  }, [])

  return (
    <div className="p-6 max-w-6xl mx-auto">

      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-0.5">Welcome back. Here&apos;s what&apos;s happening on Benlanry.</p>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
        ) : stats ? (
          <>
            <StatCard label="Active Products" value={Number(stats.products)} icon={Package} href="/admin/products" color="bg-blue-500" />
            <StatCard label="Best Picks" value={Number(stats.bestPicks)} icon={Star} href="/admin/products" color="bg-amber-500" />
            <StatCard label="Active Deals" value={Number(stats.deals)} icon={Percent} href="/admin/deals" color="bg-emerald-500" />
            <StatCard label="Subscribers" value={Number(stats.subscribers)} icon={Users} href="/admin/subscribers" color="bg-violet-500" />
          </>
        ) : null}
      </div>

      {/* Two-col: quick actions + categories stat */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">

        {/* Quick actions */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-slate-400" />
            Quick Actions
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link href="/admin/products/new" className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                <Plus className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800">Add Product</p>
                <p className="text-xs text-slate-400">Add a new Amazon product</p>
              </div>
            </Link>
            <Link href="/admin/deals" className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-colors group">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                <Percent className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800">Add Deal</p>
                <p className="text-xs text-slate-400">Create a limited-time deal</p>
              </div>
            </Link>
            <Link href="/admin/categories" className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-purple-300 hover:bg-purple-50 transition-colors group">
              <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center shrink-0">
                <Tag className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800">Manage Categories</p>
                <p className="text-xs text-slate-400">{loading ? '…' : `${stats?.categories ?? 0} categories`}</p>
              </div>
            </Link>
            <Link href="/admin/push" className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-orange-300 hover:bg-orange-50 transition-colors group">
              <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center shrink-0">
                <Bell className="w-4 h-4 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800">Push Notification</p>
                <p className="text-xs text-slate-400">Broadcast to all subscribers</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Live site link */}
        <div className="bg-slate-900 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Live Site</p>
            <p className="text-white font-bold text-lg">benlanry.shop</p>
            <p className="text-slate-400 text-xs mt-1">Your storefront is live and indexed.</p>
          </div>
          <Link href="/" target="_blank" className="mt-4 flex items-center gap-2 text-sm font-medium text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors w-fit">
            View site <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Recent products */}
      <div className="bg-white rounded-xl border border-slate-200">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <p className="text-sm font-semibold text-slate-700">Recent Products</p>
          <Link href="/admin/products" className="text-xs text-blue-600 hover:underline font-medium">View all →</Link>
        </div>
        {loading ? (
          <div className="p-5 space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-10 bg-slate-100 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : recent.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <Package className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm text-slate-400">No products yet.</p>
            <Link href="/admin/products/new" className="text-sm text-blue-600 hover:underline mt-1 inline-block">Add your first product →</Link>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {recent.map(p => (
              <div key={p.id} className="flex items-center justify-between px-5 py-3 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                    <Package className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">{p.name}</p>
                    <p className="text-xs text-slate-400">{p.categoryName ?? 'Uncategorised'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-3">
                  {p.isBestPick && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">Best Pick</span>}
                  {p.isDeal && <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">Deal</span>}
                  {p.price && <span className="text-sm font-semibold text-slate-700">${p.price}</span>}
                  <Link href={`/admin/products/${p.id}/edit`} className="text-xs text-blue-600 hover:underline ml-1">Edit</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
