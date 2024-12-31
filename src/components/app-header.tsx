'use client'

import Image from "next/image"
import { Card } from "@/components/ui/card"

export function AppHeader() {
  return (
    <div className="flex flex-col items-center justify-center w-full mb-6">
      <div className="w-full max-w-[300px] h-[100px] relative mb-2">
        <Image
          src="https://storage.googleapis.com/msgsndr/RY8pWtiv4RpDEJB2qoME/media/6707ab6fe5d4db4b3b206c0b.svg"
          alt="TimeSaverHub Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
      <Card className="w-full p-4 bg-primary/5">
        <h1 className="text-2xl font-bold text-center text-primary">
          Tijdregistratie
        </h1>
        <p className="text-center text-muted-foreground">
          Houd bij hoeveel uren je hebt gewerkt
        </p>
      </Card>
    </div>
  )
} 