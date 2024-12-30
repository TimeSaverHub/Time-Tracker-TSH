'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  useEffect(() => {
    window.location.href = '/login'
  }, [])

  return null
} 