'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/auth-context'

export default function Home() {
  const router = useRouter()
  const { currentUser } = useAuth()

  useEffect(() => {
    if (currentUser) {
      router.push('/dashboard')
    } else {
      router.push('/login')
    }
  }, [currentUser, router])

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    </div>
  )
}