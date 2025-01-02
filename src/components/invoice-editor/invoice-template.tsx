'use client'

import { useLanguage } from '@/context/language-context'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import type { InvoiceDetails } from '@/types/invoice'

interface InvoiceTemplateProps {
  data: InvoiceDetails
  onChange: (data: InvoiceDetails) => void
}

export function InvoiceTemplate({ data, onChange }: InvoiceTemplateProps) {
  const { t } = useLanguage()

  const handleChange = (field: keyof InvoiceDetails, value: string) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('invoices.additionalInfo')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>{t('invoices.notes')}</Label>
            <Textarea
              value={data.notes || ''}
              onChange={(e) => handleChange('notes', e.target.value)}
              rows={4}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 