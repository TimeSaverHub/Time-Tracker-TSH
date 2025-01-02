'use client'

import { useLanguage } from '@/context/language-context'
import { Card, CardContent } from '@/components/ui/card'
import type { InvoiceDetails } from '@/types/invoice'
import type { TimeEntry } from '@/types/time-tracking'

interface InvoicePreviewProps {
  data: InvoiceDetails
  timeEntries: TimeEntry[]
}

export function InvoicePreview({ data, timeEntries }: InvoicePreviewProps) {
  const { t } = useLanguage()

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6 space-y-6">
          {/* Header */}
          <div className="flex justify-between">
            <div>
              <h2 className="text-2xl font-bold">{t('common.invoice')}</h2>
              <p className="text-gray-500">{data.invoiceNumber}</p>
            </div>
            <div className="text-right">
              <p>{t('invoices.date')}: {data.date}</p>
              <p>{t('invoices.dueDate')}: {data.dueDate}</p>
            </div>
          </div>

          {/* Company Details */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-2">{t('invoices.from')}:</h3>
              <p>{data.companyName}</p>
              <p className="whitespace-pre-line">{data.companyAddress}</p>
              <p>{t('invoices.vat')}: {data.companyVAT}</p>
              <p>{data.companyEmail}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">{t('invoices.to')}:</h3>
              <p>{data.clientName}</p>
              <p className="whitespace-pre-line">{data.clientAddress}</p>
              {data.clientVAT && <p>{t('invoices.vat')}: {data.clientVAT}</p>}
              {data.clientEmail && <p>{data.clientEmail}</p>}
            </div>
          </div>

          {/* Time Entries */}
          <div>
            <h3 className="font-semibold mb-4">{t('timeTracker.entries')}:</h3>
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">{t('timeTracker.date')}</th>
                  <th className="text-left py-2">{t('timeTracker.description')}</th>
                  <th className="text-right py-2">{t('timeTracker.hours')}</th>
                  <th className="text-right py-2">{t('timeTracker.rate')}</th>
                  <th className="text-right py-2">{t('timeTracker.amount')}</th>
                </tr>
              </thead>
              <tbody>
                {timeEntries.map((entry) => (
                  <tr key={entry.id} className="border-b">
                    <td className="py-2">{entry.date}</td>
                    <td className="py-2">{entry.description}</td>
                    <td className="text-right py-2">{entry.hours}</td>
                    <td className="text-right py-2">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: data.currency
                      }).format(entry.hourlyRate || data.hourlyRate || 0)}
                    </td>
                    <td className="text-right py-2">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: data.currency
                      }).format(entry.hours * (entry.hourlyRate || data.hourlyRate || 0))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex flex-col items-end space-y-2">
            <div className="flex justify-between w-48">
              <span>{t('invoices.subtotal')}:</span>
              <span>
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: data.currency
                }).format(data.subtotal)}
              </span>
            </div>
            <div className="flex justify-between w-48">
              <span>{t('invoices.tax')} ({data.taxRate}%):</span>
              <span>
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: data.currency
                }).format(data.taxAmount)}
              </span>
            </div>
            <div className="flex justify-between w-48 font-bold">
              <span>{t('invoices.total')}:</span>
              <span>
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: data.currency
                }).format(data.total)}
              </span>
            </div>
          </div>

          {/* Bank Details */}
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-2">{t('invoices.bankDetails')}:</h3>
            <p>{t('invoices.bankName')}: {data.bankName}</p>
            <p>{t('invoices.bankAccount')}: {data.bankAccount}</p>
          </div>

          {/* Notes */}
          {data.notes && (
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">{t('invoices.notes')}:</h3>
              <p className="whitespace-pre-line">{data.notes}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 