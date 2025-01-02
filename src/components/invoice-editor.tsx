'use client'

import { useLanguage } from '@/context/language-context'
import { Button } from '@/components/ui/button'
import type { InvoiceDetails } from '@/types/invoice'

interface InvoiceEditorProps {
  data: Partial<InvoiceDetails>
  onChange: (data: Partial<InvoiceDetails>) => void
  onNext: () => void
  onBack: () => void
}

export function InvoiceEditor({
  data,
  onChange,
  onNext,
  onBack
}: InvoiceEditorProps) {
  const { t } = useLanguage()

  return (
    <div className="space-y-4">
      <div>Editor Component (To be implemented)</div>
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          {t('common.back')}
        </Button>
        <Button onClick={onNext}>{t('common.next')}</Button>
      </div>
    </div>
  )
} 