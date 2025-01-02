'use client'

interface DebugPanelProps {
  data: any
}

export function DebugPanel({ data }: DebugPanelProps) {
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-black/80 text-white rounded-lg max-w-md overflow-auto max-h-96">
      <pre className="text-xs">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  )
} 