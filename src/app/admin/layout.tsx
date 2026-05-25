'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { LayoutDashboard, Package, Tag, Percent, Users, Bell, LogOut, Menu, X } from 'lucide-react'

const nav = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/categories', label: 'Categories', icon: Tag },
  { href: '/admin/deals', label: 'Deals', icon: Percent },
  { href: '/admin/subscribers', label: 'Subscribers', icon: Users },
  { href: '/admin/push', label: 'Push Notifications', icon: Bell },
]

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  return (
    <>
      {nav.map(item => {
        const active = item.exact ? pathname === item.href : pathname.startsWith(item.href)
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-colors ${
              active ? 'bg-brand-blue text-white' : 'text-muted hover:bg-surface hover:text-body'
            }`}
          >
            <item.icon className="w-5 h-5 shrink-0" />
            {item.label}
          </Link>
        )
      })}
    </>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [drawerOpen, setDrawerOpen] = useState(false)

  async function handleLogout() {
    await fetch('/api/admin/auth', { method: 'DELETE' })
    router.push('/admin/login')
  }

  if (pathname === '/admin/login') return <>{children}</>

  return (
    <div className="min-h-screen bg-surface">

      {/* ── Mobile top bar ── */}
      <header className="md:hidden sticky top-0 z-40 bg-white border-b border-border flex items-center justify-between px-4 h-14 shadow-sm">
        <Link href="/" className="font-extrabold text-brand-blue text-lg">Benlanry</Link>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted">Admin</span>
          <button
            onClick={() => setDrawerOpen(true)}
            className="p-2 rounded-lg hover:bg-surface transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5 text-body" />
          </button>
        </div>
      </header>

      {/* ── Mobile drawer overlay ── */}
      {drawerOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setDrawerOpen(false)}
          />
          {/* Drawer panel */}
          <aside className="relative w-72 max-w-[85vw] bg-white h-full flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div>
                <p className="font-extrabold text-brand-blue text-lg leading-none">Benlanry</p>
                <p className="text-xs text-muted mt-0.5">Admin Panel</p>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-2 rounded-lg hover:bg-surface transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
              <NavLinks onNavigate={() => setDrawerOpen(false)} />
            </nav>
            <div className="px-3 py-4 border-t border-border">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-muted hover:bg-red-50 hover:text-red-600 w-full transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* ── Desktop layout ── */}
      <div className="md:flex">
        {/* Desktop sidebar */}
        <aside className="hidden md:flex w-56 bg-white border-r border-border flex-col shrink-0 sticky top-0 h-screen">
          <div className="px-5 py-5 border-b border-border">
            <Link href="/" className="font-extrabold text-brand-blue text-lg tracking-tight">Benlanry</Link>
            <p className="text-xs text-muted mt-0.5">Admin Panel</p>
          </div>
          <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
            <NavLinks />
          </nav>
          <div className="px-3 py-4 border-t border-border">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted hover:bg-red-50 hover:text-red-600 w-full transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </aside>

        {/* Page content */}
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  )
}
