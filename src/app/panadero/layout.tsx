'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useUser } from '@/lib/store'
import { BottomNavPanadero } from '@/components/shared/BottomNavPanadero'

export default function PanaderoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const user = useUser((state) => state.user)

  useEffect(() => {
    if (!user || user.role !== 'panadero') {
      router.push('/login')
    }
  }, [user, router])

  if (!user || user.role !== 'panadero') {
    return null
  }

  return (
    <div className="min-h-screen pb-20 bg-white">
      <div className="sticky top-0 z-50 h-16 flex items-center px-4" style={{ backgroundColor: '#FFD200' }}>
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 rounded-lg bg-white/20 flex items-center justify-center">
            <Image
              src="/ramo-logo.png"
              alt="Ramo Vecino"
              width={32}
              height={32}
              priority
              className="object-contain"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="font-poppins font-bold text-white text-base leading-none">Ramo Vecino</h1>
            <p className="text-xs text-white/70">Gestiona tu panadería</p>
          </div>
        </div>
      </div>
      {children}
      <BottomNavPanadero />
    </div>
  )
}
