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
import type { Project } from '@/types/time-tracking'

interface ProjectDialogProps {
  project?: Project
  isOpen: boolean
  onClose: () => void
  onSave: (project: Omit<Project, 'id'>) => Promise<void>
}

export function ProjectDialog({
  project,
  isOpen,
  onClose,
  onSave
}: ProjectDialogProps) {
  const { t } = useLanguage()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: project?.name || '',
    description: project?.description || '',
    color: project?.color || '#3b82f6' // Default blue
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await onSave({
        ...formData,
        createdAt: new Date().toISOString(),
        userId: '' // This will be set in the parent component
      })
      onClose()
    } catch (error) {
      console.error('Error saving project:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {project ? t('projects.edit') : t('projects.create')}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>{t('projects.name')}</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>{t('projects.description')}</Label>
            <Input
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>{t('projects.color')}</Label>
            <Input
              type="color"
              value={formData.color}
              onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              className="h-10 w-20"
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