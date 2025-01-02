'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User, updateProfile, onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { auth } from '@/firebase/config'
import { authService } from '@/lib/auth'
import Cookies from 'js-cookie'
import { initializeUserProfile } from '@/services/database-service'

interface AuthContextType {
  currentUser: User | null
  loading: boolean
  error: string | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, name: string) => Promise<void>
  signOut: () => Promise<void>
  signInWithGoogle: () => Promise<void>
  clearError: () => void
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true,
  error: null,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  signInWithGoogle: async () => {},
  clearError: () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('Auth state changed:', user?.uid)
      if (user) {
        try {
          await initializeUserProfile(user)
          console.log('User profile initialized')
        } catch (error) {
          console.error('Error initializing user profile:', error)
        }
      }
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      setError(null)
      await authService.signIn(email, password)
      router.push('/dashboard')
    } catch (error: any) {
      setError(error.message)
      throw error
    }
  }

  const signUp = async (email: string, password: string, name: string) => {
    try {
      setError(null)
      const user = await authService.signUp(email, password)
      if (user) {
        await updateProfile(user, { displayName: name })
      }
      router.push('/dashboard')
    } catch (error: any) {
      setError(error.message)
      throw error
    }
  }

  const signOut = async () => {
    try {
      await authService.signOut()
      router.push('/login')
    } catch (error: any) {
      setError(error.message)
      throw error
    }
  }

  const signInWithGoogle = async () => {
    try {
      setError(null)
      await authService.signInWithGoogle()
      router.push('/dashboard')
    } catch (error: any) {
      setError(error.message)
      throw error
    }
  }

  const clearError = () => setError(null)

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        error,
        signIn,
        signUp,
        signOut,
        signInWithGoogle,
        clearError,
      }}
    >
      {children}
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

