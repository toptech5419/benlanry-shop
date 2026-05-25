'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'
import { Suspense } from 'react'

function UnsubscribeContent() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'no-email'>('loading')

  useEffect(() => {
    if (!email) {
      setStatus('no-email')
      return
    }

    fetch(`/api/unsubscribe?email=${encodeURIComponent(email)}`)
      .then(r => r.json())
      .then(d => setStatus(d.success ? 'success' : 'error'))
      .catch(() => setStatus('error'))
  }, [email])

  if (status === 'loading') {
    return (
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-10 h-10 text-brand-blue animate-spin" />
        <p className="text-muted">Unsubscribing...</p>
      </div>
    )
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-deal" />
        </div>
        <h1 className="text-2xl font-bold text-body">You&apos;ve been unsubscribed</h1>
        <p className="text-muted max-w-sm">
          <strong>{email}</strong> has been removed from all Benlanry email lists. You won&apos;t receive any further emails from us.
        </p>
        <p className="text-sm text-muted">Changed your mind?</p>
        <Link href="/" className="btn-primary inline-flex">
          Re-subscribe on the homepage
        </Link>
      </div>
    )
  }

  if (status === 'no-email') {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
          <XCircle className="w-8 h-8 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-body">Invalid unsubscribe link</h1>
        <p className="text-muted max-w-sm">
          This unsubscribe link is missing the email address. Please use the link from your email.
        </p>
        <Link href="/" className="btn-outline inline-flex">
          Go to homepage
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
        <XCircle className="w-8 h-8 text-red-500" />
      </div>
      <h1 className="text-2xl font-bold text-body">Something went wrong</h1>
      <p className="text-muted max-w-sm">
        We couldn&apos;t process your unsubscribe request. Please email us directly at{' '}
        <a href="mailto:hello@benlanry.shop" className="text-brand-blue hover:underline">
          hello@benlanry.shop
        </a>{' '}
        and we&apos;ll remove you immediately.
      </p>
    </div>
  )
}

export default function UnsubscribePage() {
  return (
    <div className="container-main py-20 max-w-lg">
      <div className="flex justify-center">
        <Suspense fallback={
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 text-brand-blue animate-spin" />
            <p className="text-muted">Loading...</p>
          </div>
        }>
          <UnsubscribeContent />
        </Suspense>
      </div>
    </div>
  )
}
