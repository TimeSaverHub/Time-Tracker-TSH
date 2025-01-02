'use client'

import { useLanguage } from '@/context/language-context'
import { Button } from '@/components/ui/button'
import type { InvoiceDetails } from '@/types/invoice'

interface InvoicePreviewProps {
  data: Partial<InvoiceDetails>
  onBack: () => void
  onGenerate: () => void
}

export function InvoicePreview({
  data,
  onBack,
  onGenerate
}: InvoicePreviewProps) {
  const { t } = useLanguage()

  return (
    <div className="space-y-4">
      <div>Preview Component (To be implemented)</div>
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          {t('common.back')}
        </Button>
        <Button onClick={onGenerate}>
          {t('invoices.generate')}
        </Button>
      </div>
    </div>
  )
} 