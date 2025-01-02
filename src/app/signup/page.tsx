'use client'

import { SignupForm } from '@/components/auth/signup-form'
import { useAuth } from '@/context/auth-context'
import { Logo } from '@/components/shared/logo'
import Link from 'next/link'

export default function SignUpPage() {
  const { loading } = useAuth()

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Loading...</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <Logo />
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign up to start tracking your time
          </p>
        </div>
        <SignupForm />
        <div className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link 
            href="/login" 
            className="font-medium text-primary hover:text-primary/80"
          >
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  )
}

