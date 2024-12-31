import { Timestamp } from 'firebase/firestore'

export interface TimeEntry {
  id: string
  date: string
  hours: number
  description: string
  hourlyRate: number
  currency: string
  total: number
  userId: string
  createdAt: string
  cycleId?: string
}

export interface TimeEntryInput {
  date: string
  hours: number
  description: string
  hourlyRate: number
  currency: string
  total: number
  userId: string
  createdAt: string
  cycleId?: string
}

export interface RateSettings {
  hourlyRate: number
  currency: string
}

export interface RegistrationCycle {
  id: string
  startDate: string
  endDate: string
  userId: string
  createdAt: string
  status: 'active' | 'completed'
  totalHours?: number
  totalAmount?: number
  currency: string
}

export interface RegistrationCycleInput {
  startDate: string
  endDate: string
  userId: string
  createdAt: string
  status: 'active' | 'completed'
  currency: string
} 