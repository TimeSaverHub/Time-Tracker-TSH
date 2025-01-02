import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  orderBy,
} from 'firebase/firestore'
import { db } from './config'
import type { InvoiceDetails } from '@/types/invoice'

export async function getAllInvoices(userId: string): Promise<InvoiceDetails[]> {
  const invoicesRef = collection(db, 'invoices')
  const q = query(
    invoicesRef,
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  )

  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as InvoiceDetails[]
}

export async function createInvoice(
  userId: string,
  invoice: Omit<InvoiceDetails, 'id' | 'createdAt' | 'updatedAt'>
): Promise<InvoiceDetails> {
  const invoicesRef = collection(db, 'invoices')
  const now = serverTimestamp()
  
  const docRef = await addDoc(invoicesRef, {
    ...invoice,
    userId,
    createdAt: now,
    updatedAt: now,
  })

  return {
    id: docRef.id,
    ...invoice,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

export async function updateInvoice(
  invoiceId: string,
  data: Partial<InvoiceDetails>
): Promise<void> {
  const invoiceRef = doc(db, 'invoices', invoiceId)
  await updateDoc(invoiceRef, {
    ...data,
    updatedAt: serverTimestamp(),
  })
}

export async function deleteInvoice(invoiceId: string): Promise<void> {
  const invoiceRef = doc(db, 'invoices', invoiceId)
  await deleteDoc(invoiceRef)
} 