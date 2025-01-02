'use client'

import { useLanguage } from '@/context/language-context'

export function LanguageDebug() {
  const { language, t } = useLanguage()

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-sm">
      <p>Current Language: {language}</p>
      <p>Welcome: {t('common.welcome')}</p>
      <p>Title: {t('timeTracker.title')}</p>
    </div>
  )
} 