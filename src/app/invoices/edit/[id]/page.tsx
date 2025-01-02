'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/auth-context'
import { useLanguage } from '@/context/language-context'
import { useToast } from '@/context/toast-context'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import type { InvoiceDetails } from '@/types/invoice'
import type { Project, TimeEntry } from '@/types/time-tracking'
import { getInvoice, updateInvoice } from '@/services/invoice-service'
import { useProjects } from '@/hooks/use-projects'
import { useTimeEntries } from '@/hooks/use-time-entries'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { InvoiceDetails as InvoiceDetailsComponent } from '@/components/invoice-editor/invoice-details'
import { InvoicePreview } from '@/components/invoice-editor/invoice-preview'
import { InvoiceTemplate } from '@/components/invoice-editor/invoice-template'

function InvoiceEditor({ data, onSubmit, projects, timeEntries }: {
  data: InvoiceDetails
  onSubmit: (data: InvoiceDetails) => Promise<void>
  projects: Project[]
  timeEntries: TimeEntry[]
}) {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState('details')
  const [invoiceData, setInvoiceData] = useState<InvoiceDetails>({
    ...data,
    timeEntries: data?.timeEntries || [],
    taxRate: data?.taxRate || 0,
    subtotal: data?.subtotal || 0,
    taxAmount: data?.taxAmount || 0,
    total: data?.total || 0,
    currency: data?.currency || 'EUR',
    status: data?.status || 'draft',
  })

  const handleSubmit = async () => {
    if (typeof onSubmit === 'function') {
      await onSubmit(invoiceData)
    }
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="details">{t('invoices.tabs.details')}</TabsTrigger>
          <TabsTrigger value="template">{t('invoices.tabs.editor')}</TabsTrigger>
          <TabsTrigger value="preview">{t('invoices.tabs.preview')}</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <InvoiceDetailsComponent
            data={invoiceData}
            onChange={setInvoiceData}
            projects={projects}
            timeEntries={timeEntries}
          />
        </TabsContent>
        <TabsContent value="template">
          <InvoiceTemplate
            data={invoiceData}
            onChange={setInvoiceData}
          />
        </TabsContent>
        <TabsContent value="preview">
          <InvoicePreview 
            data={invoiceData} 
            timeEntries={invoiceData.timeEntries} 
          />
        </TabsContent>
      </Tabs>
      <div className="flex justify-end">
        <Button onClick={handleSubmit}>
          {t('common.save')}
        </Button>
      </div>
    </div>
  )
}

export default function EditInvoicePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { currentUser } = useAuth()
  const { t } = useLanguage()
  const { toast } = useToast()
  const [invoice, setInvoice] = useState<InvoiceDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { projects } = useProjects()
  const { timeEntries } = useTimeEntries()

  useEffect(() => {
    if (!currentUser?.uid) {
      router.push('/login')
      return
    }

    async function loadInvoice() {
      try {
        setLoading(true)
        setError(null)
        const data = await getInvoice(params.id)
        
        // Verify the invoice belongs to the current user
        if (!currentUser?.uid || data.userId !== currentUser.uid) {
          throw new Error('Unauthorized')
        }

        setInvoice(data)
      } catch (error) {
        console.error('Error loading invoice:', error)
        const message = error instanceof Error ? error.message : 'Unknown error'
        setError(message)
        toast({
          title: t('common.error'),
          description: message === 'Unauthorized' ? t('common.unauthorized') : t('invoices.loadError'),
          variant: 'destructive',
        })
        router.push('/invoices')
      } finally {
        setLoading(false)
      }
    }

    loadInvoice()
  }, [currentUser, params.id, router, toast, t])

  const handleSave = useCallback(async (data: InvoiceDetails) => {
    if (!currentUser?.uid) {
      toast({
        title: t('common.error'),
        description: t('common.unauthorized'),
        variant: 'destructive',
      })
      return
    }

    try {
      // Calculate totals based on time entries
      const timeEntries = data.timeEntries || []
      const subtotal = timeEntries.reduce(
        (sum, entry) => sum + (entry.hours * (entry.hourlyRate || data.hourlyRate || 0)),
        0
      )
      const taxAmount = subtotal * (data.taxRate / 100)
      const total = subtotal + taxAmount

      // Ensure we're saving with the correct user ID and calculated totals
      const updatedData = {
        ...data,
        userId: currentUser.uid,
        subtotal,
        taxAmount,
        total,
        updatedAt: new Date().toISOString(),
      }

      await updateInvoice(params.id, updatedData)
      toast({
        title: t('common.success'),
        description: t('invoices.saved'),
      })
      router.push('/invoices')
    } catch (error) {
      console.error('Error saving invoice:', error)
      toast({
        title: t('common.error'),
        description: t('invoices.saveError'),
        variant: 'destructive',
      })
    }
  }, [currentUser, params.id, router, toast, t])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner className="w-8 h-8" />
      </div>
    )
  }

  if (error || !invoice) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-2xl font-bold text-red-500">{t('common.error')}</h1>
        <p className="text-gray-600">{error || t('invoices.notFound')}</p>
        <Button className="mt-4" onClick={() => router.push('/invoices')}>
          {t('common.back')}
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          {t('invoices.edit')} - {invoice.invoiceNumber}
        </h1>
        <Button variant="outline" onClick={() => router.push('/invoices')}>
          {t('common.cancel')}
        </Button>
      </div>
      <InvoiceEditor
        data={invoice}
        onSubmit={handleSave}
        projects={projects}
        timeEntries={timeEntries}
      />
    </div>
  )
} 