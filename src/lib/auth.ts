import { auth } from '@/firebase/firebase'
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  browserLocalPersistence,
  setPersistence
} from 'firebase/auth'

export const authService = {
  async signIn(email: string, password: string) {
    try {
      await setPersistence(auth, browserLocalPersistence)
      const result = await signInWithEmailAndPassword(auth, email, password)
      return result.user
    } catch (error: any) {
      console.error('Sign in error:', error)
      throw new Error(error.message || 'Failed to sign in')
    }
  },

  async signUp(email: string, password: string) {
    try {
      await setPersistence(auth, browserLocalPersistence)
      const result = await createUserWithEmailAndPassword(auth, email, password)
      return result.user
    } catch (error: any) {
      console.error('Sign up error:', error)
      throw new Error(error.message || 'Failed to sign up')
    }
  },

  async signOut() {
    try {
      await signOut(auth)
    } catch (error: any) {
      console.error('Sign out error:', error)
      throw new Error(error.message || 'Failed to sign out')
    }
  },

  async signInWithGoogle() {
    try {
      await setPersistence(auth, browserLocalPersistence)
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      return result.user
    } catch (error: any) {
      console.error('Google sign in error:', error)
      throw new Error(error.message || 'Failed to sign in with Google')
    }
  }
} 