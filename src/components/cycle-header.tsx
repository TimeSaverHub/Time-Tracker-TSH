'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon, PlusCircle } from 'lucide-react'
import { format } from "date-fns"
import type { RegistrationCycle } from "@/types/time-tracking"
import { useToast } from "@/context/toast-context"

interface CycleHeaderProps {
  currentCycle: RegistrationCycle | null
  onCreateCycle: (startDate: Date, endDate: Date) => Promise<void>
}

export function CycleHeader({ currentCycle, onCreateCycle }: CycleHeaderProps) {
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [isCreating, setIsCreating] = useState(false)
  const { showToast } = useToast()

  const handleCreateCycle = async () => {
    if (!startDate || !endDate) {
      showToast({
        title: "Error",
        description: "Please select both start and end dates",
        type: "error"
      })
      return
    }

    if (endDate < startDate) {
      showToast({
        title: "Error",
        description: "End date must be after start date",
        type: "error"
      })
      return
    }

    setIsCreating(true)
    try {
      await onCreateCycle(startDate, endDate)
      setStartDate(undefined)
      setEndDate(undefined)
      showToast({
        title: "Success",
        description: "Registration cycle created",
        type: "success"
      })
    } catch (error) {
      showToast({
        title: "Error",
        description: "Failed to create registration cycle",
        type: "error"
      })
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h2 className="text-2xl font-bold">Current Registration Cycle</h2>
        {currentCycle ? (
          <p className="text-gray-600">
            {format(new Date(currentCycle.startDate), "PP")} - {format(new Date(currentCycle.endDate), "PP")}
          </p>
        ) : (
          <p className="text-gray-600">No active cycle</p>
        )}
      </div>

      {!currentCycle && (
        <div className="flex gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "PP") : "Start Date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
              />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "PP") : "End Date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
              />
            </PopoverContent>
          </Popover>

          <Button 
            onClick={handleCreateCycle}
            disabled={!startDate || !endDate || isCreating}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Cycle
          </Button>
        </div>
      )}
    </div>
  )
} 