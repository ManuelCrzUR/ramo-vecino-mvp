'use client'

import dynamic from 'next/dynamic'
import { MOCK_BAKERIES, MOCK_BAKE_EVENTS } from '@/lib/mockData'

const MapViewContent = dynamic(
  () => import('@/components/cliente/MapViewContent'),
  {
    ssr: false,
    loading: () => (
      <div className="h-[calc(100vh-64px)] bg-ramo-grayLight animate-pulse flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-2">📍</div>
          <p className="text-ramo-grayDark">Cargando mapa...</p>
        </div>
      </div>
    ),
  }
)

export function MapView() {
  const bakeries = Object.values(MOCK_BAKERIES)
  const events = MOCK_BAKE_EVENTS

  return <MapViewContent bakeries={bakeries} events={events} />
}
