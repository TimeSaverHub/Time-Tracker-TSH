'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/auth-context'
import { useToast } from '@/context/toast-context'
import { useLanguage } from '@/context/language-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function LoginForm() {
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn, signInWithGoogle } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await signIn(email, password)
      router.push('/dashboard')
    } catch (error) {
      toast({
        title: t('common.error'),
        description: (error as Error).message,
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
      router.push('/dashboard')
    } catch (error) {
      toast({
        title: t('common.error'),
        description: (error as Error).message,
        variant: 'destructive'
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">{t('auth.email')}</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">{t('auth.password')}</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? t('common.loading') : t('auth.signIn')}
      </Button>
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={handleGoogleSignIn}
      >
        Sign in with Google
      </Button>
    </form>
  )
}

