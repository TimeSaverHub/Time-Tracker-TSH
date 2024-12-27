import { SignUpForm } from '@/components/auth/signup-form'

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight">
            Create an account
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter your details below to create your account
          </p>
        </div>
        <SignUpForm />
      </div>
    </div>
  )
}