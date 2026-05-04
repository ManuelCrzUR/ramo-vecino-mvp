'use client'

import { MOCK_BAKE_EVENTS, MOCK_BAKERIES } from '@/lib/mockData'
import { Flame, Clock } from 'lucide-react'

export default function NotificacionesPage() {
  const sortedEvents = [...MOCK_BAKE_EVENTS].sort(
    (a, b) => new Date(b.bakedAt).getTime() - new Date(a.bakedAt).getTime()
  )

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-white mb-6">Hornadas Recientes</h1>

      {sortedEvents.map((event) => {
        const bakery = MOCK_BAKERIES[event.bakeryId]
        const minutesAgo = Math.floor((Date.now() - new Date(event.bakedAt).getTime()) / 60000)

        return (
          <div
            key={event.id}
            className="bg-white/10 backdrop-blur-md border-l-4 border-orange-400 rounded-lg p-4 hover:bg-white/20 transition-all"
          >
            <div className="flex gap-4">
              <div className="flex items-center justify-center w-10 h-10 bg-orange-500/20 rounded-lg">
                <Flame size={20} className="text-orange-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-white">{bakery?.name}</h3>
                <p className="text-sm text-white/80 mt-1">
                  Acaban de hornear {event.product}
                </p>
                <div className="flex items-center gap-1 text-xs text-white/60 mt-2">
                  <Clock size={12} />
                  Hace {minutesAgo} minutos
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
