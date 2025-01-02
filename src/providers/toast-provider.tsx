'use client'

import { Toaster } from 'react-hot-toast'

export function ToastProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster position="top-center" />
      {children}
    </>
  )
} 