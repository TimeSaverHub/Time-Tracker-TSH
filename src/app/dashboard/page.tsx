"use client"

import { DashboardHeader } from "@/components/dashboard/header"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        {/* We'll add the time tracker back step by step */}
      </main>
    </div>
  )
}

