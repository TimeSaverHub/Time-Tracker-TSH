// This tells Next.js to generate a static shell for any ID
export function generateStaticParams() {
  return [{
    id: 'placeholder'
  }]
}

// This tells Next.js that this route segment should be statically generated
export const dynamic = 'error' 