'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { auth, googleProvider } from '@/firebase/firebase'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { LoadingSpinner } from '../shared/loading-spinner'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleEmailSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push('/dashboard')
    } catch (err) {
      setError('Invalid email or password')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setError(null)
    setIsLoading(true)

    try {
      await signInWithPopup(auth, googleProvider)
      router.push('/dashboard')
    } catch (err) {
      setError('Could not sign in with Google')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
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
          />
        </div>
        {error && (
          <div className="text-sm text-red-500 text-center">
            {error}
          </div>
        )}
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? <LoadingSpinner /> : 'Sign In'}
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
        disabled={isLoading}
      >
        {isLoading ? <LoadingSpinner /> : 'Sign in with Google'}
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

