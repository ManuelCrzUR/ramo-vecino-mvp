'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/lib/store'
import { motion } from 'framer-motion'

export default function SplashPage() {
  const router = useRouter()
  const user = useUser((state) => state.user)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (user) {
        router.push(`/${user.role}`)
      } else {
        router.push('/onboarding')
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [user, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ramo-blue via-ramo-red to-ramo-blue">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <motion.h1
          className="text-6xl font-bold text-white mb-4"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🍞
        </motion.h1>
        <h2 className="text-4xl font-bold text-white">Ramo Vecino</h2>
        <p className="text-white text-lg mt-4">Pan fresco, en tu barrio</p>
      </motion.div>
    </div>
  )
}
