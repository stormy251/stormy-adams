import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // if user is signed in and they are navigating to the login page, then send them to the home page instead.
  if (user && req.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/account/settings', req.url))
  }

  // if user is signed in and they are navigating to the login page, then send them to the home page instead.
  if (!user && req.nextUrl.pathname === '/account/settings') {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return res
}

export const config = {
  matcher: ['/', '/login', '/account/settings'],
}