'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/context/auth-context'
import { useLanguage } from '@/context/language-context'
import { useToast } from '@/context/toast-context'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import type { InvoiceDetails } from '@/types/invoice'
import { getInvoices, updateInvoice, createTestInvoice, deleteInvoice } from '@/services/invoice-service'
import { DebugPanel } from './debug-panel'
import { useRouter } from 'next/navigation'
import { generateInvoicePDF } from '@/utils/pdf-generator'
import { Trash2, FileEdit, Download } from 'lucide-react'

interface InvoiceListProps {
  filterStatus: string
  searchQuery: string
}

export function InvoiceList({ filterStatus, searchQuery }: InvoiceListProps) {
  const { currentUser } = useAuth()
  const { t } = useLanguage()
  const { toast } = useToast()
  const [invoices, setInvoices] = useState<InvoiceDetails[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    let isMounted = true

    async function loadInvoices() {
      if (!currentUser?.uid) {
        console.log('No user ID available')
        return
      }

      setLoading(true)
      setError(null)

      try {
        console.log('Fetching invoices for user:', currentUser.uid)
        const data = await getInvoices(currentUser.uid)
        console.log('Fetched invoices:', data)
        
        if (isMounted) {
          setInvoices(data)
        }
      } catch (error) {
        console.error('Error loading invoices:', error)
        if (isMounted) {
          setError(t('invoices.loadError'))
          toast({
            title: t('common.error'),
            description: t('invoices.loadError'),
            variant: 'destructive',
          })
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadInvoices()

    return () => {
      isMounted = false
    }
  }, [currentUser, toast, t])

  // Add debug output
  useEffect(() => {
    console.log('Current state:', {
      loading,
      error,
      invoicesCount: invoices.length,
      currentUser: currentUser?.uid
    })
  }, [loading, error, invoices, currentUser])

  const handleCreateTestInvoice = async () => {
    if (!currentUser?.uid) {
      console.log('No user ID available')
      return
    }
    
    try {
      setLoading(true)
      console.log('Creating test invoice...')
      const invoiceId = await createTestInvoice(currentUser.uid)
      console.log('Test invoice created with ID:', invoiceId)
      
      // Wait a moment for Firestore to process the write
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log('Reloading invoices...')
      const newInvoices = await getInvoices(currentUser.uid)
      console.log('Loaded invoices:', newInvoices)
      
      setInvoices(newInvoices)
      toast({
        title: t('common.success'),
        description: 'Test invoice created successfully',
      })
    } catch (error) {
      console.error('Error creating test invoice:', error)
      toast({
        title: t('common.error'),
        description: error instanceof Error ? error.message : 'Failed to create test invoice',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadPDF = async (invoice: InvoiceDetails) => {
    try {
      setLoading(true)
      const blob = await generateInvoicePDF(invoice)
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${invoice.invoiceNumber}.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error generating PDF:', error)
      toast({
        title: t('common.error'),
        description: t('invoices.pdfError'),
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteInvoice = async (id: string) => {
    try {
      setLoading(true)
      await deleteInvoice(id)
      setInvoices(invoices.filter(invoice => invoice.id !== id))
      toast({
        title: t('common.success'),
        description: t('invoices.deleted'),
      })
    } catch (error) {
      console.error('Error deleting invoice:', error)
      toast({
        title: t('common.error'),
        description: t('invoices.deleteError'),
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  if (!currentUser) {
    return (
      <div className="text-center p-8">
        <p className="text-muted-foreground">{t('common.notAuthenticated')}</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Spinner className="w-8 h-8" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-destructive">{error}</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => window.location.reload()}
        >
          {t('common.retry')}
        </Button>
      </div>
    )
  }

  const filteredInvoices = invoices
    .filter(invoice => !filterStatus || filterStatus === 'all' || invoice.status === filterStatus)
    .filter(invoice => 
      !searchQuery || 
      invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.clientName.toLowerCase().includes(searchQuery.toLowerCase())
    )

  const debugData = {
    currentUser: currentUser?.uid,
    loading,
    error,
    invoicesCount: invoices.length,
    filteredCount: filteredInvoices.length,
    filterStatus,
  }

  return (
    <div className="relative">
      <div className="space-y-4">
        <div className="flex justify-end space-x-4">
          <Button
            variant="default"
            onClick={() => router.push('/invoices/new')}
          >
            {t('invoices.create')}
          </Button>
          {process.env.NODE_ENV === 'development' && (
            <Button
              variant="outline"
              onClick={handleCreateTestInvoice}
              disabled={loading}
            >
              {loading ? t('common.saving') : 'Create Test Invoice'}
            </Button>
          )}
        </div>

        {filteredInvoices.length === 0 ? (
          <div className="text-center p-8">
            <p className="text-muted-foreground">
              {filterStatus || searchQuery ? t('invoices.noMatchingInvoices') : t('invoices.noInvoices')}
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('invoices.number')}</TableHead>
                <TableHead>{t('invoices.date')}</TableHead>
                <TableHead>{t('invoices.client')}</TableHead>
                <TableHead className="text-right">{t('invoices.total')}</TableHead>
                <TableHead>{t('invoices.statusLabel')}</TableHead>
                <TableHead className="text-right">{t('common.actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>{invoice.invoiceNumber}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.clientName}</TableCell>
                  <TableCell className="text-right">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: invoice.currency
                    }).format(invoice.total)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        invoice.status === 'paid'
                          ? 'default'
                          : invoice.status === 'sent'
                          ? 'secondary'
                          : 'outline'
                      }
                    >
                      {t(`invoices.status${invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}`)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDownloadPDF(invoice)}
                      disabled={loading}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => router.push(`/invoices/edit/${invoice.id}`)}
                    >
                      <FileEdit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive/90"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>{t('invoices.deleteConfirmTitle')}</AlertDialogTitle>
                          <AlertDialogDescription>
                            {t('invoices.deleteConfirmDescription')}
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteInvoice(invoice.id!)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            {t('common.delete')}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
      <DebugPanel data={debugData} />
    </div>
  )
} 