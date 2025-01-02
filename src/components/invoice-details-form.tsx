'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/language-context'
import { useAuth } from '@/context/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { ProjectSelect } from '@/components/project-select'
import type { TimeEntry } from '@/types/time-tracking'
import type { InvoiceDetails } from '@/types/invoice'
import type { Project } from '@/types/time-tracking'
import { getProjectTimeEntries } from '@/firebase/timeEntries'
import { TimeEntriesTable } from './time-entries-table'
import { createProject } from '@/firebase/projects'

interface InvoiceDetailsFormProps {
  data: Partial<InvoiceDetails>
  onChange: (data: Partial<InvoiceDetails>) => void
  onNext: () => void
}

export function InvoiceDetailsForm({
  data,
  onChange,
  onNext
}: InvoiceDetailsFormProps) {
  const { t } = useLanguage()
  const { currentUser } = useAuth()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (data.projectId) {
      loadTimeEntries(data.projectId)
    }
  }, [data.projectId])

  const loadTimeEntries = async (projectId: string) => {
    if (!currentUser) return
    setLoading(true)
    try {
      const entries = await getProjectTimeEntries(currentUser.uid, projectId)
      const subtotal = entries.reduce((sum: number, entry: TimeEntry) => sum + entry.total, 0)
      onChange({
        ...data,
        timeEntries: entries,
        subtotal,
      })
    } catch (error) {
      console.error('Error loading time entries:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleProjectSelect = (projectId: string) => {
    onChange({ ...data, projectId })
  }

  const handleProjectCreate = async (project: Omit<Project, 'id'>) => {
    if (!currentUser) return
    try {
      await createProject(currentUser.uid, project)
    } catch (error) {
      console.error('Error creating project:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">{t('invoices.projectDetails')}</h3>
        <ProjectSelect
          projects={projects}
          selectedProjectId={data.projectId}
          onProjectSelect={handleProjectSelect}
          onProjectCreate={handleProjectCreate}
        />
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">{t('invoices.clientDetails')}</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>{t('invoices.clientName')}</Label>
            <Input
              value={data.clientName || ''}
              onChange={(e) => onChange({ ...data, clientName: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>{t('invoices.clientAddress')}</Label>
            <Input
              value={data.clientAddress || ''}
              onChange={(e) => onChange({ ...data, clientAddress: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>{t('invoices.clientEmail')}</Label>
            <Input
              type="email"
              value={data.clientEmail || ''}
              onChange={(e) => onChange({ ...data, clientEmail: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>{t('invoices.clientVAT')}</Label>
            <Input
              value={data.clientVAT || ''}
              onChange={(e) => onChange({ ...data, clientVAT: e.target.value })}
            />
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">{t('invoices.companyDetails')}</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>{t('invoices.companyName')}</Label>
            <Input
              value={data.companyName || ''}
              onChange={(e) => onChange({ ...data, companyName: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>{t('invoices.companyAddress')}</Label>
            <Input
              value={data.companyAddress || ''}
              onChange={(e) => onChange({ ...data, companyAddress: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>{t('invoices.companyVAT')}</Label>
            <Input
              value={data.companyVAT || ''}
              onChange={(e) => onChange({ ...data, companyVAT: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>{t('invoices.companyEmail')}</Label>
            <Input
              type="email"
              value={data.companyEmail || ''}
              onChange={(e) => onChange({ ...data, companyEmail: e.target.value })}
            />
          </div>
        </div>
      </div>

      {data.timeEntries && data.timeEntries.length > 0 && (
        <>
          <Separator />
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{t('timeTracker.entries')}</h3>
            <TimeEntriesTable
              entries={data.timeEntries}
              currency={data.currency || 'EUR'}
            />
          </div>
        </>
      )}

      <div className="flex justify-end">
        <Button onClick={onNext} disabled={loading}>
          {loading ? t('common.loading') : t('common.next')}
        </Button>
      </div>
    </div>
  )
} 