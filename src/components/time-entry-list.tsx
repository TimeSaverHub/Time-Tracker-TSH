'use client'

import { useState } from 'react'
import { useLanguage } from '@/context/language-context'
import { formatCurrency } from '@/utils/format'
import type { TimeEntry, TimeEntryInput } from '@/types/time-tracking'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TimeEntryDialog } from '@/components/time-entry-dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Edit, Trash2 } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface TimeEntryListProps {
  entries: TimeEntry[]
  onDelete: (id: string) => Promise<void>
  onUpdate: (id: string, entry: TimeEntry) => Promise<void>
}

export function TimeEntryList({ entries, onDelete, onUpdate }: TimeEntryListProps) {
  const { t } = useLanguage()
  const [editEntry, setEditEntry] = useState<TimeEntry | null>(null)
  const [deleteEntry, setDeleteEntry] = useState<TimeEntry | null>(null)

  const handleDelete = async () => {
    if (deleteEntry) {
      await onDelete(deleteEntry.id)
      setDeleteEntry(null)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('timeTracker.entries')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('timeTracker.date')}</TableHead>
              <TableHead>{t('projects.select')}</TableHead>
              <TableHead>{t('timeTracker.hours')}</TableHead>
              <TableHead>{t('timeTracker.description')}</TableHead>
              <TableHead className="text-right">{t('timeTracker.total')}</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell>{entry.date}</TableCell>
                <TableCell>
                  {entry.projectName && (
                    <div className="flex items-center gap-2">
                      {entry.projectId && (
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: entry.color || '#666' }}
                        />
                      )}
                      <span>{entry.projectName}</span>
                    </div>
                  )}
                </TableCell>
                <TableCell>{entry.hours}</TableCell>
                <TableCell>{entry.description}</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(entry.total, entry.currency)}
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setEditEntry(entry)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteEntry(entry)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TimeEntryDialog
          isOpen={!!editEntry}
          onClose={() => setEditEntry(null)}
          onSave={async (updatedEntry: TimeEntryInput) => {
            if (editEntry) {
              await onUpdate(editEntry.id, {
                ...editEntry,
                ...updatedEntry,
              })
              setEditEntry(null)
            }
          }}
          entry={editEntry}
        />

        <AlertDialog open={!!deleteEntry} onOpenChange={() => setDeleteEntry(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t('common.delete')}</AlertDialogTitle>
              <AlertDialogDescription>
                {t('timeTracker.deleteConfirm')}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                {t('common.delete')}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  )
} 