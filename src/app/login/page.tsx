'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useUser } from '@/lib/store'
import { MOCK_USERS } from '@/lib/mockData'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, User, ChefHat } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const setUser = useUser((state) => state.setUser)

  const handleDemoLogin = (demoRole: 'cliente' | 'panadero') => {
    setIsLoading(true)

    setTimeout(() => {
      let demoEmail = ''
      if (demoRole === 'cliente') {
        demoEmail = 'cliente@demo.com'
      } else {
        demoEmail = 'panadero@demo.com'
      }

      const user = Object.values(MOCK_USERS).find(
        (u) => u.email === demoEmail && u.password === 'demo123' && u.role === demoRole
      )

      if (user) {
        setUser(user)
        router.push(`/${demoRole}`)
      } else {
        setIsLoading(false)
      }
    }, 500)
  }

  return (
    <div className="min-h-screen p-6 flex flex-col items-center justify-center" style={{ backgroundColor: '#7BC3ED' }}>
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-white/70 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="text-sm font-medium">Atrás</span>
        </button>

        {/* Header */}
        <div className="text-center mb-10 space-y-3">
          <div className="flex justify-center mb-4">
            <Image
              src="/ramo-logo.png"
              alt="Ramo Vecino"
              width={120}
              height={120}
              className="h-40 w-auto"
            />
          </div>
          <h1 className="text-4xl font-bold text-white">Inicia sesión</h1>
          <p className="text-white/80">Accede a tu cuenta de Ramo Vecino</p>
        </div>

        {/* Demo Buttons */}
        <div className="space-y-3">
          <motion.button
            onClick={() => handleDemoLogin('cliente')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 px-4 bg-white/20 border-2 border-white/40 rounded-lg font-bold text-white hover:bg-white/30 hover:border-white/60 transition-all flex items-center justify-center gap-2"
          >
            <User size={20} />
            Soy Cliente
          </motion.button>
          <motion.button
            onClick={() => handleDemoLogin('panadero')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 px-4 bg-white/20 border-2 border-white/40 rounded-lg font-bold text-white hover:bg-white/30 hover:border-white/60 transition-all flex items-center justify-center gap-2"
          >
            <ChefHat size={20} />
            Soy Panadero
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}
