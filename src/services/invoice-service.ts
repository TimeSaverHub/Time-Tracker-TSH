import { db } from '@/firebase/config'
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  Timestamp,
  setDoc,
  collectionGroup,
} from 'firebase/firestore'
import type { InvoiceDetails } from '@/types/invoice'

export async function getInvoices(userId?: string) {
  try {
    if (!userId && process.env.NEXT_PHASE === 'phase-production-build') {
      return []
    }

    if (!userId) {
      throw new Error('User ID is required')
    }

    const invoicesRef = collection(db, 'invoices')
    const q = query(invoicesRef, where('userId', '==', userId))
    const snapshot = await getDocs(q)
    
    const invoices = snapshot.docs.map(doc => {
      const data = doc.data()
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt instanceof Timestamp ? 
          data.createdAt.toDate().toISOString() : 
          new Date().toISOString(),
        updatedAt: data.updatedAt instanceof Timestamp ? 
          data.updatedAt.toDate().toISOString() : 
          new Date().toISOString(),
      }
    }) as InvoiceDetails[]

    // Sort manually on the client side
    return invoices.sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt) : new Date()
      const dateB = b.createdAt ? new Date(b.createdAt) : new Date()
      return dateB.getTime() - dateA.getTime()
    })
  } catch (error) {
    console.error('Error getting invoices:', error)
    return []
  }
}

export const getInvoice = async (id: string): Promise<InvoiceDetails> => {
  try {
    const invoiceRef = doc(db, 'invoices', id)
    const invoiceSnap = await getDoc(invoiceRef)
    
    if (!invoiceSnap.exists()) {
      throw new Error('Invoice not found')
    }

    const data = invoiceSnap.data()
    const userId = data.userId

    // Get user profile for settings
    const userRef = doc(db, 'users', userId)
    const userSnap = await getDoc(userRef)
    
    if (!userSnap.exists()) {
      throw new Error('User profile not found')
    }

    const userProfile = userSnap.data()

    // Convert Timestamps to ISO strings
    const createdAt = data.createdAt instanceof Timestamp ? 
      data.createdAt.toDate().toISOString() : 
      new Date().toISOString()
    
    const updatedAt = data.updatedAt instanceof Timestamp ? 
      data.updatedAt.toDate().toISOString() : 
      new Date().toISOString()

    // Convert time entries dates
    const timeEntries = (data.timeEntries || []).map((entry: any) => ({
      ...entry,
      date: entry.date instanceof Timestamp ? 
        entry.date.toDate().toISOString().split('T')[0] : 
        typeof entry.date === 'string' ? entry.date : 
        new Date().toISOString().split('T')[0],
    }))

    // Merge invoice data with user profile settings
    return {
      id: invoiceSnap.id,
      ...userProfile.settings, // Default company/bank details
      ...data,
      createdAt,
      updatedAt,
      timeEntries,
      // Ensure required fields have defaults
      currency: data.currency || userProfile.settings?.currency || 'EUR',
      status: data.status || 'draft',
      taxRate: data.taxRate || userProfile.settings?.taxRate || 0,
      hourlyRate: data.hourlyRate || userProfile.settings?.hourlyRate || 0,
      notes: data.notes || '',
    } as InvoiceDetails
  } catch (error) {
    console.error('Error getting invoice:', error)
    throw error
  }
}

// Create a test invoice for development
export const createTestInvoice = async (userId: string): Promise<string> => {
  console.log('Creating test invoice for user:', userId)
  
  try {
    // Get user profile for default settings
    const userRef = doc(db, 'users', userId)
    const userSnap = await getDoc(userRef)
    
    if (!userSnap.exists()) {
      throw new Error('User profile not found')
    }

    const userProfile = userSnap.data()
    const invoicesRef = collection(db, 'invoices')
    
    const testInvoice = {
      userId,
      invoiceNumber: generateInvoiceNumber(),
      date: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      projectId: 'test-project',
      clientName: 'Test Client',
      clientAddress: 'Test Address',
      clientEmail: 'test@example.com',
      clientVAT: 'TEST123',
      companyName: userProfile.settings?.companyName || 'Your Company',
      companyAddress: userProfile.settings?.companyAddress || 'Your Address',
      companyVAT: userProfile.settings?.companyVAT || 'YOUR123',
      companyEmail: userProfile.settings?.companyEmail || 'your@company.com',
      bankAccount: userProfile.settings?.bankAccount || 'NL00BANK0123456789',
      bankName: userProfile.settings?.bankName || 'Test Bank',
      timeEntries: [],
      subtotal: 1000,
      taxRate: 21,
      taxAmount: 210,
      total: 1210,
      currency: userProfile.settings?.currency || 'EUR',
      status: 'draft',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }

    const docRef = await addDoc(invoicesRef, testInvoice)
    console.log('Test invoice created with ID:', docRef.id)
    
    // Return the created invoice
    return docRef.id
  } catch (error) {
    console.error('Error creating test invoice:', error)
    throw error
  }
}

