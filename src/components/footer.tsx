'use client'

import { useLanguage } from '@/context/language-context'

export function Footer() {
  const { t } = useLanguage()
  
  return (
    <footer className="border-t py-4 mt-auto">
      <div className="container text-center text-sm text-muted-foreground">
        {t('common.developedBy')}
      </div>
    </footer>
  )
} 