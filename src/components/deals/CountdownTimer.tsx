'use client'

import { useState, useEffect } from 'react'
import { Clock } from 'lucide-react'

interface CountdownTimerProps {
  expiresAt: Date
}

function pad(n: number) {
  return String(n).padStart(2, '0')
}

export default function CountdownTimer({ expiresAt }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft())

  function getTimeLeft() {
    const diff = expiresAt.getTime() - Date.now()
    if (diff <= 0) return null
    const totalSeconds = Math.floor(diff / 1000)
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60
    return { hours, minutes, seconds, urgent: hours < 2 }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const left = getTimeLeft()
      setTimeLeft(left)
      if (!left) clearInterval(timer)
    }, 1000)
    return () => clearInterval(timer)
  }, [expiresAt])

  if (!timeLeft) {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-muted font-medium">
        <Clock className="w-3 h-3" /> Expired
      </span>
    )
  }

  const { hours, minutes, seconds, urgent } = timeLeft

  return (
    <div className={`inline-flex items-center gap-1.5 text-xs font-semibold ${urgent ? 'text-red-500' : 'text-muted'}`}>
      <Clock className={`w-3 h-3 flex-shrink-0 ${urgent ? 'animate-pulse' : ''}`} />
      <span>Ends in</span>
      <div className="flex items-center gap-0.5">
        {hours > 0 && (
          <>
            <span className={`tabular-nums px-1 py-0.5 rounded text-[11px] ${urgent ? 'bg-red-50 text-red-600' : 'bg-surface text-body'}`}>
              {pad(hours)}h
            </span>
            <span className="opacity-50">:</span>
          </>
        )}
        <span className={`tabular-nums px-1 py-0.5 rounded text-[11px] ${urgent ? 'bg-red-50 text-red-600' : 'bg-surface text-body'}`}>
          {pad(minutes)}m
        </span>
        <span className="opacity-50">:</span>
        <span className={`tabular-nums px-1 py-0.5 rounded text-[11px] ${urgent ? 'bg-red-50 text-red-600' : 'bg-surface text-body'}`}>
          {pad(seconds)}s
        </span>
      </div>
    </div>
  )
}
