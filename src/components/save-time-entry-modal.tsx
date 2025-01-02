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
import type { TimeEntryInput, Project } from '@/types/time-tracking'
import { ProjectSelect } from './project-select'
import { createProject } from '@/firebase/projects'
import { useAuth } from '@/context/auth-context'
import { getAllProjects } from '@/firebase/projects'

interface SaveTimeEntryModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (entry: TimeEntryInput) => Promise<void>
  seconds: number
  hourlyRate: number
  currency: string
  userId: string
  projects: Project[]
  onProjectCreate: (project: Omit<Project, 'id'>) => Promise<void>
}

export function SaveTimeEntryModal({
  isOpen,
  onClose,
  onSave,
  seconds,
  hourlyRate,
  currency,
  userId,
  projects: initialProjects,
  onProjectCreate
}: SaveTimeEntryModalProps) {
  const { t } = useLanguage()
  const { currentUser } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [projects, setProjects] = useState(initialProjects)
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    description: '',
    projectId: '',
  })
  const [error, setError] = useState<string | null>(null)

  const loadProjects = async () => {
    if (!currentUser) return
    try {
      const projectList = await getAllProjects(currentUser.uid)
      setProjects(projectList)
    } catch (error) {
      console.error('Error loading projects:', error)
    }
  }

  const hours = seconds / 3600
  const earnings = hours * hourlyRate

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.projectId) {
      setError(t('projects.required'))
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const selectedProject = projects.find(p => p.id === formData.projectId)
      if (!selectedProject) {
        throw new Error('Project not found')
      }

      const entry: TimeEntryInput = {
        date: formData.date,
        hours: Number(hours.toFixed(2)),
        description: formData.description,
        hourlyRate,
        currency,
        total: earnings,
        createdAt: new Date().toISOString(),
        userId,
        projectId: selectedProject.id!,
        projectName: selectedProject.name,
        color: selectedProject.color
      }

      await onSave(entry)
      onClose()
    } catch (error) {
      console.error('Error saving time entry:', error)
      setError(t('timeTracker.saveEntry.error'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('timeTracker.saveEntry.title')}</DialogTitle>
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
            <Label>{t('projects.select')}</Label>
            <ProjectSelect
              projects={projects}
              selectedProjectId={formData.projectId}
              onProjectSelect={(id) => {
                setFormData({ ...formData, projectId: id })
                setError(null)
              }}
              onProjectCreate={async (project) => {
                if (!currentUser) return
                await createProject(currentUser.uid, project)
                await loadProjects()
              }}
            />
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>{t('timeTracker.hours')}</Label>
            <div className="text-lg font-medium">
              {hours.toFixed(2)} {t('timeTracker.hoursUnit')}
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t('timeTracker.earnings')}</Label>
            <div className="text-lg font-medium text-primary">
              {currency === 'EUR' ? '€' : '$'}{earnings.toFixed(2)}
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t('timeTracker.description')}</Label>
            <Input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder={t('timeTracker.saveEntry.descriptionPlaceholder')}
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
              {t('timeTracker.saveEntry.save')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 