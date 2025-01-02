'use client'

import { useLanguage } from '@/context/language-context'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { InvoiceDetails } from '@/types/invoice'
import type { Project, TimeEntry } from '@/types/time-tracking'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'

interface InvoiceDetailsProps {
  data: InvoiceDetails
  onChange: (data: InvoiceDetails) => void
  projects: Project[]
  timeEntries: TimeEntry[]
}

export function InvoiceDetails({ data, onChange, projects, timeEntries }: InvoiceDetailsProps) {
  const { t } = useLanguage()

  // Filter time entries for selected project
  const projectTimeEntries = timeEntries.filter(
    entry => entry.projectId === data?.projectId
  )

  const handleTimeEntryToggle = (entry: TimeEntry) => {
    const currentEntries = data.timeEntries || []
    const isSelected = currentEntries.some(e => e.id === entry.id)
    
    let newEntries: TimeEntry[]
    if (isSelected) {
      newEntries = currentEntries.filter(e => e.id !== entry.id)
    } else {
      newEntries = [...currentEntries, entry]
    }

    // Calculate new totals
    const subtotal = newEntries.reduce(
      (sum, e) => sum + (e.hours * (e.hourlyRate || data.hourlyRate || 0)),
      0
    )
    const taxAmount = subtotal * (data.taxRate / 100)
    const total = subtotal + taxAmount

    onChange({
      ...data,
      timeEntries: newEntries,
      subtotal,
      taxAmount,
      total,
    })
  }

  const handleChange = (field: keyof InvoiceDetails, value: any) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('invoices.basicInfo')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t('invoices.number')}</Label>
              <Input
                value={data.invoiceNumber}
                onChange={(e) => handleChange('invoiceNumber', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>{t('invoices.date')}</Label>
              <Input
                type="date"
                value={data.date}
                onChange={(e) => handleChange('date', e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t('invoices.dueDate')}</Label>
              <Input
                type="date"
                value={data.dueDate}
                onChange={(e) => handleChange('dueDate', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>{t('projects.select')}</Label>
              <Select
                value={data.projectId}
                onValueChange={(value) => handleChange('projectId', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('projects.select')} />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.id || ''}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('invoices.clientDetails')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t('invoices.clientName')}</Label>
              <Input
                value={data.clientName}
                onChange={(e) => handleChange('clientName', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>{t('invoices.clientEmail')}</Label>
              <Input
                type="email"
                value={data.clientEmail || ''}
                onChange={(e) => handleChange('clientEmail', e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>{t('invoices.clientAddress')}</Label>
            <Input
              value={data.clientAddress}
              onChange={(e) => handleChange('clientAddress', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>{t('invoices.clientVAT')}</Label>
            <Input
              value={data.clientVAT || ''}
              onChange={(e) => handleChange('clientVAT', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('invoices.companyDetails')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t('invoices.companyName')}</Label>
              <Input
                value={data.companyName}
                onChange={(e) => handleChange('companyName', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>{t('invoices.companyEmail')}</Label>
              <Input
                type="email"
                value={data.companyEmail}
                onChange={(e) => handleChange('companyEmail', e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>{t('invoices.companyAddress')}</Label>
            <Input
              value={data.companyAddress}
              onChange={(e) => handleChange('companyAddress', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>{t('invoices.companyVAT')}</Label>
            <Input
              value={data.companyVAT}
              onChange={(e) => handleChange('companyVAT', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('invoices.bankDetails')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t('invoices.bankName')}</Label>
              <Input
                value={data.bankName}
                onChange={(e) => handleChange('bankName', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>{t('invoices.bankAccount')}</Label>
              <Input
                value={data.bankAccount}
                onChange={(e) => handleChange('bankAccount', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('invoices.timeEntries')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>{t('timeTracker.date')}</TableHead>
                <TableHead>{t('timeTracker.description')}</TableHead>
                <TableHead>{t('timeTracker.hours')}</TableHead>
                <TableHead>{t('timeTracker.hourlyRate')}</TableHead>
                <TableHead className="text-right">{t('timeTracker.total')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projectTimeEntries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>
                    <Checkbox
                      checked={(data.timeEntries || []).some(t => t.id === entry.id)}
                      onCheckedChange={() => handleTimeEntryToggle(entry)}
                    />
                  </TableCell>
                  <TableCell>{entry.date}</TableCell>
                  <TableCell>{entry.description}</TableCell>
                  <TableCell>{entry.hours}</TableCell>
                  <TableCell>
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: data.currency
                    }).format(entry.hourlyRate || data.hourlyRate || 0)}
                  </TableCell>
                  <TableCell className="text-right">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: data.currency
                    }).format((entry.hours * (entry.hourlyRate || data.hourlyRate || 0)))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
} 