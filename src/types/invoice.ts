import type { TimeEntry } from './time-tracking'

export interface InvoiceDetails {
  id?: string
  invoiceNumber: string
  date: string
  dueDate: string
  projectId: string
  clientName: string
  clientAddress: string
  clientEmail: string
  clientVAT: string
  companyName: string
  companyAddress: string
  companyVAT: string
  companyEmail: string
  bankAccount: string
  bankName: string
  timeEntries: TimeEntry[]
  subtotal: number
  taxRate: number
  taxAmount: number
  total: number
  currency: string
  status: 'draft' | 'sent' | 'paid'
  hourlyRate?: number
  userId?: string
  createdAt?: string
  updatedAt?: string
  notes?: string
}

export interface InvoiceTemplate {
  id: string
  name: string
  content: string
  userId: string
  isDefault?: boolean
}

export interface InvoiceData {
  id?: string
  invoiceNumber: string
  date: string
  dueDate: string
  clientName: string
  clientAddress: string
  clientEmail: string
  clientVAT: string
  companyName: string
  companyAddress: string
  companyVAT: string
  companyEmail: string
  projectId: string
  items: InvoiceItem[]
  notes: string
  terms: string
  status: 'draft' | 'sent' | 'paid'
  currency: string
}

export interface InvoiceItem {
  description: string
  quantity: number
  rate: number
  amount: number
  timeEntryIds?: string[]
}

export interface Invoice extends InvoiceData {
  id: string
  userId: string
  createdAt: string
  updatedAt: string
  total: number
} 