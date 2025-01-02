import type { Timestamp } from 'firebase/firestore'

export interface UserProfile {
  id: string
  email: string
  name: string
  createdAt: string
  settings: UserSettings
}

export interface UserSettings {
  defaultHourlyRate: number
  currency: string
  companyName?: string
  companyAddress?: string
  companyVAT?: string
  companyEmail?: string
  bankName?: string
  bankAccount?: string
}

export interface FirestoreInvoice {
  id?: string
  userId: string
  invoiceNumber: string
  date: string
  dueDate: string
  projectId: string
  clientName: string
  clientAddress: string
  clientEmail?: string
  clientVAT?: string
  companyName: string
  companyAddress: string
  companyVAT: string
  companyEmail: string
  bankAccount: string
  bankName: string
  timeEntries: string[] // Array of timeEntry IDs
  subtotal: number
  taxRate: number
  taxAmount: number
  total: number
  currency: string
  status: 'draft' | 'sent' | 'paid'
  createdAt: Timestamp
  updatedAt: Timestamp
} 