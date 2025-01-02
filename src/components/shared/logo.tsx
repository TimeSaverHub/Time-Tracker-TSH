'use client'

import Image from 'next/image'
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex justify-center items-center w-full", className)}>
      <Image
        src="/images/Logo.svg"
        alt="Time Tracker Logo"
        width={80}
        height={80}
        priority
        className="mb-6"
      />
    </div>
  )
} 