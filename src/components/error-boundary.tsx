'use client'

import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-screen items-center justify-center flex-col gap-4">
          <h2 className="text-xl font-semibold">Something went wrong</h2>
          <p className="text-red-500">{this.state.error?.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="text-sm text-blue-500 hover:underline"
          >
            Try again
          </button>
        </div>
      )
    }

    return this.props.children
  }
} 