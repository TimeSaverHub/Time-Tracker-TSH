'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/context/auth-context'
import { timeTrackingService } from '@/firebase/time-tracking'
import type { TimeEntry, RateSettings } from '@/types/time-tracking'
import { TimeEntryForm } from './time-entry-form'
import { TimeEntryList } from './time-entry-list'

export function DashboardContent() {
  const { currentUser } = useAuth()
  const [entries, setEntries] = useState<TimeEntry[]>([])
  const [settings, setSettings] = useState<RateSettings>({ hourlyRate: 0, currency: 'EUR' })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!currentUser) return

    const loadData = async () => {
      try {
        const [entriesData, settingsData] = await Promise.all([
          timeTrackingService.getUserTimeEntries(currentUser.id),
          timeTrackingService.getUserSettings(currentUser.id)
        ])
        setEntries(entriesData)
        setSettings(settingsData)
      } catch (err) {
        setError('Failed to load data')
        console.error('Error loading dashboard:', err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [currentUser])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Time Tracker</h1>
      <TimeEntryForm 
        onSubmit={async (entry) => {
          if (!currentUser) return
          await timeTrackingService.addTimeEntry(currentUser.id, entry)
          const updatedEntries = await timeTrackingService.getUserTimeEntries(currentUser.id)
          setEntries(updatedEntries)
        }}
        initialHourlyRate={settings.hourlyRate}
        initialCurrency={settings.currency}
      />
      <TimeEntryList 
        entries={entries}
        onDelete={async (id) => {
          if (!currentUser) return
          await timeTrackingService.deleteTimeEntry(currentUser.id, id)
          const updatedEntries = await timeTrackingService.getUserTimeEntries(currentUser.id)
          setEntries(updatedEntries)
        }}
      />
    </div>
  )
} 