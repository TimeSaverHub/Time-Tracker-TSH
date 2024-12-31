'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Settings2 } from 'lucide-react'
import { useToast } from "@/context/toast-context"
import type { RateSettings } from "@/types/time-tracking"
import { LoadingSpinner } from "@/components/shared/loading-spinner"

interface RateSettingsButtonProps {
  settings: RateSettings
  onSettingsChange: (settings: RateSettings) => Promise<void>
}

export function RateSettingsButton({ settings, onSettingsChange }: RateSettingsButtonProps) {
  const [tempSettings, setTempSettings] = useState(settings)
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { showToast } = useToast()

  const handleSave = async () => {
    try {
      setIsLoading(true)
      console.log('Attempting to save settings:', tempSettings)

      const hourlyRate = Number(tempSettings.hourlyRate)
      if (isNaN(hourlyRate)) {
        throw new Error('Invalid hourly rate')
      }

      const settingsToSave = {
        ...tempSettings,
        hourlyRate
      }

      await onSettingsChange(settingsToSave)
      setIsOpen(false)
      showToast({
        title: "Success",
        description: "Settings saved successfully",
        type: "success"
      })
    } catch (error: unknown) {
      console.error('Error saving settings:', error)
      const errorMessage = error instanceof Error ? error.message : "Failed to save settings. Please try again."
      showToast({
        title: "Error",
        description: errorMessage,
        type: "error"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings2 className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Rate Settings</SheetTitle>
          <SheetDescription>
            Configure your hourly rate and currency
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Hourly Rate</label>
            <Input
              type="number"
              step="0.01"
              min="0"
              value={tempSettings.hourlyRate}
              onChange={(e) =>
                setTempSettings({
                  ...tempSettings,
                  hourlyRate: Number(e.target.value),
                })
              }
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Currency</label>
            <Select
              value={tempSettings.currency}
              onValueChange={(value: 'EUR' | 'USD') =>
                setTempSettings({
                  ...tempSettings,
                  currency: value,
                })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EUR">Euro (€)</SelectItem>
                <SelectItem value="USD">US Dollar ($)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button 
            className="w-full" 
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? <LoadingSpinner /> : 'Save Settings'}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
} 