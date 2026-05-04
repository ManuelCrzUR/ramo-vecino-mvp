'use client'

import { MOCK_BAKERIES } from '@/lib/mockData'
import { useUser } from '@/lib/store'
import Link from 'next/link'
import { Star } from 'lucide-react'

export default function FavoritosPage() {
  const user = useUser((state) => state.user)
  const favorites = user?.favorites || []
  const favBakeries = favorites
    .map((id) => MOCK_BAKERIES[id])
    .filter(Boolean)

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-white mb-6">Mis Favoritas</h1>

      {favBakeries.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-white/80">No tienes panaderías favoritas aún</p>
          <p className="text-sm text-white/60 mt-2">
            Agrega tus panaderías favoritas desde el mapa
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {favBakeries.map((bakery) => (
            <Link
              key={bakery.id}
              href={`/cliente/panaderia/${bakery.id}`}
              className="block border border-white/20 bg-white/10 backdrop-blur-md rounded-lg p-4 hover:bg-white/20 transition-all"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-white">{bakery.name}</h3>
                  <p className="text-xs text-white/70 mt-1">{bakery.address}</p>
                </div>
                <div className="flex items-center gap-1 font-bold text-yellow-300">
                  <Star size={16} fill="currentColor" />
                  {bakery.rating}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
