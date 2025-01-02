'use client'

import { useLanguage } from '@/context/language-context'
import type { TimeEntry } from '@/types/time-tracking'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatCurrency } from '@/utils/format'

interface TimeEntriesTableProps {
  entries: TimeEntry[]
  currency: string
}

export function TimeEntriesTable({ entries, currency }: TimeEntriesTableProps) {
  const { t } = useLanguage()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t('timeTracker.date')}</TableHead>
          <TableHead>{t('timeTracker.description')}</TableHead>
          <TableHead className="text-right">{t('timeTracker.hours')}</TableHead>
          <TableHead className="text-right">{t('timeTracker.hourlyRate')}</TableHead>
          <TableHead className="text-right">{t('timeTracker.total')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {entries.map((entry) => (
          <TableRow key={entry.id}>
            <TableCell>{entry.date}</TableCell>
            <TableCell>{entry.description}</TableCell>
            <TableCell className="text-right">{entry.hours}</TableCell>
            <TableCell className="text-right">
              {formatCurrency(entry.hourlyRate, currency)}
            </TableCell>
            <TableCell className="text-right">
              {formatCurrency(entry.total, currency)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
} 