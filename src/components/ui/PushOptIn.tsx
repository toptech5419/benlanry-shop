'use client'

import { useEffect, useState } from 'react'
import { Bell, X } from 'lucide-react'

export default function PushOptIn() {
  const [show, setShow] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (dismissed) return
    if (!('Notification' in window)) return
    if (Notification.permission === 'granted' || Notification.permission === 'denied') return

    // Show prompt after 30s or 2 page views
    const views = parseInt(sessionStorage.getItem('pv') ?? '0') + 1
    sessionStorage.setItem('pv', String(views))

    const timer = setTimeout(() => setShow(true), views >= 2 ? 5000 : 30000)
    return () => clearTimeout(timer)
  }, [dismissed])

  async function handleAllow() {
    setShow(false)
    // OneSignal SDK handles the actual permission request
    if (window.OneSignal) {
      window.OneSignal.push(() => {
        window.OneSignal.showNativePrompt()
      })
    } else {
      Notification.requestPermission()
    }
  }

  function handleDismiss() {
    setDismissed(true)
    setShow(false)
    sessionStorage.setItem('push-dismissed', '1')
  }

  if (!show) return null

  return (
    <div className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-6 sm:w-80 z-50 card shadow-card-hover p-4 animate-fade-in border-brand-blue/20">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-brand-blue-light rounded-xl flex items-center justify-center flex-shrink-0">
          <Bell className="w-5 h-5 text-brand-blue" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-body text-sm">Get deal alerts instantly</p>
          <p className="text-xs text-muted mt-0.5 mb-3">
            Be the first to know when prices drop or new deals go live.
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleAllow}
              className="btn-primary text-xs py-2 px-4 flex-1"
            >
              Yes, notify me
            </button>
            <button
              onClick={handleDismiss}
              className="px-3 py-2 text-xs text-muted hover:text-body transition-colors"
            >
              Maybe later
            </button>
          </div>
        </div>
        <button onClick={handleDismiss} className="p-1 rounded-lg hover:bg-surface flex-shrink-0">
          <X className="w-4 h-4 text-muted" />
        </button>
      </div>
    </div>
  )
}

declare global {
  interface Window {
    OneSignal: {
      push: (fn: () => void) => void
      showNativePrompt: () => void
    }
  }
}
