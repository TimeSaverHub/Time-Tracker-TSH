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
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Settings2 } from 'lucide-react'
import { useToast } from "@/context/toast-context"
import type { RateSettings } from "@/types/time-tracking"
import { useLanguage } from '@/context/language-context'

interface RateSettingsProps {
  settings: RateSettings
  onSave: (settings: RateSettings) => Promise<void>
}

export function RateSettings({ settings, onSave }: RateSettingsProps) {
  const { t } = useLanguage()
  const [isEditing, setIsEditing] = useState(false)
  const [tempSettings, setTempSettings] = useState(settings)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSave = async () => {
    try {
      setIsLoading(true)
      await onSave(tempSettings)
      setIsEditing(false)
      toast({
        title: t('toast.rateUpdated'),
        description: t('toast.rateUpdateSuccess')
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update rate settings",
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