import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // If the user is not signed in, then don't allow the settings page to load, and send them to the home page.
  if (!user && req.nextUrl.pathname === '/settings') {
    return NextResponse.redirect(new URL('/', req.url))
  }

  // if user is not signed in and the current path is not / redirect the user to /
  // if (!user && req.nextUrl.pathname !== '/') {
  //   return NextResponse.redirect(new URL('/', req.url))
  // }

  return res
}

export const config = {
  matcher: ['/', '/settings'],
}