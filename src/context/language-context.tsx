'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { translations } from '@/translations'

type Language = 'en' | 'nl'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'nl')) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    console.log('Changing language to:', lang) // Debug log
    setLanguage(lang)
    if (mounted) {
      localStorage.setItem('language', lang)
    }
  }

  const t = (key: string): string => {
    if (!mounted) return key

    const keys = key.split('.')
    let value: any = translations[language]
    
    for (const k of keys) {
      if (value?.[k]) {
        value = value[k]
      } else {
        console.warn(`Translation missing for key: ${key}`)
        return key
      }
    }
    
    return value as string
  }

  if (!mounted) {
    return null // or a loading spinner
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
} 