'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/context/auth-context'
import { timeTrackingService } from '@/firebase/time-tracking'
import { projectService } from '@/firebase/project-service'
import type { TimeEntry, RateSettings, TimeEntryInput, Project } from '@/types/time-tracking'
import { Card, CardContent } from '@/components/ui/card'
import { TimeEntryList } from './time-entry-list'
import { RateSettingsForm } from './rate-settings-form'
import { VisualClock } from './visual-clock'
import { RateDisplay } from './rate-display'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useLanguage } from '@/context/language-context'
import { useToast } from '@/context/toast-context'
import { TimeEntryForm } from './time-entry-form'

export function DashboardContent() {
  const { currentUser } = useAuth()
  const { t } = useLanguage()
  const { toast } = useToast()
  const [entries, setEntries] = useState<TimeEntry[]>([])
  const [settings, setSettings] = useState<RateSettings>({ hourlyRate: 0, currency: 'EUR' })
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    if (!currentUser) return

    const loadData = async () => {
      try {
        console.log('Loading data for user:', currentUser.uid)
        
        const [entriesData, settingsData, projectsData] = await Promise.all([
          timeTrackingService.getUserTimeEntries(currentUser.uid),
          timeTrackingService.getUserSettings(currentUser.uid),
          projectService.getUserProjects(currentUser.uid)
        ])

        console.log('Loaded entries:', entriesData)
        console.log('Loaded settings:', settingsData)
        console.log('Loaded projects:', projectsData)

        setEntries(entriesData)
        setSettings(settingsData)
        setProjects(projectsData)
      } catch (err) {
        console.error('Error details:', err)
        setError('Failed to load data')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [currentUser])

  const handleSettingsUpdate = async (newSettings: RateSettings) => {
    if (!currentUser) return
    await timeTrackingService.updateUserSettings(currentUser.uid, newSettings)
    setSettings(newSettings)
  }

  const handleEntryUpdate = async (id: string, updatedEntry: TimeEntry) => {
    if (!currentUser) return
    try {
      await timeTrackingService.updateTimeEntry(currentUser.uid, id, updatedEntry)
      const updatedEntries = await timeTrackingService.getUserTimeEntries(currentUser.uid)
      setEntries(updatedEntries)
      toast({
        title: t('toast.entryUpdated'),
        description: t('toast.entryUpdateSuccess')
      })
    } catch (error) {
      console.error('Error updating entry:', error)
    }
  }

  const handleTimeUpdate = (seconds: number) => {
    // You can use this to sync with backend if needed
    console.log('Time updated:', seconds)
  }

  const handleSaveTimerEntry = async (entry: TimeEntryInput) => {
    if (!currentUser) return
    try {
      await timeTrackingService.addTimeEntry(currentUser.uid, entry)
      const updatedEntries = await timeTrackingService.getUserTimeEntries(currentUser.uid)
      setEntries(updatedEntries)
    } catch (error) {
      console.error('Error saving timer entry:', error)
    }
  }

  const handleCreateProject = async (project: Omit<Project, 'id'>) => {
    if (!currentUser) return
    try {
      await projectService.addProject({
        ...project,
        userId: currentUser.uid
      })
      const updatedProjects = await projectService.getUserProjects(currentUser.uid)
      setProjects(updatedProjects)
      toast({
        title: t('toast.entryUpdated'),
        description: t('toast.entryUpdateSuccess')
      })
    } catch (error) {
      toast({
        title: t('toast.entryUpdated'),
        description: t('toast.entryUpdateError')
      })
    }
  }

  const handleUpdateProject = async (id: string, project: Partial<Project>) => {
    if (!currentUser) return
    try {
      await projectService.updateProject(id, project)
      const updatedProjects = await projectService.getUserProjects(currentUser.uid)
      setProjects(updatedProjects)
      toast({
        title: t('toast.entryUpdated'),
        description: t('toast.entryUpdateSuccess')
      })
    } catch (error) {
      toast({
        title: t('toast.entryUpdated'),
        description: t('toast.entryUpdateError')
      })
    }
  }

  const handleDeleteProject = async (id: string) => {
    if (!currentUser) return
    try {
      await projectService.deleteProject(id)
      const updatedProjects = await projectService.getUserProjects(currentUser.uid)
      setProjects(updatedProjects)
      toast({
        title: t('toast.entryUpdated'),
        description: t('toast.entryUpdateSuccess')
      })
    } catch (error) {
      toast({
        title: t('toast.entryUpdated'),
        description: t('toast.entryUpdateError')
      })
    }
  }

  const handleEntryDelete = async (id: string) => {
    if (!currentUser) return
    try {
      await timeTrackingService.deleteTimeEntry(currentUser.uid, id)
      const updatedEntries = await timeTrackingService.getUserTimeEntries(currentUser.uid)
      setEntries(updatedEntries)
      toast({
        title: t('toast.entryUpdated'),
        description: t('toast.entryUpdateSuccess')
      })
    } catch (error) {
      toast({
        title: t('toast.entryUpdated'),
        description: t('toast.entryUpdateError')
      })
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <div className="absolute top-0 right-0">
              <RateDisplay
                settings={settings}
                onOpenSettings={() => setShowSettings(true)}
              />
            </div>
            <div className="pt-16">
              <VisualClock
                onTimeUpdate={handleTimeUpdate}
                onSaveEntry={handleSaveTimerEntry}
                rateSettings={settings}
                userId={currentUser?.uid || ''}
                projects={projects}
                onProjectCreate={handleCreateProject}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <TimeEntryForm
            onSubmit={handleSaveTimerEntry}
            initialHourlyRate={settings.hourlyRate}
            initialCurrency={settings.currency}
            projects={projects}
            onProjectCreate={handleCreateProject}
          />
        </CardContent>
      </Card>

      <TimeEntryList
        entries={entries}
        onDelete={handleEntryDelete}
        onUpdate={handleEntryUpdate}
      />

      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t('timeTracker.settings.title')}</DialogTitle>
          </DialogHeader>
          <RateSettingsForm
            settings={settings}
            onSave={async (newSettings: RateSettings) => {
              await handleSettingsUpdate(newSettings)
              setShowSettings(false)
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
} 