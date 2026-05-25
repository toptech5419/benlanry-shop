'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Package, Tag, Users, Percent, Star, ArrowRight } from 'lucide-react'

interface Stats {
  products: number
  categories: number
  subscribers: number
  deals: number
  bestPicks: number
}

function StatCard({ label, value, icon: Icon, href, color }: {
  label: string
  value: number
  icon: React.ElementType
  href: string
  color: string
}) {
  return (
    <Link href={href} className="card p-5 flex items-center gap-4 hover:shadow-card-hover transition-shadow group">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-2xl font-extrabold text-body">{value}</p>
        <p className="text-sm text-muted">{label}</p>
      </div>
      <ArrowRight className="w-4 h-4 text-muted group-hover:text-brand-blue transition-colors shrink-0" />
    </Link>
  )
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/stats')
      .then(r => r.json())
      .then(d => setStats(d))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-body">Dashboard</h1>
        <p className="text-sm text-muted mt-1">Welcome back. Here&apos;s what&apos;s happening on Benlanry.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="card p-5 h-24 animate-pulse bg-surface" />
          ))}
        </div>
      ) : stats ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard label="Active Products" value={Number(stats.products)} icon={Package} href="/admin/products" color="bg-brand-blue" />
          <StatCard label="Best Picks" value={Number(stats.bestPicks)} icon={Star} href="/admin/products" color="bg-amber-500" />
          <StatCard label="Categories" value={Number(stats.categories)} icon={Tag} href="/admin/categories" color="bg-purple-500" />
          <StatCard label="Active Deals" value={Number(stats.deals)} icon={Percent} href="/admin/deals" color="bg-deal" />
          <StatCard label="Email Subscribers" value={Number(stats.subscribers)} icon={Users} href="/admin/subscribers" color="bg-brand-orange" />
        </div>
      ) : null}

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link href="/admin/products/new" className="card p-5 border-2 border-dashed border-border hover:border-brand-blue hover:bg-brand-blue-light transition-colors text-center group">
          <Package className="w-6 h-6 text-muted group-hover:text-brand-blue mx-auto mb-2 transition-colors" />
          <p className="text-sm font-medium text-body">Add New Product</p>
          <p className="text-xs text-muted mt-0.5">Add an Amazon product to the catalogue</p>
        </Link>
        <Link href="/admin/push" className="card p-5 border-2 border-dashed border-border hover:border-brand-orange hover:bg-orange-50 transition-colors text-center group">
          <Package className="w-6 h-6 text-muted group-hover:text-brand-orange mx-auto mb-2 transition-colors" />
          <p className="text-sm font-medium text-body">Send Push Notification</p>
          <p className="text-xs text-muted mt-0.5">Broadcast to all subscribed users</p>
        </Link>
      </div>

      <div className="mt-6 text-center">
        <Link href="/" target="_blank" className="text-sm text-brand-blue hover:underline">
          View live site →
        </Link>
      </div>
    </div>
  )
}
