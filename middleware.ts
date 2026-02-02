import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Mobile user agent patterns
const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for static assets and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') // static files like .jpg, .css, etc.
  ) {
    return NextResponse.next()
  }

  // Check for mobile devices first
  const userAgent = request.headers.get('user-agent') || ''
  const isMobile = mobileRegex.test(userAgent)

  // Allow access to mobile-blocked page
  if (pathname === '/mobile-blocked') {
    // If on desktop, redirect away from mobile-blocked page
    if (!isMobile) {
      return NextResponse.redirect(new URL('/today', request.url))
    }
    return NextResponse.next()
  }

  // Block mobile devices
  if (isMobile) {
    return NextResponse.redirect(new URL('/mobile-blocked', request.url))
  }

  // Allow access to login page without auth
  if (pathname === '/login') {
    // If already authenticated, redirect to app
    const authCookie = request.cookies.get('aos-auth')
    if (authCookie?.value === 'authenticated') {
      return NextResponse.redirect(new URL('/today', request.url))
    }
    return NextResponse.next()
  }

  // Check authentication for all other routes
  const authCookie = request.cookies.get('aos-auth')
  if (authCookie?.value !== 'authenticated') {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
