'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/lib/store'
import { Button } from '@/components/ui/button'

export default function OnboardingPage() {
  const router = useRouter()
  const setUser = useUser((state) => state.setUser)
  const [selected, setSelected] = useState<'cliente' | 'panadero' | null>(null)

  const handleSelect = (role: 'cliente' | 'panadero') => {
    setSelected(role)
    setTimeout(() => {
      router.push('/login')
    }, 300)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-ramo-grayDark mb-2">Ramo Vecino</h1>
          <p className="text-ramo-grayDark text-lg">¿Quién eres?</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => handleSelect('cliente')}
            className={`w-full p-6 rounded-lg border-2 transition-all ${
              selected === 'cliente'
                ? 'bg-ramo-blue border-ramo-blue'
                : 'bg-white border-ramo-blue hover:bg-blue-50'
            }`}
          >
            <div className="text-center">
              <div className="text-3xl mb-2">👤</div>
              <h3 className={`text-lg font-bold ${selected === 'cliente' ? 'text-white' : 'text-ramo-blue'}`}>
                Soy Cliente
              </h3>
              <p className={`text-sm mt-1 ${selected === 'cliente' ? 'text-blue-100' : 'text-ramo-grayDark'}`}>
                Busco pan fresco cerca de mí
              </p>
            </div>
          </button>

          <button
            onClick={() => handleSelect('panadero')}
            className={`w-full p-6 rounded-lg border-2 transition-all ${
              selected === 'panadero'
                ? 'bg-ramo-red border-ramo-red'
                : 'bg-white border-ramo-red hover:bg-red-50'
            }`}
          >
            <div className="text-center">
              <div className="text-3xl mb-2">👨‍🍳</div>
              <h3 className={`text-lg font-bold ${selected === 'panadero' ? 'text-white' : 'text-ramo-red'}`}>
                Soy Panadero
              </h3>
              <p className={`text-sm mt-1 ${selected === 'panadero' ? 'text-red-100' : 'text-ramo-grayDark'}`}>
                Gestiono mi panadería
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
