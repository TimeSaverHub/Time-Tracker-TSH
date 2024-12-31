'use client'

import { useState } from 'react'
import { useAuth } from '@/context/auth-context'
import type { TimeEntry, RateSettings } from '@/types/time-tracking'

interface TimeTrackerProps {
  initialEntries: TimeEntry[]
  initialSettings: RateSettings
}

export default function TimeTracker({ initialEntries, initialSettings }: TimeTrackerProps) {
  const { currentUser } = useAuth()
  const [entries] = useState(initialEntries)
  const [settings] = useState(initialSettings)
  
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Time Tracker</h1>
      <pre>{JSON.stringify({ entries, settings }, null, 2)}</pre>
    </div>
  )
} 