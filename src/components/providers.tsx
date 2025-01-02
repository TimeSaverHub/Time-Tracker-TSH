'use client'

import { AuthProvider } from '@/context/auth-context'
import { ThemeProvider } from '@/context/theme-provider'
import { LanguageProvider } from '@/context/language-context'
import { ToastProvider } from '@/context/toast-context'
import { Toaster } from '@/components/ui/toaster'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <LanguageProvider>
          <ToastProvider>
            {children}
            <Toaster />
          </ToastProvider>
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  )
} 