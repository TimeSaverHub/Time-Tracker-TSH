import { auth } from './config'
import { db } from './config'
import { doc, setDoc } from 'firebase/firestore'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User
} from 'firebase/auth'

export const authService = {
  async signUp(email: string, password: string): Promise<User> {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    
    // Create user document
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      email: userCredential.user.email,
      createdAt: new Date().toISOString()
    })

    // Create default settings
    await setDoc(doc(db, 'users', userCredential.user.uid, 'settings', 'default'), {
      hourlyRate: 0,
      currency: 'EUR'
    })

    return userCredential.user
  },

  // ... rest of the service remains the same
} 