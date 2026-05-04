'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useUser } from '@/lib/store'
import { BottomNavCliente } from '@/components/shared/BottomNavCliente'

export default function ClienteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const user = useUser((state) => state.user)

  useEffect(() => {
    if (!user || user.role !== 'cliente') {
      router.push('/login')
    }
  }, [user, router])

  if (!user || user.role !== 'cliente') {
    return null
  }

  return (
    <div className="min-h-screen bg-ramo-white pb-20">
      <div className="sticky top-0 z-50 bg-gradient-to-r from-ramo-yellow/10 to-transparent border-b-2 border-ramo-yellow/30 backdrop-blur-sm h-16 flex items-center px-4">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 rounded-lg bg-ramo-yellow/20 flex items-center justify-center">
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
            <h1 className="font-poppins font-bold text-ramo-dark text-base leading-none">Ramo Vecino</h1>
            <p className="text-xs text-ramo-gray/70">Pan fresco, en tu barrio</p>
          </div>
        </div>
      </div>
      {children}
      <BottomNavCliente />
    </div>
  )
}