export const createInvoice = async (
  userId: string, 
  data: Omit<InvoiceDetails, 'id' | 'createdAt' | 'updatedAt'>
): Promise<string> => {
  if (!userId) {
    throw new Error('User ID is required')
  }

  try {
    // Get user profile for default settings
    const userRef = doc(db, 'users', userId)
    const userSnap = await getDoc(userRef)
    
    if (!userSnap.exists()) {
      throw new Error('User profile not found')
    }

    const userProfile = userSnap.data()
    const invoicesRef = collection(db, 'invoices')
    
    // Calculate totals based on time entries
    const timeEntries = data.timeEntries || []
    const subtotal = timeEntries.reduce(
      (sum, entry) => sum + (entry.hours * (entry.hourlyRate || data.hourlyRate || 0)),
      0
    )
    const taxAmount = subtotal * ((data.taxRate || 0) / 100)
    const total = subtotal + taxAmount

    // Generate invoice number if not provided
    const invoiceNumber = data.invoiceNumber || generateInvoiceNumber()
    
    // Merge with user profile settings and prepare data
    const invoiceData = {
      ...userProfile.settings, // Default company/bank details
      ...data,
      userId,
      invoiceNumber,
      subtotal,
      taxAmount,
      total,
      timeEntries: timeEntries.map(entry => ({
        id: entry.id,
        date: entry.date,
        description: entry.description,
        hours: entry.hours,
        hourlyRate: entry.hourlyRate || data.hourlyRate,
        projectId: entry.projectId,
      })),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }

    const docRef = await addDoc(invoicesRef, invoiceData)
    return docRef.id
  } catch (error) {
    console.error('Error creating invoice:', error)
    throw new Error('Failed to create invoice. Please try again.')
  }
}

export const updateInvoice = async (
  id: string, 
  data: Partial<InvoiceDetails>
): Promise<void> => {
  if (!id) {
    throw new Error('Invoice ID is required')
  }

  try {
    const invoiceRef = doc(db, 'invoices', id)
    const invoiceSnap = await getDoc(invoiceRef)
    
    if (!invoiceSnap.exists()) {
      throw new Error('Invoice not found')
    }

    const currentData = invoiceSnap.data() as InvoiceDetails

    // Calculate totals based on time entries
    const timeEntries = data.timeEntries || currentData.timeEntries || []
    const hourlyRate = data.hourlyRate || currentData.hourlyRate || 0
    const taxRate = data.taxRate || currentData.taxRate || 0

    const subtotal = timeEntries.reduce(
      (sum, entry) => sum + (entry.hours * (entry.hourlyRate || hourlyRate)),
      0
    )
    const taxAmount = subtotal * (taxRate / 100)
    const total = subtotal + taxAmount

    // Prepare data for update
    const updateData = {
      ...data,
      subtotal,
      taxAmount,
      total,
      timeEntries: timeEntries.map(entry => ({
        id: entry.id,
        date: entry.date,
        description: entry.description,
        hours: entry.hours,
        hourlyRate: entry.hourlyRate || hourlyRate,
        projectId: entry.projectId,
      })),
      updatedAt: serverTimestamp(),
    }

    await updateDoc(invoiceRef, updateData)
  } catch (error) {
    console.error('Error updating invoice:', error)
    throw new Error('Failed to update invoice. Please try again.')
  }
}

export const generateInvoiceNumber = (prefix: string = 'INV'): string => {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `${prefix}-${year}${month}-${random}`
}

export const deleteInvoice = async (id: string): Promise<void> => {
  if (!id) {
    throw new Error('Invoice ID is required')
  }

  try {
    const invoiceRef = doc(db, 'invoices', id)
    await deleteDoc(invoiceRef)
  } catch (error) {
    console.error('Error deleting invoice:', error)
    throw new Error('Failed to delete invoice. Please try again.')
  }
} 