'use client'

import { useRouter } from 'next/navigation'
import { useUser } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { LogOut } from 'lucide-react'

export default function PerfilPage() {
  const router = useRouter()
  const user = useUser((state) => state.user)
  const logout = useUser((state) => state.logout)

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-white p-6 space-y-6 pb-24">
      <div className="rounded-xl p-6 border-2 border-ramo-border text-center space-y-4" style={{ backgroundColor: 'rgba(123, 195, 237, 0.15)' }}>
        <Avatar className="w-20 h-20 mx-auto border-4 border-blue-300">
          <AvatarFallback className="bg-blue-200 text-ramo-dark text-2xl font-bold">
            {user?.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div>
          <h2 className="text-2xl font-bold text-ramo-dark">{user?.name}</h2>
          <p className="text-sm text-ramo-gray">{user?.email}</p>
          <p className="text-sm text-ramo-gray">{user?.phone}</p>
        </div>
      </div>

      <div className="rounded-xl p-6 border-2 border-ramo-border space-y-4" style={{ backgroundColor: 'rgba(123, 195, 237, 0.15)' }}>
        <h3 className="font-bold text-ramo-dark">Sellos de Lealtad</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-bold text-orange-500">{user?.loyaltySeals || 0}</p>
            <p className="text-xs text-ramo-gray">Sellos acumulados</p>
          </div>
          <div className="text-4xl">🏆</div>
        </div>
        <p className="text-xs text-ramo-gray">
          Acumula sellos cada vez que compres en panaderías certificadas
        </p>
      </div>

      <div className="pt-4">
        <Button
          onClick={handleLogout}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 flex items-center justify-center gap-2"
        >
          <LogOut size={20} />
          Cerrar Sesión
        </Button>
      </div>
    </div>
  )
}
