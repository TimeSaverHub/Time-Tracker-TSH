import { db } from './config'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import type { User } from 'firebase/auth'

export async function initializeUserData(user: User) {
  try {
    // Check if user document exists
    const userDoc = await getDoc(doc(db, 'users', user.uid))
    if (!userDoc.exists()) {
      // Create user document
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        createdAt: new Date().toISOString()
      })
    }

    // Check if settings exist
    const settingsDoc = await getDoc(doc(db, 'users', user.uid, 'settings', 'default'))
    if (!settingsDoc.exists()) {
      // Create default settings
      await setDoc(doc(db, 'users', user.uid, 'settings', 'default'), {
        hourlyRate: 0,
        currency: 'EUR'
      })
    }
  } catch (error) {
    console.error('Error initializing user data:', error)
  }
} 