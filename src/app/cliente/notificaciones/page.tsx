'use client'

import { MOCK_BAKE_EVENTS, MOCK_BAKERIES } from '@/lib/mockData'
import { Flame, Clock } from 'lucide-react'

export default function NotificacionesPage() {
  const sortedEvents = [...MOCK_BAKE_EVENTS].sort(
    (a, b) => new Date(b.bakedAt).getTime() - new Date(a.bakedAt).getTime()
  )

  return (
    <div className="min-h-screen p-6 space-y-4 pb-24" style={{ backgroundColor: '#F7F8FA' }}>
      <h1 className="text-2xl font-bold text-ramo-dark mb-6">Hornadas Recientes</h1>

      {sortedEvents.length === 0 ? (
        <div className="text-center py-12">
          <Flame size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-ramo-gray">No hay hornadas recientes</p>
        </div>
      ) : (
        sortedEvents.map((event) => {
          const bakery = MOCK_BAKERIES[event.bakeryId]
          const minutesAgo = Math.floor((Date.now() - new Date(event.bakedAt).getTime()) / 60000)

          return (
            <div
              key={event.id}
              className="rounded-xl p-4 border-2 border-ramo-border hover:shadow-lg transition-all"
              style={{ backgroundColor: 'rgba(31, 111, 168, 0.1)' }}
            >
              <div className="flex gap-4">
                <div className="flex items-center justify-center w-12 h-12 bg-orange-400/20 rounded-lg flex-shrink-0">
                  <Flame size={24} className="text-orange-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-ramo-dark text-sm">{bakery?.name}</h3>
                  <p className="text-sm text-ramo-gray mt-1">
                    Acaban de hornear <span className="font-semibold">{event.product}</span>
                  </p>
                  <div className="flex items-center gap-1 text-xs text-ramo-gray mt-2">
                    <Clock size={12} />
                    Hace {minutesAgo} minuto{minutesAgo !== 1 ? 's' : ''}
                  </div>
                </div>
              </div>
            </div>
          )
        })
      )}
    </div>
  )
}
