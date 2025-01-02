'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/auth-context'
import { useInvoice } from '@/hooks/use-invoice'
import { InvoiceEditor } from '@/components/invoice-editor/invoice-editor'
import { useProjects } from '@/hooks/use-projects'
import { useTimeEntries } from '@/hooks/use-time-entries'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/context/language-context'
import type { InvoiceDetails } from '@/types/invoice'

export default function NewInvoicePage() {
  const router = useRouter()
  const { currentUser } = useAuth()
  const { t } = useLanguage()
  const { invoice, setInvoice, saveInvoice, loading } = useInvoice()
  const { projects, loading: loadingProjects } = useProjects()
  const { timeEntries, loading: loadingTimeEntries } = useTimeEntries()

  useEffect(() => {
    if (!currentUser) {
      router.push('/login')
    }
  }, [currentUser, router])

  if (!currentUser || loadingProjects || loadingTimeEntries) {
    return <div>{t('common.loading')}</div>
  }

  const handleSave = async (data: InvoiceDetails) => {
    setInvoice(data)
    await saveInvoice()
    router.push('/invoices')
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t('invoices.create')}</h1>
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