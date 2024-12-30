'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/auth-context'
import { LoadingSpinner } from '../shared/loading-spinner'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { currentUser, loading } = useAuth()

  useEffect(() => {
    if (!loading && !currentUser) {
      router.push('/login')
    }
  }, [currentUser, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (!currentUser) {
    return null
  }

  return <>{children}</>
}

