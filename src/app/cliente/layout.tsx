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
      <div className="sticky top-0 z-50 bg-white border-b border-ramo-grayBorder h-16 flex items-center px-4">
        <Image
          src="/ramo-logo.png"
          alt="Ramo Vecino"
          width={120}
          height={40}
          priority
          className="object-contain"
        />
      </div>
      {children}
      <BottomNavCliente />
    </div>
  )
}
