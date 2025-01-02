'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/context/auth-context'
import { timeTrackingService } from '@/firebase/time-tracking'
import type { TimeEntry } from '@/types/time-tracking'

export function useTimeEntries() {
  const { currentUser } = useAuth()
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadTimeEntries() {
      if (!currentUser) return
      try {
        const data = await timeTrackingService.getTimeEntries(currentUser.uid)
        setTimeEntries(data)
      } catch (error) {
        console.error('Error loading time entries:', error)
      } finally {
        setLoading(false)
      }
    }

    loadTimeEntries()
  }, [currentUser])

  return { timeEntries, loading }
} 