'use client'

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Play, Pause, RotateCcw } from 'lucide-react'
import type { RateSettings } from "@/types/time-tracking"

interface VisualClockProps {
  onTimeUpdate: (seconds: number) => void
  rateSettings: RateSettings
}

export function VisualClock({ onTimeUpdate, rateSettings }: VisualClockProps) {
  const [isRunning, setIsRunning] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const timerRef = useRef<NodeJS.Timeout>()

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const secs = totalSeconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const calculateEarnings = (seconds: number) => {
    const hours = seconds / 3600
    const earnings = hours * rateSettings.hourlyRate
    return `${rateSettings.currency === 'EUR' ? '€' : '$'}${earnings.toFixed(2)}`
  }

  const startTimer = useCallback(() => {
    if (timerRef.current) return
    setIsRunning(true)
    timerRef.current = setInterval(() => {
      setSeconds(s => s + 1)
    }, 1000)
  }, [])

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = undefined
    }
    setIsRunning(false)
  }, [])

  const resetTimer = useCallback(() => {
    stopTimer()
    setSeconds(0)
  }, [stopTimer])

  useEffect(() => {
    onTimeUpdate(seconds)
  }, [seconds, onTimeUpdate])

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  return (
    <Card className="p-6">
      <div className="text-center">
        <div className="text-4xl font-bold mb-2">{formatTime(seconds)}</div>
        <div className="text-xl text-muted-foreground mb-4">
          {calculateEarnings(seconds)}
        </div>
        <div className="flex justify-center gap-2">
          <Button
            variant={isRunning ? "outline" : "default"}
            onClick={isRunning ? stopTimer : startTimer}
          >
            {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button
            variant="outline"
            onClick={resetTimer}
            disabled={isRunning || seconds === 0}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
} 