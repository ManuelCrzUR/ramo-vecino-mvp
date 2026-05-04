'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
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
    <div className="min-h-screen bg-ramo-white pb-20">
      <div className="sticky top-0 z-50 bg-white border-b border-ramo-grayBorder h-16 flex items-center px-4">
        <h1 className="text-xl font-bold text-ramo-red">Ramo Vecino</h1>
      </div>
      {children}
      <BottomNavPanadero />
    </div>
  )
}
