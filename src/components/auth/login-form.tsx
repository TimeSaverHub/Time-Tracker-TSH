'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/use-auth'
import { LoadingSpinner } from '../shared/loading-spinner'
import { Alert, AlertDescription } from '@/components/ui/alert'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signIn, signInWithGoogle, error, clearError, loading } = useAuth()

  const handleEmailSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    clearError()

    try {
      await signIn(email, password)
    } catch (err) {
      console.error('Login error:', err)
    }
  }

  const handleGoogleSignIn = async () => {
    clearError()

    try {
      await signInWithGoogle()
    } catch (err) {
      // Error is handled in the auth context
      console.error('Google sign-in error:', err)
    }
  }

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <form onSubmit={handleEmailSignIn} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
            className="w-full"
            autoComplete="email"
            disabled={loading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
            className="w-full"
            autoComplete="current-password"
            disabled={loading}
          />
        </div>
        
        <Button
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? <LoadingSpinner /> : 'Sign In'}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={handleGoogleSignIn}
        disabled={loading}
      >
        {loading ? <LoadingSpinner /> : 'Sign in with Google'}
      </Button>

      <div className="text-center text-sm">
        Don&apos;t have an account?{' '}
        <Link href="/signup" className="font-semibold text-primary hover:underline">
          Sign up
        </Link>
      </div>
    </div>
  )
}

