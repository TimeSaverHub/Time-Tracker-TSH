'use client'

import { useProtectedRoute } from '@/hooks/use-protected-route'
import { DashboardHeader } from '@/components/dashboard/header'
import { LoadingSpinner } from '@/components/shared/loading-spinner'

export default function DashboardPage() {
  const { currentUser, loading } = useProtectedRoute()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (!currentUser) {
    return null // This will never render because useProtectedRoute will redirect
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Welcome, {currentUser.name}!</h1>
        {/* Time tracking functionality will go here */}
      </main>
    </div>
  )
}

