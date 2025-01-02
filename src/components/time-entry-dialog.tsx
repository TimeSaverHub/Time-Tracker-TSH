'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/language-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import type { TimeEntry, TimeEntryInput } from '@/types/time-tracking'

interface TimeEntryDialogProps {
  isOpen: boolean
  onClose: () => void
  onSave: (entry: TimeEntryInput) => Promise<void>
  entry: TimeEntry | null
}

export function TimeEntryDialog({
  isOpen,
  onClose,
  onSave,
  entry
}: TimeEntryDialogProps) {
  const { t } = useLanguage()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    date: entry?.date || new Date().toISOString().split('T')[0],
    hours: entry?.hours.toString() || '',
    description: entry?.description || '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (!entry) return

      const updatedEntry: TimeEntryInput = {
        date: formData.date,
        hours: parseFloat(formData.hours),
        description: formData.description,
        hourlyRate: entry.hourlyRate,
        currency: entry.currency,
        total: parseFloat(formData.hours) * entry.hourlyRate,
        userId: entry.userId,
        createdAt: entry.createdAt,
        projectId: entry.projectId,
        projectName: entry.projectName || 'Unknown Project',
        color: entry.color
      }

      await onSave(updatedEntry)
      onClose()
    } catch (error) {
      console.error('Error updating entry:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (entry) {
      setFormData({
        date: entry.date,
        hours: entry.hours.toString(),
        description: entry.description,
      })
    }
  }, [entry])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('timeTracker.editEntry')}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>{t('timeTracker.date')}</Label>
            <Input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>{t('timeTracker.hours')}</Label>
            <Input
              type="number"
              value={formData.hours}
              onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
              step="0.25"
              min="0"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>{t('timeTracker.description')}</Label>
            <Input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              {t('common.cancel')}
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
            >
              {t('common.save')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 