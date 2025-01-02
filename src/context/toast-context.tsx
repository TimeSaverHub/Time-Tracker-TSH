'use client'

import { createContext, useContext } from 'react'
import { useToast as useToastHook } from '@/components/ui/use-toast'

interface ToastContextType {
  toast: (props: {
    title: string
    description?: string
    variant?: 'default' | 'destructive'
  }) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const { toast: baseToast } = useToastHook()

  const toast = ({ title, description, variant }: {
    title: string
    description?: string
    variant?: 'default' | 'destructive'
  }) => {
    baseToast({
      title,
      description,
      variant
    })
  }

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
} 