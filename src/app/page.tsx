'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
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
    }, 2500)

    return () => clearTimeout(timer)
  }, [user, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-ramo-yellow via-ramo-cream to-white relative overflow-hidden">
      {/* Animated background shapes */}
      <motion.div
        className="absolute top-10 right-10 w-40 h-40 rounded-full bg-ramo-yellow/10 blur-3xl"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-10 left-10 w-40 h-40 rounded-full bg-ramo-red/10 blur-3xl"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center z-10 px-6"
      >
        {/* Logo */}
        <motion.div
          className="mb-8 inline-block"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <Image
            src="/ramo-logo.png"
            alt="Ramo Vecino"
            width={100}
            height={100}
            className="h-24 w-auto"
          />
        </motion.div>

        <motion.h1
          className="text-5xl font-bold text-ramo-dark mb-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Ramo Vecino
        </motion.h1>

        <motion.p
          className="text-ramo-gray text-lg font-medium"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Pan fresco, en tu barrio
        </motion.p>

        {/* Loading dots */}
        <motion.div
          className="flex justify-center gap-2 mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-ramo-yellow"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}
