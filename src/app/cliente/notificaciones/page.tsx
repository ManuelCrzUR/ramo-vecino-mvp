'use client'

import { MOCK_BAKE_EVENTS, MOCK_BAKERIES } from '@/lib/mockData'

export default function NotificacionesPage() {
  const sortedEvents = [...MOCK_BAKE_EVENTS].sort(
    (a, b) => new Date(b.bakedAt).getTime() - new Date(a.bakedAt).getTime()
  )

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-ramo-grayDark mb-6">Hornadas Recientes</h1>

      {sortedEvents.map((event) => {
        const bakery = MOCK_BAKERIES[event.bakeryId]
        const minutesAgo = Math.floor((Date.now() - new Date(event.bakedAt).getTime()) / 60000)

        return (
          <div
            key={event.id}
            className="bg-white border-l-4 border-ramo-alert rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex gap-4">
              <div className="text-3xl">🔥</div>
              <div className="flex-1">
                <h3 className="font-bold text-ramo-grayDark">{bakery?.name}</h3>
                <p className="text-sm text-ramo-grayDark mt-1">
                  Acaban de hornear {event.product}
                </p>
                <p className="text-xs text-ramo-grayDark mt-2">
                  ⏱️ Hace {minutesAgo} minutos
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
