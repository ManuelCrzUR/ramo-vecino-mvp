'use client'

import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MOCK_BAKERIES, MOCK_BAKE_EVENTS } from '@/lib/mockData'
import { useGeolocation } from '@/hooks/useGeolocation'
import { Bakery } from '@/types'
import Link from 'next/link'

const redIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCAzMiA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzIiIGhlaWdodD0iNDgiIHJ4PSI0IiBmaWxsPSIjRTMwNjEzIi8+PHRleHQgeD0iMTYiIHk9IjI4IiBmb250LXNpemU9IjI0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSI+sPCdmoK8PC90ZXh0Pjwvc3ZnPg==',
  iconSize: [32, 48],
  iconAnchor: [16, 48],
  popupAnchor: [0, -48],
})

export default function MapViewContent({
  bakeries,
  events,
}: {
  bakeries: Bakery[]
  events: any[]
}) {
  const mapRef = useRef<L.Map | null>(null)
  const [activeSheet, setActiveSheet] = useState(false)
  const [selectedBakery, setSelectedBakery] = useState<Bakery | null>(null)
  const { coords, loading } = useGeolocation()

  useEffect(() => {
    if (!mapRef.current) {
      const map = L.map('map').setView(coords, 13)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
        maxZoom: 19,
      }).addTo(map)

      // User location
      L.circleMarker(coords, {
        radius: 8,
        fillColor: '#0099FF',
        color: '#fff',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8,
      }).addTo(map)

      mapRef.current = map
    }

    mapRef.current.setView(coords, 13)
  }, [coords])

  useEffect(() => {
    if (!mapRef.current) return

    bakeries.forEach((bakery) => {
      const recentEvent = events.find((e) => e.bakeryId === bakery.id)
      const minutesAgo = recentEvent
        ? Math.floor((Date.now() - new Date(recentEvent.bakedAt).getTime()) / 60000)
        : null

      const isRecent = minutesAgo && minutesAgo < 30

      const marker = L.marker([bakery.lat, bakery.lng], { icon: redIcon })
        .bindPopup(`
          <div class="p-2">
            <h3 class="font-bold text-sm">${bakery.name}</h3>
            ${minutesAgo !== null ? `<p class="text-xs text-orange-500">⏱️ Hace ${minutesAgo} min</p>` : ''}
            <p class="text-xs">⭐ ${bakery.rating}</p>
          </div>
        `)
        .addTo(mapRef.current!)

      if (isRecent) {
        const pulseCircle = L.circleMarker([bakery.lat, bakery.lng], {
          radius: 25,
          fillColor: '#E30613',
          color: '#E30613',
          weight: 1,
          opacity: 0.3,
          fillOpacity: 0.2,
        }).addTo(mapRef.current!)

        // Pulse animation via CSS keyframes
      }
    })
  }, [bakeries, events])

  const baketeriesSorted = [...bakeries].sort((a, b) => {
    const distA = Math.sqrt((a.lat - coords[0]) ** 2 + (a.lng - coords[1]) ** 2)
    const distB = Math.sqrt((b.lat - coords[0]) ** 2 + (b.lng - coords[1]) ** 2)
    return distA - distB
  })

  return (
    <>
      <style>{`
        @keyframes pulse {
          0%, 100% { r: 20px; }
          50% { r: 30px; }
        }
      `}</style>

      <div className="h-[calc(100vh-64px)] relative">
        <div id="map" className="w-full h-full" />

        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-96 overflow-y-auto shadow-lg">
          <div className="p-4 sticky top-0 bg-white border-b border-ramo-grayBorder">
            <h2 className="font-bold text-lg text-ramo-grayDark">Panaderías cerca</h2>
          </div>

          <div className="p-4 space-y-2">
            {baketeriesSorted.map((bakery) => {
              const recentEvent = events.find((e) => e.bakeryId === bakery.id)
              const minutesAgo = recentEvent
                ? Math.floor((Date.now() - new Date(recentEvent.bakedAt).getTime()) / 60000)
                : null

              return (
                <Link
                  key={bakery.id}
                  href={`/cliente/panaderia/${bakery.id}`}
                  className="block p-3 rounded-lg border border-ramo-grayBorder hover:bg-ramo-grayLight transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-ramo-grayDark">{bakery.name}</h3>
                      <p className="text-xs text-ramo-grayDark">{bakery.address}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-ramo-blue">⭐ {bakery.rating}</p>
                      {minutesAgo !== null && minutesAgo < 30 && (
                        <p className="text-xs text-ramo-alert">🔥 Hace {minutesAgo}m</p>
                      )}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
