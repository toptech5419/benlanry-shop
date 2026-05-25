import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_COOKIE, isValidSession } from '@/lib/admin-auth'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const cookie = req.cookies.get(ADMIN_COOKIE)?.value
    if (!isValidSession(cookie)) {
      const loginUrl = req.nextUrl.clone()
      loginUrl.pathname = '/admin/login'
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
