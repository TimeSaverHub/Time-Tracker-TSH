'use client'

import { useState } from 'react'
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
import type { TimeEntry } from '@/types/time-tracking'
import { useToast } from '@/context/toast-context'

interface TimeEntryEditModalProps {
  entry: TimeEntry
  isOpen: boolean
  onClose: () => void
  onSave: (updatedEntry: TimeEntry) => Promise<void>
}

export function TimeEntryEditModal({ 
  entry, 
  isOpen, 
  onClose, 
  onSave 
}: TimeEntryEditModalProps) {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState(entry)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await onSave(formData)
      toast({
        title: t('common.success'),
        description: t('toast.entryUpdated'),
        variant: "default"
      })
      onClose()
    } catch (error) {
      toast({
        title: t('common.error'),
        description: t('toast.entryUpdateError'),
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

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
              onChange={(e) => setFormData({ ...formData, hours: parseFloat(e.target.value) })}
              step="0.25"
              min="0"
              required
            />
          </div>
          <div className="space-y-2">
            <Label>{t('timeTracker.hourlyRate')} ({formData.currency})</Label>
            <Input
              type="number"
              value={formData.hourlyRate}
              onChange={(e) => setFormData({ ...formData, hourlyRate: parseFloat(e.target.value) })}
              step="0.01"
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