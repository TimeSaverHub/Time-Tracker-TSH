'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/context/toast-context"
import type { RateSettings } from "@/types/time-tracking"
import { useLanguage } from '@/context/language-context'

interface RateSettingsFormProps {
  settings: RateSettings
  onSave: (settings: RateSettings) => Promise<void>
}

export function RateSettingsForm({ settings, onSave }: RateSettingsFormProps) {
  const { t } = useLanguage()
  const [tempSettings, setTempSettings] = useState(settings)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSave = async () => {
    try {
      setIsLoading(true)
      await onSave(tempSettings)
      toast({
        title: t('common.success'),
        description: t('toast.rateUpdated'),
        variant: "default"
      })
    } catch (error) {
      toast({
        title: t('common.error'),
        description: t('toast.rateUpdateError'),
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>{t('timeTracker.hourlyRate')}</Label>
        <Input
          type="number"
          value={tempSettings.hourlyRate}
          onChange={(e) => setTempSettings({
            ...tempSettings,
            hourlyRate: parseFloat(e.target.value)
          })}
          min="0"
          step="0.01"
        />
      </div>
      <div className="space-y-2">
        <Label>{t('timeTracker.currency')}</Label>
        <Select
          value={tempSettings.currency}
          onValueChange={(value) => setTempSettings({
            ...tempSettings,
            currency: value
          })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="EUR">EUR</SelectItem>
            <SelectItem value="USD">USD</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-end gap-2">
        <Button onClick={handleSave} disabled={isLoading}>
          {t('common.save')}
        </Button>
      </div>
    </div>
  )
} 