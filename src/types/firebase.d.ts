declare module '@/firebase/timeEntries' {
  import type { TimeEntry } from '@/types/time-tracking'
  
  export function getProjectTimeEntries(userId: string, projectId: string): Promise<TimeEntry[]>
}

declare module '@/firebase/projects' {
  import type { Project } from '@/types/time-tracking'
  
  export function getAllProjects(userId: string): Promise<Project[]>
  export function createProject(
    userId: string,
    project: Omit<Project, 'id'>
  ): Promise<Project>
}

declare module '@/firebase/invoices' {
  import type { InvoiceDetails } from '@/types/invoice'
  
  export function getAllInvoices(userId: string): Promise<InvoiceDetails[]>
  export function createInvoice(
    userId: string,
    invoice: Omit<InvoiceDetails, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<InvoiceDetails>
  export function updateInvoice(
    invoiceId: string,
    data: Partial<InvoiceDetails>
  ): Promise<void>
  export function deleteInvoice(invoiceId: string): Promise<void>
} 