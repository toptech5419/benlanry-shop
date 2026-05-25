'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Package, Tag, Percent, Users, Bell, LogOut } from 'lucide-react'

const nav = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/categories', label: 'Categories', icon: Tag },
  { href: '/admin/deals', label: 'Deals', icon: Percent },
  { href: '/admin/subscribers', label: 'Subscribers', icon: Users },
  { href: '/admin/push', label: 'Push Notifications', icon: Bell },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/admin/auth', { method: 'DELETE' })
    router.push('/admin/login')
  }

  if (pathname === '/admin/login') return <>{children}</>

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-border flex flex-col shrink-0">
        <div className="px-5 py-5 border-b border-border">
          <Link href="/" className="font-extrabold text-brand-blue text-lg tracking-tight">Benlanry</Link>
          <p className="text-xs text-muted mt-0.5">Admin Panel</p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {nav.map(item => {
            const active = item.exact ? pathname === item.href : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  active
                    ? 'bg-brand-blue text-white'
                    : 'text-muted hover:bg-surface hover:text-body'
                }`}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                {item.label}
              </Link>
            )
          })}
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

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
