import { db } from './firebase'
import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  setDoc, 
  addDoc,
  deleteDoc,
  Timestamp 
} from 'firebase/firestore'
import type { TimeEntry, TimeEntryInput, RateSettings } from '@/types/time-tracking'

export const timeTrackingService = {
  async getUserTimeEntries(userId: string): Promise<TimeEntry[]> {
    try {
      const entriesRef = collection(db, `users/${userId}/timeEntries`)
      const querySnapshot = await getDocs(entriesRef)
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: (doc.data().createdAt as Timestamp).toDate().toISOString()
      })) as TimeEntry[]
    } catch (error) {
      console.error('Error fetching time entries:', error)
      return []
    }
  },

  async addTimeEntry(userId: string, entry: TimeEntryInput): Promise<string> {
    try {
      const entriesRef = collection(db, `users/${userId}/timeEntries`)
      const docRef = await addDoc(entriesRef, {
        ...entry,
        createdAt: Timestamp.now()
      })
      return docRef.id
    } catch (error) {
      console.error('Error adding time entry:', error)
      throw error
    }
  },

  async deleteTimeEntry(userId: string, entryId: string): Promise<void> {
    try {
      const entryRef = doc(db, `users/${userId}/timeEntries/${entryId}`)
      await deleteDoc(entryRef)
    } catch (error) {
      console.error('Error deleting time entry:', error)
      throw error
    }
  },

  async getUserSettings(userId: string): Promise<RateSettings> {
    try {
      const settingsRef = doc(db, `users/${userId}/settings/default`)
      const settingsDoc = await getDoc(settingsRef)
      
      if (!settingsDoc.exists()) {
        const defaultSettings = {
          hourlyRate: 0,
          currency: 'EUR'
        }
        await setDoc(settingsRef, defaultSettings)
        return defaultSettings
      }

      return settingsDoc.data() as RateSettings
    } catch (error) {
      console.error('Error fetching settings:', error)
      return {
        hourlyRate: 0,
        currency: 'EUR'
      }
    }
  },

  async updateUserSettings(userId: string, settings: RateSettings): Promise<void> {
    try {
      const settingsRef = doc(db, `users/${userId}/settings/default`)
      await setDoc(settingsRef, settings)
    } catch (error) {
      console.error('Error updating settings:', error)
      throw error
    }
  }
} 