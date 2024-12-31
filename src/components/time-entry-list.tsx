'use client'

import { useState } from 'react'
import type { TimeEntry } from '@/types/time-tracking'
import { formatCurrency } from '@/utils/format'

interface TimeEntryListProps {
  entries: TimeEntry[]
  onDelete: (id: string) => Promise<void>
}

export function TimeEntryList({ entries, onDelete }: TimeEntryListProps) {
  const [loading, setLoading] = useState(false)

  const handleDelete = async (id: string) => {
    setLoading(true)
    try {
      await onDelete(id)
    } catch (error) {
      console.error('Error deleting entry:', error)
    } finally {
      setLoading(false)
    }
  }

  const sortedEntries = [...entries].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Time Entries</h2>
      <div className="divide-y">
        {sortedEntries.map((entry) => (
          <div key={entry.id} className="py-4 flex justify-between items-center">
            <div>
              <p className="font-medium">{entry.date}</p>
              <p className="text-gray-600">{entry.description}</p>
              <p className="text-sm text-gray-500">{entry.hours} hours</p>
            </div>
            <div className="text-right">
              <p className="font-medium">
                {formatCurrency(entry.total, entry.currency)}
              </p>
              <button
                onClick={() => handleDelete(entry.id)}
                disabled={loading}
                className="text-red-600 text-sm hover:text-red-800"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 