import { db } from './config'
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  setDoc,
  query,
  where,
} from 'firebase/firestore'
import type { TimeEntry, TimeEntryInput, RateSettings } from '@/types/time-tracking'

export const timeTrackingService = {
  getUserTimeEntries: async (userId: string): Promise<TimeEntry[]> => {
    const entriesRef = collection(db, 'users', userId, 'timeEntries')
    const snapshot = await getDocs(entriesRef)
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as TimeEntry))
  },

  getTimeEntries: async (userId: string): Promise<TimeEntry[]> => {
    return timeTrackingService.getUserTimeEntries(userId)
  },

  async addTimeEntry(userId: string, entry: TimeEntryInput): Promise<string> {
    const entriesRef = collection(db, 'users', userId, 'timeEntries')
    const docRef = await addDoc(entriesRef, entry)
    return docRef.id
  },

  async updateTimeEntry(userId: string, id: string, entry: Partial<TimeEntry>): Promise<void> {
    const entryRef = doc(db, 'users', userId, 'timeEntries', id)
    await updateDoc(entryRef, entry)
  },

  async deleteTimeEntry(userId: string, id: string): Promise<void> {
    const entryRef = doc(db, 'users', userId, 'timeEntries', id)
    await deleteDoc(entryRef)
  },

  async getUserSettings(userId: string): Promise<RateSettings> {
    const settingsRef = doc(db, 'users', userId, 'settings', 'default')
    const settingsDoc = await getDoc(settingsRef)
    
    if (!settingsDoc.exists()) {
      // Create default settings if they don't exist
      const defaultSettings: RateSettings = {
        hourlyRate: 0,
        currency: 'EUR'
      }
      await setDoc(settingsRef, defaultSettings)
      return defaultSettings
    }
    
    return settingsDoc.data() as RateSettings
  },

  async updateUserSettings(userId: string, settings: RateSettings): Promise<void> {
    const settingsRef = doc(db, 'users', userId, 'settings', 'default')
    await setDoc(settingsRef, settings)
  }
} 