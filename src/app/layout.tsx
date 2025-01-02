import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { AuthGuard } from '@/components/auth-guard'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Time Tracker',
  description: 'Track your time and projects',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <AuthGuard>{children}</AuthGuard>
        </Providers>
      </body>
    </html>
  )
}

