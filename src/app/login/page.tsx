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
          <div className="flex justify-center mb-4">
            <Image
              src="/ramo-logo.png"
              alt="Ramo Vecino"
              width={80}
              height={80}
              className="h-24 w-auto"
            />
          </div>
          <h1 className="text-4xl font-bold text-white">Inicia sesión</h1>
          <p className="text-white/80">Accede a tu cuenta de Ramo Vecino</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
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
            className="w-full py-6 font-bold rounded-lg transition-all border-2 text-white"
            style={{
              backgroundColor: '#D10A0A',
              borderColor: 'rgba(255, 255, 255, 0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#b80808';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#D10A0A';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            }}
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </Button>

          {/* Demo Buttons */}
          <div className="pt-2">
            <p className="text-center text-sm text-white/70 font-medium mb-3">O prueba con demo</p>
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                type="button"
                onClick={() => handleDemoLogin('cliente')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="py-3 px-4 bg-white/20 border-2 border-white/40 rounded-lg font-bold text-white hover:bg-white/30 hover:border-white/60 transition-all flex items-center justify-center gap-2"
              >
                <User size={16} />
                Cliente
              </motion.button>
              <motion.button
                type="button"
                onClick={() => handleDemoLogin('panadero')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="py-3 px-4 bg-white/20 border-2 border-white/40 rounded-lg font-bold text-white hover:bg-white/30 hover:border-white/60 transition-all flex items-center justify-center gap-2"
              >
                <ChefHat size={16} />
                Panadero
              </motion.button>
            </div>
          </div>
        </form>

        {/* Hint */}
        <p className="text-center text-xs text-white/60 font-medium mt-4">
          Credenciales: demo123
        </p>
      </motion.div>
    </div>
  )
}
