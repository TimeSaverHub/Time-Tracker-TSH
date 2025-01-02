'use client'

import { useState } from 'react'
import { InvoiceList } from '@/components/invoice-list'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useLanguage } from '@/context/language-context'

export default function InvoicesPage() {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t('invoices.list')}</h1>
      </div>

      <div className="flex gap-4">
        <Input
          placeholder={t('invoices.search')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-xs"
        />
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t('invoices.filterStatus')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('invoices.statusAll')}</SelectItem>
            <SelectItem value="draft">{t('invoices.statusDraft')}</SelectItem>
            <SelectItem value="sent">{t('invoices.statusSent')}</SelectItem>
            <SelectItem value="paid">{t('invoices.statusPaid')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <InvoiceList filterStatus={filterStatus} searchQuery={searchQuery} />
    </div>
  )
} 