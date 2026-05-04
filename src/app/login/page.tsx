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
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'cliente' | 'panadero'>('cliente')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const setUser = useUser((state) => state.setUser)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    setTimeout(() => {
      const user = Object.values(MOCK_USERS).find(
        (u) => u.email === email && u.password === password && u.role === role
      )

      if (user) {
        setUser(user)
        router.push(`/${role}`)
      } else {
        setError('Email o contraseña incorrectos')
        setIsLoading(false)
      }
    }, 500)
  }

  const handleDemoLogin = (demoRole: 'cliente' | 'panadero') => {
    if (demoRole === 'cliente') {
      setEmail('cliente@demo.com')
      setPassword('demo123')
      setRole('cliente')
    } else {
      setEmail('panadero@demo.com')
      setPassword('demo123')
      setRole('panadero')
    }
  }

  const roleColor = role === 'cliente' ? 'ramo-yellow' : 'ramo-red'
  const roleTextColor = role === 'cliente' ? 'ramo-dark' : 'white'

  return (
    <div className="min-h-screen bg-gradient-to-b from-ramo-cream via-white to-ramo-cream p-6 flex flex-col items-center justify-center">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-ramo-gray hover:text-ramo-dark transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="text-sm font-medium">Atrás</span>
        </button>

        {/* Header */}
        <div className="text-center mb-10 space-y-3">
          <Image
            src="/ramo-logo.png"
            alt="Ramo Vecino"
            width={60}
            height={60}
            className="h-16 w-auto mx-auto"
          />
          <h1 className="text-4xl font-bold text-ramo-dark">Inicia sesión</h1>
          <p className="text-ramo-gray">Accede a tu cuenta de Ramo Vecino</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Role Selector */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-ramo-dark">¿Cuál es tu rol?</label>
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                type="button"
                onClick={() => {
                  setRole('cliente')
                  setEmail('')
                  setPassword('')
                  setError('')
                }}
                whileHover={{ scale: 1.02 }}
                className={`py-3 px-4 rounded-xl font-medium transition-all border-2 flex items-center justify-center gap-2 ${
                  role === 'cliente'
                    ? 'bg-ramo-yellow border-ramo-yellow text-ramo-dark'
                    : 'bg-white border-ramo-yellow/20 text-ramo-dark hover:border-ramo-yellow/50'
                }`}
              >
                <User size={18} />
                Cliente
              </motion.button>
              <motion.button
                type="button"
                onClick={() => {
                  setRole('panadero')
                  setEmail('')
                  setPassword('')
                  setError('')
                }}
                whileHover={{ scale: 1.02 }}
                className={`py-3 px-4 rounded-xl font-medium transition-all border-2 flex items-center justify-center gap-2 ${
                  role === 'panadero'
                    ? 'bg-ramo-red border-ramo-red text-white'
                    : 'bg-white border-ramo-red/20 text-ramo-dark hover:border-ramo-red/50'
                }`}
              >
                <ChefHat size={18} />
                Panadero
              </motion.button>
            </div>
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-ramo-dark">Email</label>
            <Input
              type="email"
              placeholder="tu@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="rounded-lg border-2 border-ramo-border focus:border-ramo-yellow focus:ring-0"
            />
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-ramo-dark">Contraseña</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="rounded-lg border-2 border-ramo-border focus:border-ramo-yellow focus:ring-0"
            />
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-ramo-red/10 border border-ramo-red/30 rounded-lg text-ramo-red text-sm text-center font-medium"
            >
              {error}
            </motion.div>
          )}

          {/* Login Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className={`w-full py-6 font-bold rounded-lg transition-all ${
              role === 'cliente'
                ? 'bg-ramo-yellow text-ramo-dark hover:bg-yellow-500'
                : 'bg-ramo-red text-white hover:bg-red-700'
            }`}
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>

        {/* Demo Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-ramo-border"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-3 bg-gradient-to-b from-ramo-cream via-white to-ramo-cream text-ramo-gray text-xs font-medium uppercase">
              O prueba con demo
            </span>
          </div>
        </div>

        {/* Demo Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <motion.button
            type="button"
            onClick={() => handleDemoLogin('cliente')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="py-3 px-4 bg-white border-2 border-ramo-yellow/50 rounded-lg font-bold text-ramo-dark hover:border-ramo-yellow transition-all flex items-center justify-center gap-2"
          >
            <User size={16} />
            Demo
          </motion.button>
          <motion.button
            type="button"
            onClick={() => handleDemoLogin('panadero')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="py-3 px-4 bg-white border-2 border-ramo-red/50 rounded-lg font-bold text-ramo-dark hover:border-ramo-red transition-all flex items-center justify-center gap-2"
          >
            <ChefHat size={16} />
            Demo
          </motion.button>
        </div>

        {/* Hint */}
        <p className="text-center text-xs text-ramo-gray/60 font-medium mt-6">
          Ambas cuentas usan: demo123
        </p>
      </motion.div>
    </div>
  )
}
