import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from './config'
import type { TimeEntry } from '@/types/time-tracking'

export async function getProjectTimeEntries(userId: string, projectId: string): Promise<TimeEntry[]> {
  const timeEntriesRef = collection(db, 'timeEntries')
  const q = query(
    timeEntriesRef,
    where('userId', '==', userId),
    where('projectId', '==', projectId)
  )

  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as TimeEntry[]
} 