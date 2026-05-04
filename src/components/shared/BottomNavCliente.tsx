'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MapPin, Bell, Heart, User } from 'lucide-react'

export function BottomNavCliente() {
  const pathname = usePathname()

  const tabs = [
    { href: '/cliente', icon: MapPin, label: 'Mapa' },
    { href: '/cliente/notificaciones', icon: Bell, label: 'Notificaciones' },
    { href: '/cliente/favoritos', icon: Heart, label: 'Favoritos' },
    { href: '/cliente/perfil', icon: User, label: 'Perfil' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-ramo-grayBorder">
      <div className="flex justify-around items-center h-20">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
                isActive
                  ? 'text-ramo-blue'
                  : 'text-ramo-grayDark hover:text-ramo-blue'
              }`}
            >
              <tab.icon size={24} />
              <span className="text-xs font-medium">{tab.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
