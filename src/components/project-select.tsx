'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/language-context'
import { useAuth } from '@/context/auth-context'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import type { Project } from '@/types/time-tracking'
import { getAllProjects } from '@/firebase/projects'

interface ProjectSelectProps {
  projects: Project[]
  selectedProjectId?: string
  onProjectSelect: (projectId: string) => void
  onProjectCreate: (project: Omit<Project, 'id'>) => Promise<void>
}

export function ProjectSelect({
  projects: initialProjects,
  selectedProjectId,
  onProjectSelect,
  onProjectCreate
}: ProjectSelectProps) {
  const { t } = useLanguage()
  const { currentUser } = useAuth()
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [newProjectName, setNewProjectName] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    if (!currentUser) return
    setLoading(true)
    try {
      const projectList = await getAllProjects(currentUser.uid)
      setProjects(projectList)
    } catch (error) {
      console.error('Error loading projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateProject = async () => {
    if (!newProjectName.trim() || !currentUser) return
    await onProjectCreate({
      name: newProjectName,
      description: '',
      color: '#000000',
      userId: currentUser.uid,
      createdAt: new Date().toISOString()
    })
    setNewProjectName('')
    setShowCreateDialog(false)
    await loadProjects()
  }

  return (
    <div className="flex gap-2">
      <Select
        value={selectedProjectId}
        onValueChange={onProjectSelect}
        disabled={loading}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={t('projects.select')} />
        </SelectTrigger>
        <SelectContent>
          {projects.map((project) => (
            <SelectItem key={project.id} value={project.id || ''}>
              {project.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        variant="outline"
        onClick={() => setShowCreateDialog(true)}
        disabled={loading}
      >
        {t('projects.createNew')}
      </Button>

      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('projects.createNew')}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              placeholder={t('projects.name')}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              {t('common.cancel')}
            </Button>
            <Button onClick={handleCreateProject}>
              {t('projects.create')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 