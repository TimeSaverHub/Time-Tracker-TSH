'use client'

import { useState } from 'react'
import { useAuth } from '@/context/auth-context'
import { useLanguage } from '@/context/language-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { TimeEntryInput, Project } from '@/types/time-tracking'
import { ProjectSelect } from './project-select'
import { createProject } from '@/firebase/projects'
import { getAllProjects } from '@/firebase/projects'

interface TimeEntryFormProps {
  onSubmit: (entry: TimeEntryInput) => Promise<void>
  initialHourlyRate: number
  initialCurrency: string
  projects: Project[]
  onProjectCreate: (project: Omit<Project, 'id'>) => Promise<void>
}

export function TimeEntryForm({
  onSubmit,
  initialHourlyRate,
  initialCurrency,
  projects: initialProjects,
  onProjectCreate
}: TimeEntryFormProps) {
  const { currentUser } = useAuth()
  const { t } = useLanguage()
  const [loading, setLoading] = useState(false)
  const [projects, setProjects] = useState(initialProjects)
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    hours: '',
    description: '',
    hourlyRate: initialHourlyRate.toString(),
    currency: initialCurrency,
    projectId: ''
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentUser) return

    if (!formData.projectId) {
      setError(t('projects.required'))
      return
    }

    setLoading(true)
    setError(null)

    try {
      const hours = parseFloat(formData.hours)
      const hourlyRate = parseFloat(formData.hourlyRate)
      
      const selectedProject = projects.find(p => p.id === formData.projectId)
      if (!selectedProject) {
        throw new Error('Project not found')
      }

      const entry: TimeEntryInput = {
        date: formData.date,
        hours: hours,
        description: formData.description,
        hourlyRate: hourlyRate,
        currency: formData.currency,
        total: hours * hourlyRate,
        userId: currentUser.uid,
        createdAt: new Date().toISOString(),
        projectId: selectedProject.id!,
        projectName: selectedProject.name,
        color: selectedProject.color
      }

      await onSubmit(entry)
      
      // Reset form
      setFormData({
        ...formData,
        hours: '',
        description: '',
        projectId: ''
      })
      setError(null)
    } catch (error) {
      console.error('Error submitting entry:', error)
      setError(t('timeTracker.addEntry.error'))
    } finally {
      setLoading(false)
    }
  }

  return (
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
        <Input
          type="number"
          placeholder={t('timeTracker.hours')}
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
          placeholder={t('timeTracker.description')}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
      </div>

      <Button type="submit" disabled={loading}>
        {t('timeTracker.addEntry')}
      </Button>
    </form>
  )
} 