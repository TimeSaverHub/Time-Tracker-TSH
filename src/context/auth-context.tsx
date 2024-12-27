'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db } from '@/firebase/config'

interface User {
  id: string
  email: string | null
  name: string | null
}

interface AuthContextType {
  user: User | null
  loading: boolean
  error: Error | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, name: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true)
      try {
        if (firebaseUser) {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))
          if (userDoc.exists()) {
            const userData = {
              id: firebaseUser.uid,
              email: firebaseUser.email,
              name: userDoc.data().name,
            }
            setUser(userData)
            // Set session cookie
            document.cookie = `session=${firebaseUser.uid}; path=/`
          }
        } else {
          setUser(null)
          // Remove session cookie
          document.cookie = 'session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
        }
      } catch (e) {
        setError(e instanceof Error ? e : new Error('An error occurred'))
      } finally {
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (e) {
      setError(e instanceof Error ? e : new Error('Failed to sign in'))
      throw e
    }
  }

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password)
      
      await setDoc(doc(db, 'users', firebaseUser.uid), {
        email,
        name,
        createdAt: new Date(),
      })

      setUser({
        id: firebaseUser.uid,
        email: firebaseUser.email,
        name,
      })
    } catch (e) {
      setError(e instanceof Error ? e : new Error('Failed to sign up'))
      throw e
    }
  }

  const signOut = async () => {
    try {
      await firebaseSignOut(auth)
      setUser(null)
    } catch (e) {
      setError(e instanceof Error ? e : new Error('Failed to sign out'))
      throw e
    }
  }

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        error, 
        signIn, 
        signUp, 
        signOut 
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

