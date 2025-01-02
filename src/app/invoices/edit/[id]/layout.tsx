import { getInvoices } from '@/services/invoice-service'

// Generate static paths for all possible invoice IDs
export async function generateStaticParams() {
  return [{ id: '[id]' }]
}

// Use error instead of force-dynamic
export const dynamic = 'error'

export default function EditInvoiceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 