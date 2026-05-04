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
          <Image
            src="/ramo-logo.png"
            alt="Ramo Vecino"
            width={60}
            height={60}
            className="h-16 w-auto mx-auto"
          />
          <h1 className="text-4xl font-bold text-white">Inicia sesión</h1>
          <p className="text-white/80">Accede a tu cuenta de Ramo Vecino</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Role Selector */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-white">¿Cuál es tu rol?</label>
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
                    : 'bg-white/20 border-white/40 text-white hover:bg-white/30 hover:border-white/60'
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
                    : 'bg-white/20 border-white/40 text-white hover:bg-white/30 hover:border-white/60'
                }`}
              >
                <ChefHat size={18} />
                Panadero
              </motion.button>
            </div>
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-white">Email</label>
            <Input
              type="email"
              placeholder="tu@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="rounded-lg border-2 border-white/30 bg-white/10 text-white placeholder:text-white/50 focus:border-white/60 focus:ring-0"
            />
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-white">Contraseña</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="rounded-lg border-2 border-white/30 bg-white/10 text-white placeholder:text-white/50 focus:border-white/60 focus:ring-0"
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
            className={`w-full py-6 font-bold rounded-xl transition-all text-white ${
              role === 'cliente'
                ? 'bg-ramo-yellow hover:bg-yellow-500 text-ramo-dark'
                : 'bg-ramo-red hover:bg-red-700'
            }`}
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>

        {/* Demo Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/30"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-3 text-white/70 text-xs font-medium uppercase" style={{ backgroundColor: '#7BC3ED' }}>
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
            className="py-3 px-4 bg-white/20 border-2 border-white/40 rounded-lg font-bold text-white hover:bg-white/30 hover:border-white/60 transition-all flex items-center justify-center gap-2"
          >
            <User size={16} />
            Demo
          </motion.button>
          <motion.button
            type="button"
            onClick={() => handleDemoLogin('panadero')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="py-3 px-4 bg-white/20 border-2 border-white/40 rounded-lg font-bold text-white hover:bg-white/30 hover:border-white/60 transition-all flex items-center justify-center gap-2"
          >
            <ChefHat size={16} />
            Demo
          </motion.button>
        </div>

        {/* Hint */}
        <p className="text-center text-xs text-white/60 font-medium mt-6">
          Ambas cuentas usan: demo123
        </p>
      </motion.div>
    </div>
  )
}
