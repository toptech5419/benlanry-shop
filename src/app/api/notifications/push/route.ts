import { NextRequest, NextResponse } from 'next/server'
import { sendPushNotification } from '@/lib/onesignal'

// Admin-only endpoint to send a manual push broadcast
export async function POST(req: NextRequest) {
  try {
    const adminPassword = req.headers.get('x-admin-password')
    if (adminPassword !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { title, message, url, segment } = await req.json()
    if (!title || !message || !url) {
      return NextResponse.json({ error: 'title, message and url are required' }, { status: 400 })
    }

    const result = await sendPushNotification({ title, message, url, segment })
    return NextResponse.json({ success: true, result })
  } catch {
    return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 })
  }
}
