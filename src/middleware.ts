import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  
  // Define public paths that don't require authentication
  const isPublicPath = path === '/login' || path === '/signup'
  
  // Define protected paths that require authentication
  const isProtectedPath = path === '/dashboard' || path.startsWith('/dashboard/')
  
  // Get the token from the cookies
  const token = request.cookies.get('session')?.value || ''

  // Redirect authenticated users away from login/signup pages
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Redirect unauthenticated users to login page
  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: ['/', '/login', '/signup', '/dashboard', '/dashboard/:path*']
}