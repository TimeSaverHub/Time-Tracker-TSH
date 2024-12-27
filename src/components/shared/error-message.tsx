import React from 'react'

interface ErrorMessageProps {
  message: string
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="bg-destructive/15 text-destructive px-4 py-2 rounded-md">
      {message}
    </div>
  )
}