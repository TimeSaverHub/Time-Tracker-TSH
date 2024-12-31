'use client'

import { SignUpForm } from '@/components/auth/signup-form'

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Create an account</h2>
          <p className="mt-2 text-gray-600">Start tracking your time today</p>
        </div>
        <SignUpForm />
      </div>
    </div>
  )
}

