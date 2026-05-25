import { createHmac } from 'crypto'

export const ADMIN_COOKIE = 'benlanry_admin'

export function getSessionToken(): string {
  const secret = process.env.ADMIN_PASSWORD ?? 'changeme'
  return createHmac('sha256', secret).update('benlanry_admin_v1').digest('hex')
}

export function isValidSession(cookie: string | undefined): boolean {
  if (!cookie) return false
  return cookie === getSessionToken()
}
