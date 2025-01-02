import { useState, useCallback } from 'react'
import { useAuth } from '@/context/auth-context'
import { useToast } from '@/context/toast-context'
import { useLanguage } from '@/context/language-context'
import { createInvoice } from '@/services/invoice-service'
import type { InvoiceDetails } from '@/types/invoice'
import { generateInvoiceNumber } from '@/services/invoice-service'

export function useInvoice() {
  const { currentUser } = useAuth()
  const { toast } = useToast()
  const { t } = useLanguage()
  const [loading, setLoading] = useState(false)
  const [invoice, setInvoice] = useState<InvoiceDetails>({
    invoiceNumber: generateInvoiceNumber(),
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    projectId: '',
    clientName: '',
    clientAddress: '',
    clientEmail: '',
    clientVAT: '',
    companyName: '',
    companyAddress: '',
    companyVAT: '',
    companyEmail: '',
    bankAccount: '',
    bankName: '',
    timeEntries: [],
    subtotal: 0,
    taxRate: 21,
    taxAmount: 0,
    total: 0,
    currency: 'EUR',
    status: 'draft',
  })

  const saveInvoice = useCallback(async () => {
    if (!currentUser) {
      toast({
        title: t('common.error'),
        description: t('common.unauthorized'),
        variant: 'destructive',
      })
      return
    }

    try {
      setLoading(true)

      // Calculate totals based on time entries
      const subtotal = invoice.timeEntries.reduce(
        (sum, entry) => sum + (entry.hours * (entry.hourlyRate || invoice.hourlyRate || 0)),
        0
      )
      const taxAmount = subtotal * (invoice.taxRate / 100)
      const total = subtotal + taxAmount

      const updatedInvoice = {
        ...invoice,
        userId: currentUser.uid,
        subtotal,
        taxAmount,
        total,
      }

      await createInvoice(currentUser.uid, updatedInvoice)
      toast({
        title: t('common.success'),
        description: t('invoices.created'),
      })
    } catch (error) {
      console.error('Error saving invoice:', error)
      toast({
        title: t('common.error'),
        description: t('invoices.createError'),
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }, [currentUser, invoice, toast, t])

  return {
    invoice,
    setInvoice,
    saveInvoice,
    loading,
  }
} 