'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '@/firebase/firebase'
import { useRouter } from 'next/navigation'
import { onAuthStateChanged } from 'firebase/auth'
import { authService } from '@/lib/auth'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/firebase/firebase'
import Cookies from 'js-cookie'

interface AuthUser {
  id: string
  email: string | null
  displayName: string | null
}

interface AuthContextType {
  currentUser: AuthUser | null
  loading: boolean
  error: string | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, name: string) => Promise<void>
  signOut: () => Promise<void>
  signInWithGoogle: () => Promise<void>
  clearError: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          setCurrentUser({
            id: user.uid,
            email: user.email,
            displayName: user.displayName
          })
          Cookies.set('firebase-auth-token', user.uid, { expires: 7 })
        } else {
          setCurrentUser(null)
          Cookies.remove('firebase-auth-token')
          router.push('/login')
        }
      } catch (error) {
        console.error('Auth state change error:', error)
      } finally {
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [router])

  const signIn = async (email: string, password: string) => {
    try {
      setError(null)
      setLoading(true)
      await authService.signIn(email, password)
      // Router push is handled by auth state change
    } catch (error: any) {
      console.error('Sign in error:', error)
      setError(error.message)
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const user = await authService.signUp(email, password)
      if (user) {
        await setDoc(doc(db, `users/${user.uid}`), {
          email,
          displayName: name,
          createdAt: new Date().toISOString()
        })
      }
      router.push('/dashboard')
    } catch (error: any) {
      setError(error.message)
    }
  }

  const signOut = async () => {
    try {
      await authService.signOut()
      router.push('/login')
    } catch (error: any) {
      setError(error.message)
    }
  }

  const signInWithGoogle = async () => {
    try {
      const user = await authService.signInWithGoogle()
      if (user) {
        await setDoc(doc(db, `users/${user.uid}`), {
          email: user.email,
          displayName: user.displayName,
          createdAt: new Date().toISOString()
        }, { merge: true })
      }
      router.push('/dashboard')
    } catch (error: any) {
      setError(error.message)
    }
  }

  const clearError = () => setError(null)

  return (
    <AuthContext.Provider value={{
      currentUser,
      loading,
      error,
      signIn,
      signUp,
      signOut,
      signInWithGoogle,
      clearError
    }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

