import { NavBar } from '@/components/nav-bar'
import { Footer } from '@/components/footer'

export default function InvoicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1 py-6">{children}</main>
      <Footer />
    </div>
  )
} 