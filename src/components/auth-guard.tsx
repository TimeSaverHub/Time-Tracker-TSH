'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/context/auth-context'

const publicPaths = ['/', '/login', '/signup']

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { currentUser, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!loading) {
      if (!currentUser && !publicPaths.includes(pathname)) {
        router.push('/login')
      } else if (currentUser && publicPaths.includes(pathname)) {
        router.push('/dashboard')
      }
    }
  }, [currentUser, loading, pathname, router])

  if (loading) {
    return <div>Loading...</div>
  }

  return <>{children}</>
} 