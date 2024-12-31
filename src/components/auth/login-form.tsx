'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/context/toast-context'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn, signInWithGoogle } = useAuth()
  const { showToast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      console.log('Attempting to sign in with:', email)
      await signIn(email, password)
      console.log('Sign in successful')
      router.push('/dashboard')
    } catch (error) {
      console.error('Sign in failed:', error)
      showToast({
        title: 'Error',
        description: 'Failed to sign in. Please check your credentials.',
        type: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)

    try {
      await signInWithGoogle()
      router.push('/dashboard')
    } catch (error) {
      showToast({
        title: 'Error',
        description: 'Failed to sign in with Google.',
        type: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" disabled={loading} className="w-full">
          Sign In
        </Button>
      </form>

      <Button
        variant="outline"
        className="w-full"
        onClick={handleGoogleSignIn}
        disabled={loading}
      >
        Sign in with Google
      </Button>
    </div>
  )
}

