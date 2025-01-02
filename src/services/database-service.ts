import { db } from '@/firebase/config'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import type { User } from 'firebase/auth'

interface UserProfile {
  id: string
  email: string
  name: string
  createdAt: string
  settings?: {
    defaultHourlyRate: number
    currency: string
    companyName?: string
    companyAddress?: string
    companyVAT?: string
    companyEmail?: string
    bankName?: string
    bankAccount?: string
  }
}

export const initializeUserProfile = async (user: User): Promise<void> => {
  const userRef = doc(db, 'users', user.uid)
  const userSnap = await getDoc(userRef)

  if (!userSnap.exists()) {
    const userProfile: UserProfile = {
      id: user.uid,
      email: user.email || '',
      name: user.displayName || '',
      createdAt: new Date().toISOString(),
      settings: {
        defaultHourlyRate: 0,
        currency: 'EUR'
      }
    }
    await setDoc(userRef, userProfile)
  }
} 