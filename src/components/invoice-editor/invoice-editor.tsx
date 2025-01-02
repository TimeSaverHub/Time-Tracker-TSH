'use client'

import { useState } from 'react'
import { useLanguage } from '@/context/language-context'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import type { InvoiceDetails } from '@/types/invoice'
import type { Project, TimeEntry } from '@/types/time-tracking'
import { InvoiceDetails as InvoiceDetailsComponent } from './invoice-details'
import { InvoicePreview } from './invoice-preview'
import { InvoiceTemplate } from './invoice-template'
import { Button } from '@/components/ui/button'

interface InvoiceEditorProps {
  data: InvoiceDetails
  onSubmit: (data: InvoiceDetails) => Promise<void>
  projects: Project[]
  timeEntries: TimeEntry[]
}

function InvoiceEditor({ data, onSubmit, projects, timeEntries }: InvoiceEditorProps) {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState('details')
  const [invoiceData, setInvoiceData] = useState<InvoiceDetails>({
    ...data,
    timeEntries: data?.timeEntries || [],
    taxRate: data?.taxRate || 0,
    subtotal: data?.subtotal || 0,
    taxAmount: data?.taxAmount || 0,
    total: data?.total || 0,
    currency: data?.currency || 'USD',
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

export { InvoiceEditor }
export type { InvoiceEditorProps } 