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
      <h1 className="text-2xl font-bold text-ramo-grayDark mb-6">Mis Favoritas</h1>

      {favBakeries.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-ramo-grayDark">No tienes panaderías favoritas aún</p>
          <p className="text-sm text-ramo-grayDark mt-2">
            Agrega tus panaderías favoritas desde el mapa
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {favBakeries.map((bakery) => (
            <Link
              key={bakery.id}
              href={`/cliente/panaderia/${bakery.id}`}
              className="block border border-ramo-grayBorder rounded-lg p-4 hover:bg-ramo-grayLight transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-ramo-grayDark">{bakery.name}</h3>
                  <p className="text-xs text-ramo-grayDark mt-1">{bakery.address}</p>
                </div>
                <div className="flex items-center gap-1 font-bold text-ramo-yellow">
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
