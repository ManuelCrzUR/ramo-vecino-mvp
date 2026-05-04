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
        router.push('/login')
      }
    }, 2500)

    return () => clearTimeout(timer)
  }, [user, router])

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: '#FF6D2D' }}>
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
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Image
            src="/ramo-logo.png"
            alt="Ramo Vecino"
            width={180}
            height={180}
            className="h-48 w-auto"
          />
        </motion.div>

        <motion.h1
          className="text-6xl font-bold text-white mb-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, ease: 'easeOut' }}
          style={{
            textShadow: `
              -2px -2px 0 #1F6FA8,
              2px -2px 0 #1F6FA8,
              -2px 2px 0 #1F6FA8,
              2px 2px 0 #1F6FA8,
              -2px 0px 0 #1F6FA8,
              2px 0px 0 #1F6FA8,
              0px -2px 0 #1F6FA8,
              0px 2px 0 #1F6FA8
            `,
          }}
        >
          Ramo Vecino
        </motion.h1>

        {/* Loading chocolates */}
        <motion.div
          className="flex justify-center gap-4 mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, ease: 'easeOut' }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -15, 0], opacity: [1, 0.5, 1] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.15,
                ease: 'easeInOut'
              }}
            >
              <Image
                src="/chocoramos.png"
                alt="Loading"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}
