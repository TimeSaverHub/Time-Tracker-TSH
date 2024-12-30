'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  User as FirebaseUser,
  AuthError
} from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db } from '@/firebase/firebase'

interface User {
  id: string
  email: string | null
  name: string | null
  photoURL?: string | null
}

interface AuthContextType {
  currentUser: User | null
  loading: boolean
  error: string | null
  signIn: (email: string, password: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  signUp: (email: string, password: string, name: string) => Promise<void>
  signOut: () => Promise<void>
  clearError: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

async function createUserDocument(user: FirebaseUser, additionalData?: { name?: string }) {
  if (!user) return

  const userRef = doc(db, 'users', user.uid)
  const snapshot = await getDoc(userRef)

  if (!snapshot.exists()) {
    const { email, photoURL, displayName } = user
    const createdAt = new Date()

    try {
      await setDoc(userRef, {
        email,
        photoURL,
        name: additionalData?.name || displayName || email?.split('@')[0],
        createdAt,
        updatedAt: createdAt
      })
    } catch (error) {
      console.error('Error creating user document:', error)
      throw new Error('Failed to create user profile')
    }
  }

  return userRef
}

function getErrorMessage(error: AuthError): string {
  switch (error.code) {
    case 'auth/wrong-password':
      return 'Invalid email or password'
    case 'auth/user-not-found':
      return 'No user found with this email'
    case 'auth/email-already-in-use':
      return 'Email already in use'
    case 'auth/weak-password':
      return 'Password should be at least 6 characters'
    default:
      return 'An error occurred. Please try again'
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  // Handle auth state changes
  useEffect(() => {
    let mounted = true

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!mounted) return

      try {
        if (user) {
          const userDoc = await getDoc(doc(db, 'users', user.uid))
          const userData = {
            id: user.uid,
            email: user.email,
            name: userDoc.exists() ? userDoc.data().name : user.displayName,
            photoURL: user.photoURL
          }
          setCurrentUser(userData)
        } else {
          setCurrentUser(null)
        }
      } catch (e) {
        console.error('Error in auth state change:', e)
        setError(e instanceof Error ? e.message : 'Authentication error')
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    })

    return () => {
      mounted = false
      unsubscribe()
    }
  }, [])

  // Handle navigation based on auth state
  useEffect(() => {
    if (loading || isAuthenticating) return

    const path = window.location.pathname
    if (currentUser) {
      if (path === '/login' || path === '/signup' || path === '/') {
        router.push('/dashboard')
      }
    } else {
      if (path !== '/login' && path !== '/signup') {
        router.push('/login')
      }
    }
  }, [currentUser, loading, isAuthenticating, router])

  const signIn = async (email: string, password: string) => {
    try {
      setError(null)
      setIsAuthenticating(true)
      await signInWithEmailAndPassword(auth, email, password)
      router.push('/dashboard')
    } catch (e) {
      console.error('Sign in error:', e)
      const authError = e as AuthError
      setError(getErrorMessage(authError))
      throw e
    } finally {
      setIsAuthenticating(false)
    }
  }

  const signInWithGoogle = async () => {
    try {
      setError(null)
      setIsAuthenticating(true)
      const provider = new GoogleAuthProvider()
      const { user } = await signInWithPopup(auth, provider)
      await createUserDocument(user)
      router.push('/dashboard')
    } catch (e) {
      const authError = e as AuthError
      setError(getErrorMessage(authError))
      throw e
    } finally {
      setIsAuthenticating(false)
    }
  }

  const signUp = async (email: string, password: string, name: string) => {
    try {
      setError(null)
      setIsAuthenticating(true)
      const { user } = await createUserWithEmailAndPassword(auth, email, password)
      await createUserDocument(user, { name })
      router.push('/dashboard')
    } catch (e) {
      console.error('Signup error:', e)
      const authError = e as AuthError
      setError(getErrorMessage(authError))
      throw e
    } finally {
      setIsAuthenticating(false)
    }
  }

  const signOut = async () => {
    try {
      setIsAuthenticating(true)
      await firebaseSignOut(auth)
      router.push('/login')
    } catch (e) {
      const authError = e as AuthError
      setError(getErrorMessage(authError))
      throw e
    } finally {
      setIsAuthenticating(false)
    }
  }

  const clearError = () => setError(null)

  return (
    <AuthContext.Provider 
      value={{ 
        currentUser, 
        loading: loading || isAuthenticating, 
        error, 
        signIn, 
        signInWithGoogle,
        signUp, 
        signOut,
        clearError
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

