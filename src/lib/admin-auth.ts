export const ADMIN_COOKIE = 'benlanry_admin'

async function sha256(input: string): Promise<string> {
  const data = new TextEncoder().encode(input)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

export async function getSessionToken(): Promise<string> {
  const secret = process.env.ADMIN_PASSWORD ?? 'changeme'
  return sha256(secret + ':benlanry_admin_v1')
}

export async function isValidSession(cookie: string | undefined): Promise<boolean> {
  if (!cookie) return false
  return cookie === await getSessionToken()
}
