import { 
    collection, 
    query, 
    where, 
    addDoc, 
    updateDoc, 
    deleteDoc,
    doc,
    getDocs,
    Timestamp,
    orderBy
  } from 'firebase/firestore'
  import { db } from '../firebase/config'
  import type { TimeEntry } from './types'
  
  export const timeEntriesCollection = collection(db, 'timeEntries')
  
  export async function getTimeEntries(userId: string): Promise<TimeEntry[]> {
    const q = query(
      timeEntriesCollection,
      where('userId', '==', userId),
      orderBy('startTime', 'desc')
    )
  
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      startTime: (doc.data().startTime as Timestamp).toDate(),
      endTime: doc.data().endTime ? (doc.data().endTime as Timestamp).toDate() : null,
      createdAt: (doc.data().createdAt as Timestamp).toDate(),
      updatedAt: (doc.data().updatedAt as Timestamp).toDate(),
    })) as TimeEntry[]
  }
  
  export async function addTimeEntry(entry: Omit<TimeEntry, 'id'>): Promise<string> {
    const docRef = await addDoc(timeEntriesCollection, {
      ...entry,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })
    return docRef.id
  }
  
  export async function updateTimeEntry(id: string, entry: Partial<TimeEntry>): Promise<void> {
    const docRef = doc(timeEntriesCollection, id)
    await updateDoc(docRef, {
      ...entry,
      updatedAt: Timestamp.now(),
    })
  }
  
  export async function deleteTimeEntry(id: string): Promise<void> {
    const docRef = doc(timeEntriesCollection, id)
    await deleteDoc(docRef)
  }
  
  