'use client'

import { useState } from 'react'
import { useLanguage } from '@/context/language-context'
import { useAuth } from '@/context/auth-context'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { InvoiceDetailsForm } from './invoice-details-form'
import { InvoiceEditor } from './invoice-editor'
import { InvoicePreview } from './invoice-preview'
import type { InvoiceDetails } from '@/types/invoice'

interface CreateInvoiceDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function CreateInvoiceDialog({ isOpen, onClose }: CreateInvoiceDialogProps) {
  const { t } = useLanguage()
  const { currentUser } = useAuth()
  const [activeTab, setActiveTab] = useState('details')
  const [invoiceData, setInvoiceData] = useState<Partial<InvoiceDetails>>({
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    currency: 'EUR',
    taxRate: 21, // Default Dutch BTW
    status: 'draft'
  })

  const handleGenerateInvoice = async () => {
    // To be implemented
    console.log('Generating invoice:', invoiceData)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{t('invoices.create')}</DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="details">{t('invoices.tabs.details')}</TabsTrigger>
            <TabsTrigger value="editor">{t('invoices.tabs.editor')}</TabsTrigger>
            <TabsTrigger value="preview">{t('invoices.tabs.preview')}</TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <InvoiceDetailsForm
              data={invoiceData}
              onChange={setInvoiceData}
              onNext={() => setActiveTab('editor')}
            />
          </TabsContent>

          <TabsContent value="editor">
            <InvoiceEditor
              data={invoiceData}
              onChange={setInvoiceData}
              onNext={() => setActiveTab('preview')}
              onBack={() => setActiveTab('details')}
            />
          </TabsContent>

          <TabsContent value="preview">
            <InvoicePreview
              data={invoiceData}
              onBack={() => setActiveTab('editor')}
              onGenerate={handleGenerateInvoice}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
} 