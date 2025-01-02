'use client'

import { useLanguage } from '@/context/language-context'
import { useAuth } from '@/context/auth-context'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Clock, FileText, LogOut, Globe } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function NavBar() {
  const { t, setLanguage } = useLanguage()
  const { currentUser, signOut } = useAuth()
  const pathname = usePathname()

  const navigation = [
    {
      name: t('timeTracker.title'),
      href: '/dashboard',
      icon: Clock,
      current: pathname === '/dashboard',
    },
    {
      name: t('invoices.title'),
      href: '/invoices',
      icon: FileText,
      current: pathname === '/invoices',
    },
  ]

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold">TimeTracker</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'flex items-center px-3 py-2 rounded-md text-sm font-medium',
                      item.current
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    )}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-sm text-muted-foreground">
              {currentUser?.email}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage('en')}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('nl')}>
                  Nederlands
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => signOut()}
              className="text-muted-foreground hover:text-foreground"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
} 