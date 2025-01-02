'use client'

import { useState, useEffect, useCallback, useRef } from "react"
import { useLanguage } from '@/context/language-context'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Play, Pause, RotateCcw } from 'lucide-react'
import { formatCurrency } from '@/utils/format'
import type { RateSettings, TimeEntryInput, Project } from "@/types/time-tracking"
import { SaveTimeEntryModal } from './save-time-entry-modal'
import { cn } from "@/lib/utils"

interface VisualClockProps {
  onTimeUpdate: (seconds: number) => void
  onSaveEntry: (entry: TimeEntryInput) => Promise<void>
  rateSettings: RateSettings
  userId: string
  projects: Project[]
  onProjectCreate: (project: Omit<Project, 'id'>) => Promise<void>
}

export function VisualClock({ onTimeUpdate, onSaveEntry, rateSettings, userId, projects, onProjectCreate }: VisualClockProps) {
  const { t } = useLanguage()
  const [isRunning, setIsRunning] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout>()
  const [showSaveModal, setShowSaveModal] = useState(false)
  
  // Load saved state
  useEffect(() => {
    const savedSeconds = localStorage.getItem('timeTracker_seconds')
    const savedIsRunning = localStorage.getItem('timeTracker_isRunning')
    
    if (savedSeconds) {
      setSeconds(parseInt(savedSeconds))
    }
    if (savedIsRunning === 'true') {
      setIsRunning(true)
    }
  }, [])

  // Save state when changed
  useEffect(() => {
    localStorage.setItem('timeTracker_seconds', seconds.toString())
    localStorage.setItem('timeTracker_isRunning', isRunning.toString())
  }, [seconds, isRunning])

  // Timer logic
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds(s => {
          const newSeconds = s + 1
          onTimeUpdate(newSeconds)
          return newSeconds
        })
      }, 1000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, onTimeUpdate])

  const toggleTimer = useCallback(() => {
    setIsRunning(prev => !prev)
  }, [])

  const resetTimer = useCallback(() => {
    setIsRunning(false)
    setSeconds(0)
    onTimeUpdate(0)
  }, [onTimeUpdate])

  const handleStop = useCallback(() => {
    setIsRunning(false)
    if (seconds > 0) {
      setShowSaveModal(true)
    }
  }, [seconds])

  const handleSave = async (entry: TimeEntryInput) => {
    await onSaveEntry(entry)
    setSeconds(0)
    setShowSaveModal(false)
  }

  // Format time
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60
  const timeString = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`

  // Calculate earnings
  const hourlyEarnings = (seconds / 3600) * rateSettings.hourlyRate

  return (
    <>
      <div className="space-y-4">
        <div className="text-center">
          <div className="text-4xl font-mono font-bold tracking-wider">
            {timeString}
          </div>
          <div className={cn(
            "mt-2 text-xl font-semibold transition-colors",
            isRunning ? "text-emerald-500 dark:text-emerald-400" : "text-primary"
          )}>
            {formatCurrency(hourlyEarnings, rateSettings.currency)}
          </div>
        </div>
        
        <div className="flex justify-center gap-2">
          <Button
            variant={isRunning ? "destructive" : "default"}
            onClick={isRunning ? handleStop : toggleTimer}
            className="w-24"
          >
            {isRunning ? (
              <Pause className="h-4 w-4 mr-2" />
            ) : (
              <Play className="h-4 w-4 mr-2" />
            )}
            {isRunning ? t('timeTracker.timer.stop') : t('timeTracker.timer.start')}
          </Button>
          <Button
            variant="outline"
            onClick={resetTimer}
            disabled={isRunning || seconds === 0}
            className="w-24"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            {t('timeTracker.timer.reset')}
          </Button>
        </div>
      </div>

      <SaveTimeEntryModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        onSave={handleSave}
        seconds={seconds}
        hourlyRate={rateSettings.hourlyRate}
        currency={rateSettings.currency}
        userId={userId}
        projects={projects}
        onProjectCreate={onProjectCreate}
      />
    </>
  )
} 