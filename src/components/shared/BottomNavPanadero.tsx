'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BarChart3, Package, TrendingUp, BookOpen, Award } from 'lucide-react'

export function BottomNavPanadero() {
  const pathname = usePathname()

  const tabs = [
    { href: '/panadero', icon: BarChart3, label: 'Mi Panadería' },
    { href: '/panadero/kits', icon: Package, label: 'Kits' },
    { href: '/panadero/tendencias', icon: TrendingUp, label: 'Tendencias' },
    { href: '/panadero/aprende', icon: BookOpen, label: 'Aprende' },
    { href: '/panadero/certificacion', icon: Award, label: 'Certificación' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-ramo-grayBorder overflow-x-auto">
      <div className="flex justify-around items-center h-20 min-w-max">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href || pathname.startsWith(tab.href + '/')
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center justify-center px-4 h-full gap-1 transition-colors whitespace-nowrap ${
                isActive
                  ? 'text-ramo-red'
                  : 'text-ramo-grayDark hover:text-ramo-red'
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
