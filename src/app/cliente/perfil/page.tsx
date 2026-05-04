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
    <div className="p-6 space-y-6">
      <div className="bg-white rounded-lg p-6 border border-ramo-grayBorder text-center space-y-4">
        <Avatar className="w-20 h-20 mx-auto border-4 border-ramo-blue">
          <AvatarFallback className="bg-ramo-blue text-white text-2xl font-bold">
            {user?.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div>
          <h2 className="text-2xl font-bold text-ramo-grayDark">{user?.name}</h2>
          <p className="text-sm text-ramo-grayDark">{user?.email}</p>
          <p className="text-sm text-ramo-grayDark">{user?.phone}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 border border-ramo-grayBorder space-y-4">
        <h3 className="font-bold text-ramo-grayDark">Sellos de Lealtad</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-bold text-ramo-blue">{user?.loyaltySeals || 0}</p>
            <p className="text-xs text-ramo-grayDark">Sellos acumulados</p>
          </div>
          <div className="text-4xl">🏆</div>
        </div>
        <p className="text-xs text-ramo-grayDark">
          Acumula sellos cada vez que compres en panaderías certificadas
        </p>
      </div>

      <div className="pt-4">
        <Button
          onClick={handleLogout}
          className="w-full bg-ramo-red hover:bg-red-700 text-white py-6 flex items-center justify-center gap-2"
        >
          <LogOut size={20} />
          Cerrar Sesión
        </Button>
      </div>
    </div>
  )
}
