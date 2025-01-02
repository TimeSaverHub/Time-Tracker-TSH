'use client'

import { useLanguage } from '@/context/language-context'
import Image from 'next/image'
import { Button } from './ui/button'

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setLanguage('en')}
        className={`transition-all ${language === 'en' ? 'ring-2 ring-primary scale-110' : 'opacity-50'}`}
      >
        <Image
          src="/flags/en.svg"
          alt="English"
          width={24}
          height={24}
          className="rounded-sm"
        />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setLanguage('nl')}
        className={`transition-all ${language === 'nl' ? 'ring-2 ring-primary scale-110' : 'opacity-50'}`}
      >
        <Image
          src="/flags/nl.svg"
          alt="Nederlands"
          width={24}
          height={24}
          className="rounded-sm"
        />
      </Button>
    </div>
  )
} 