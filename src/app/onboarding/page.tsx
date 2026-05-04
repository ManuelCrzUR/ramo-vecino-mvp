'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useUser } from '@/lib/store'
import { User, ChefHat } from 'lucide-react'

export default function OnboardingPage() {
  const router = useRouter()
  const [selected, setSelected] = useState<'cliente' | 'panadero' | null>(null)

  const handleSelect = (role: 'cliente' | 'panadero') => {
    setSelected(role)
    setTimeout(() => {
      router.push('/login')
    }, 400)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-ramo-cream p-6 flex flex-col items-center justify-center">
      <motion.div
        className="w-full max-w-md space-y-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div className="text-center space-y-4" variants={itemVariants}>
          <Image
            src="/ramo-logo.png"
            alt="Ramo Vecino"
            width={80}
            height={80}
            className="h-20 w-auto mx-auto"
          />
          <h1 className="text-4xl font-bold text-ramo-dark">Ramo Vecino</h1>
          <p className="text-ramo-gray text-base font-medium">¿Cuál es tu rol?</p>
        </motion.div>

        {/* Role Cards */}
        <motion.div className="space-y-4" variants={itemVariants}>
          {/* Cliente Card */}
          <motion.button
            onClick={() => handleSelect('cliente')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full p-6 rounded-2xl border-2 transition-all duration-300 text-center ${
              selected === 'cliente'
                ? 'bg-ramo-yellow border-ramo-yellow shadow-lg shadow-ramo-yellow/30'
                : 'bg-white border-ramo-yellow/30 hover:border-ramo-yellow'
            }`}
          >
            <div className="space-y-3">
              <motion.div
                className="flex justify-center"
                animate={selected === 'cliente' ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.5 }}
              >
                <User size={48} className={`${selected === 'cliente' ? 'text-ramo-chocolate' : 'text-ramo-yellow'}`} />
              </motion.div>
              <div>
                <h3 className={`text-lg font-bold ${selected === 'cliente' ? 'text-ramo-chocolate' : 'text-ramo-dark'}`}>
                  Soy Cliente
                </h3>
                <p className={`text-sm mt-1 ${selected === 'cliente' ? 'text-ramo-chocolate/70' : 'text-ramo-gray'}`}>
                  Busco pan fresco en mi barrio
                </p>
              </div>
            </div>
          </motion.button>

          {/* Panadero Card */}
          <motion.button
            onClick={() => handleSelect('panadero')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full p-6 rounded-2xl border-2 transition-all duration-300 text-center ${
              selected === 'panadero'
                ? 'bg-ramo-red border-ramo-red shadow-lg shadow-ramo-red/30'
                : 'bg-white border-ramo-red/30 hover:border-ramo-red'
            }`}
          >
            <div className="space-y-3">
              <motion.div
                className="flex justify-center"
                animate={selected === 'panadero' ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.5 }}
              >
                <ChefHat size={48} className={`${selected === 'panadero' ? 'text-white' : 'text-ramo-red'}`} />
              </motion.div>
              <div>
                <h3 className={`text-lg font-bold ${selected === 'panadero' ? 'text-white' : 'text-ramo-dark'}`}>
                  Soy Panadero
                </h3>
                <p className={`text-sm mt-1 ${selected === 'panadero' ? 'text-white/80' : 'text-ramo-gray'}`}>
                  Gestiono mi panadería
                </p>
              </div>
            </div>
          </motion.button>
        </motion.div>

        {/* Hint */}
        <motion.p variants={itemVariants} className="text-center text-xs text-ramo-gray/60 font-medium">
          Puedes cambiar tu rol más tarde
        </motion.p>
      </motion.div>
    </div>
  )
}
