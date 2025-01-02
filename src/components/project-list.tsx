'use client'

import { useState } from 'react'
import { useLanguage } from '@/context/language-context'
import { Plus, Edit2, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card'
import { ProjectDialog } from './project-dialog'
import type { Project, TimeEntry } from '@/types/time-tracking'
import { formatCurrency } from '@/utils/format'

interface ProjectListProps {
  projects: Project[]
  timeEntries: TimeEntry[]
  onProjectCreate: (project: Omit<Project, 'id'>) => Promise<void>
  onProjectUpdate: (id: string, project: Partial<Project>) => Promise<void>
  onProjectDelete: (id: string) => Promise<void>
}

export function ProjectList({
  projects,
  timeEntries,
  onProjectCreate,
  onProjectUpdate,
  onProjectDelete
}: ProjectListProps) {
  const { t } = useLanguage()
  const [showNewProjectDialog, setShowNewProjectDialog] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  const getProjectStats = (projectId: string) => {
    const projectEntries = timeEntries.filter(entry => entry.projectId === projectId)
    const totalHours = projectEntries.reduce((sum, entry) => sum + entry.hours, 0)
    const totalEarnings = projectEntries.reduce((sum, entry) => sum + entry.total, 0)
    const currency = projectEntries[0]?.currency || 'EUR'
    return { totalHours, totalEarnings, currency }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{t('projects.title')}</CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowNewProjectDialog(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          {t('projects.createNew')}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="divide-y">
          {projects.map((project) => {
            const { totalHours, totalEarnings, currency } = getProjectStats(project.id!)
            
            return (
              <div
                key={project.id}
                className="py-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: project.color }}
                  />
                  <div>
                    <h3 className="font-medium">{project.name}</h3>
                    {project.description && (
                      <p className="text-sm text-muted-foreground">
                        {project.description}
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground">
                      {totalHours.toFixed(2)} {t('timeTracker.hoursUnit')} ·{' '}
                      {formatCurrency(totalEarnings, currency)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setEditingProject(project)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onProjectDelete(project.id!)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            )
          })}

          {projects.length === 0 && (
            <p className="py-4 text-center text-muted-foreground">
              {t('projects.noProjects')}
            </p>
          )}
        </div>
      </CardContent>

      <ProjectDialog
        isOpen={showNewProjectDialog}
        onClose={() => setShowNewProjectDialog(false)}
        onSave={onProjectCreate}
      />

      {editingProject && (
        <ProjectDialog
          project={editingProject}
          isOpen={true}
          onClose={() => setEditingProject(null)}
          onSave={async (updatedProject) => {
            await onProjectUpdate(editingProject.id!, updatedProject)
            setEditingProject(null)
          }}
        />
      )}
    </Card>
  )
} 