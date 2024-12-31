'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '@/firebase/firebase'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.push('/dashboard')
      } else {
        router.push('/login')
      }
    })

    return () => unsubscribe()
  }, [router])

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Authenticating...</h1>
        <p className="text-gray-600">Please wait while we verify your credentials.</p>
      </div>
    </div>
  )
} 