'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/lib/store'
import { MOCK_USERS } from '@/lib/mockData'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'cliente' | 'panadero'>('cliente')
  const [error, setError] = useState('')
  const setUser = useUser((state) => state.setUser)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const user = Object.values(MOCK_USERS).find(
      (u) => u.email === email && u.password === password && u.role === role
    )

    if (user) {
      setUser(user)
      router.push(`/${role}`)
    } else {
      setError('Email o contraseña incorrectos')
    }
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-ramo-grayDark mb-2">Ramo Vecino</h1>
          <p className="text-ramo-grayDark text-lg">Inicia sesión</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ramo-grayDark mb-2">
              Tipo de usuario
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setRole('cliente')
                  setEmail('')
                  setPassword('')
                }}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                  role === 'cliente'
                    ? 'bg-ramo-blue text-white'
                    : 'bg-ramo-grayLight text-ramo-grayDark hover:bg-gray-200'
                }`}
              >
                Cliente
              </button>
              <button
                type="button"
                onClick={() => {
                  setRole('panadero')
                  setEmail('')
                  setPassword('')
                }}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                  role === 'panadero'
                    ? 'bg-ramo-red text-white'
                    : 'bg-ramo-grayLight text-ramo-grayDark hover:bg-gray-200'
                }`}
              >
                Panadero
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-ramo-grayDark mb-2">
              Email
            </label>
            <Input
              type="email"
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ramo-grayDark mb-2">
              Contraseña
            </label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="text-ramo-red text-sm text-center">{error}</div>}

          <Button
            type="submit"
            className={`w-full font-bold py-6 ${
              role === 'cliente'
                ? 'bg-ramo-blue hover:bg-blue-600'
                : 'bg-ramo-red hover:bg-red-700'
            }`}
          >
            Entrar
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-ramo-grayBorder"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-ramo-grayDark">O usa demo</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            type="button"
            onClick={() => handleDemoLogin('cliente')}
            variant="outline"
            className="flex-1"
          >
            Demo Cliente
          </Button>
          <Button
            type="button"
            onClick={() => handleDemoLogin('panadero')}
            variant="outline"
            className="flex-1"
          >
            Demo Panadero
          </Button>
        </div>
      </div>
    </div>
  )
}
