'use client'

import { useLanguage } from '@/context/language-context'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import type { TimeEntry } from '@/types/time-tracking'
import { formatCurrency } from '@/utils/format'

interface TimeEntrySelectorProps {
  timeEntries: TimeEntry[]
  selectedEntries: TimeEntry[]
  onChange: (entries: TimeEntry[]) => void
}

export function TimeEntrySelector({
  timeEntries,
  selectedEntries,
  onChange,
}: TimeEntrySelectorProps) {
  const { t } = useLanguage()

  const handleToggle = (entry: TimeEntry) => {
    const isSelected = selectedEntries.some(e => e.id === entry.id)
    const newSelection = isSelected
      ? selectedEntries.filter(e => e.id !== entry.id)
      : [...selectedEntries, entry]
    onChange(newSelection)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('timeTracker.entries')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {timeEntries.map((entry) => (
            <div
              key={entry.id}
              className="flex items-center space-x-4 p-2 hover:bg-accent rounded-lg"
            >
              <Checkbox
                checked={selectedEntries.some(e => e.id === entry.id)}
                onCheckedChange={() => handleToggle(entry)}
              />
              <div className="flex-1">
                <p className="font-medium">{entry.description}</p>
                <p className="text-sm text-muted-foreground">
                  {entry.date} - {entry.hours} {t('timeTracker.hoursUnit')}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">
                  {formatCurrency(entry.hours * entry.hourlyRate, entry.currency)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {formatCurrency(entry.hourlyRate, entry.currency)}/{t('timeTracker.hoursUnit')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 