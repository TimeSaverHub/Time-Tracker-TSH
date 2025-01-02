'use client'

import { Settings2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/context/language-context'
import { formatCurrency } from '@/utils/format'
import type { RateSettings } from '@/types/time-tracking'

interface RateDisplayProps {
  settings: RateSettings
  onOpenSettings: () => void
}

export function RateDisplay({ settings, onOpenSettings }: RateDisplayProps) {
  const { t } = useLanguage()

  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-muted/50 rounded-lg">
      <div className="flex items-baseline gap-1.5">
        <span className="text-sm text-muted-foreground">
          {t('timeTracker.hourlyRate')}:
        </span>
        <span className="font-medium">
          {formatCurrency(settings.hourlyRate, settings.currency)}
        </span>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onOpenSettings()}
        className="h-8 w-8 hover:bg-muted"
        title={t('timeTracker.settings.edit')}
      >
        <Settings2 className="h-4 w-4" />
      </Button>
    </div>
  )
} 