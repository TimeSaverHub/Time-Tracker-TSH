'use client'

import { useState } from 'react'
import { useAuth } from '@/context/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { TimeEntryInput } from '@/types/time-tracking'
import { Timestamp } from 'firebase/firestore'

interface TimeEntryFormProps {
  onSubmit: (entry: TimeEntryInput) => Promise<void>
  initialHourlyRate: number
  initialCurrency: string
}

export function TimeEntryForm({ onSubmit, initialHourlyRate, initialCurrency }: TimeEntryFormProps) {
  const { currentUser } = useAuth()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    hours: '',
    description: '',
    hourlyRate: initialHourlyRate.toString(),
    currency: initialCurrency
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentUser) return

    setLoading(true)
    try {
      const hours = parseFloat(formData.hours)
      const hourlyRate = parseFloat(formData.hourlyRate)
      
      const entry: TimeEntryInput = {
        date: formData.date,
        hours: hours,
        description: formData.description,
        hourlyRate: hourlyRate,
        currency: formData.currency,
        total: hours * hourlyRate,
        userId: currentUser.id,
        createdAt: new Date().toISOString()
      }

      await onSubmit(entry)
      
      // Reset form
      setFormData({
        ...formData,
        hours: '',
        description: ''
      })
    } catch (error) {
      console.error('Error submitting entry:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="date"
        value={formData.date}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        required
      />
      <Input
        type="number"
        placeholder="Hours"
        value={formData.hours}
        onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
        step="0.25"
        min="0"
        required
      />
      <Input
        type="text"
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        required
      />
      <Button type="submit" disabled={loading}>
        Add Entry
      </Button>
    </form>
  )
} 