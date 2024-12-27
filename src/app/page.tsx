import { LoginForm } from '@/components/auth/login-form'

export default function HomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter your email below to sign in to your account
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}