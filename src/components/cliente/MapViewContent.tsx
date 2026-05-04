'use client'

import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MOCK_BAKERIES, MOCK_BAKE_EVENTS } from '@/lib/mockData'
import { useGeolocation } from '@/hooks/useGeolocation'
import { Bakery } from '@/types'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Flame } from 'lucide-react'

const customIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNTYiIHZpZXdCb3g9IjAgMCA0OCA1NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48ZmlsdGVyIGlkPSJzaGFkb3ciIHg9Ii01MCUiIHk9Ii01MCUiIHdpZHRoPSIyMDAliIGhlaWdodD0iMjAwJSI+PGZlRHJvcFNoYWRvdyBkdj0iMiIgc3RkRGV2aWF0aW9uPSIzIiBmbG9vZC1vcGFjaXR5PSIwLjMiIC8+PC9maWx0ZXI+PC9kZWZzPjxyZWN0IHg9IjQiIHk9IjQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcng9IjgiIGZpbGw9IiNGRkQ3MDAiIGZpbHRlcj0idXJsKCNzaGFkb3cpIiBzdHJva2U9IiNFMzA2MTMiIHN0cm9rZS13aWR0aD0iMiIvPjx0ZXh0IHg9IjI0IiB5PSIyOCIgZm9udC1zaXplPSIyNCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzNEMUYwRiI+sPCdmoK8PC90ZXh0Pjwvc3ZnPg==',
  iconSize: [48, 56],
  iconAnchor: [24, 56],
  popupAnchor: [0, -56],
})

const userIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNDIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSI4IiBmaWxsPSIjRkZENzAwIiBzdHJva2U9IiMzRDFGMEYiIHN0cm9rZS13aWR0aD0iMiIvPjwvc3ZnPg==',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
})

export default function MapViewContent({
  bakeries,
  events,
}: {
  bakeries: Bakery[]
  events: any[]
}) {
  const mapRef = useRef<L.Map | null>(null)
  const markersRef = useRef<L.Marker[]>([])
  const [selectedBakery, setSelectedBakery] = useState<Bakery | null>(null)
  const { coords, loading } = useGeolocation()

  useEffect(() => {
    if (!mapRef.current) {
      const map = L.map('map', { zoomControl: false }).setView(coords, 14)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map)

      L.control.zoom({ position: 'topright' }).addTo(map)

      // User location - blue dot with pulse
      const userMarker = L.marker(coords, { icon: userIcon }).addTo(map)
      userMarker.bindTooltip('Tu ubicación', { permanent: false })

      mapRef.current = map
    }

    mapRef.current.setView(coords, 14)
  }, [coords])

  useEffect(() => {
    if (!mapRef.current) return

    // Clear old markers
    markersRef.current.forEach(m => m.remove())
    markersRef.current = []

    bakeries.forEach((bakery) => {
      const recentEvent = events.find((e) => e.bakeryId === bakery.id)
      const minutesAgo = recentEvent
        ? Math.floor((Date.now() - new Date(recentEvent.bakedAt).getTime()) / 60000)
        : null

      const isRecent = minutesAgo && minutesAgo < 30

      const marker = L.marker([bakery.lat, bakery.lng], { icon: customIcon })
        .bindTooltip(`<div style="text-align: center;"><strong>${bakery.name}</strong>${isRecent ? '<br/><span style="color: #E30613; font-weight: bold;">Recién horneado</span>' : ''}</div>`, {
          permanent: false,
          className: 'ramo-tooltip'
        })
        .addTo(mapRef.current!)

      marker.on('click', () => setSelectedBakery(bakery))
      markersRef.current.push(marker)

      if (isRecent) {
        const pulseCircle = L.circleMarker([bakery.lat, bakery.lng], {
          radius: 30,
          fillColor: '#FFD700',
          color: '#E30613',
          weight: 2,
          opacity: 0.8,
          fillOpacity: 0.1,
        }).addTo(mapRef.current!)

        markersRef.current.push(pulseCircle as any)
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
        #map {
          filter: brightness(1.05) contrast(1.1);
        }
        .ramo-tooltip .leaflet-tooltip {
          background: #FFF8E7 !important;
          border: 2px solid #FFD700 !important;
          border-radius: 8px !important;
          color: #3D1F0F !important;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
        }
        .ramo-tooltip .leaflet-tooltip-left::before {
          border-left-color: #FFD700 !important;
        }
        @keyframes mapPulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(255, 215, 0, 0.7);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(255, 215, 0, 0);
          }
        }
      `}</style>

      <div className="relative h-[calc(100vh-64px)] w-full bg-ramo-cream">
        <div id="map" className="w-full h-full rounded-none" />

        {/* Bottom Sheet with Pan Animation */}
        <AnimatePresence>
          <motion.div
            initial={{ y: 300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 300, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-96 overflow-y-auto shadow-2xl border-t-4 border-ramo-yellow"
          >
            <div className="p-6 sticky top-0 bg-white border-b-2 border-ramo-yellow/20 rounded-t-3xl">
              <div className="w-10 h-1 bg-ramo-gray/20 rounded-full mx-auto mb-4" />
              <h2 className="font-bold text-lg text-ramo-dark">Panaderías cercanas</h2>
              <p className="text-sm text-ramo-gray mt-1">{baketeriesSorted.length} panaderías</p>
            </div>

            <div className="p-4 space-y-2 pb-6">
              {baketeriesSorted.map((bakery, idx) => {
                const recentEvent = events.find((e) => e.bakeryId === bakery.id)
                const minutesAgo = recentEvent
                  ? Math.floor((Date.now() - new Date(recentEvent.bakedAt).getTime()) / 60000)
                  : null

                return (
                  <motion.div
                    key={bakery.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link
                      href={`/cliente/panaderia/${bakery.id}`}
                      className="block p-4 rounded-xl bg-gradient-to-r from-ramo-cream to-white border-2 border-ramo-border hover:border-ramo-yellow transition-all duration-300 hover:shadow-lg active:scale-95"
                    >
                      <div className="flex justify-between items-start gap-3">
                        <div className="flex-1">
                          <h3 className="font-bold text-ramo-dark text-sm">{bakery.name}</h3>
                          <p className="text-xs text-ramo-gray mt-1">{bakery.address}</p>
                          {bakery.isCertified && (
                            <p className="text-xs text-ramo-yellow font-bold mt-1">✔ Certificada</p>
                          )}
                        </div>
                        <div className="text-right flex flex-col items-end gap-1">
                          <div className="flex items-center gap-1 text-sm font-bold text-ramo-yellow">
                            <Star size={16} fill="currentColor" />
                            {bakery.rating}
                          </div>
                          {minutesAgo !== null && minutesAgo < 30 && (
                            <div className="flex items-center gap-1 text-xs text-ramo-red font-bold animate-pulse">
                              <Flame size={14} fill="currentColor" />
                              Hace {minutesAgo}m
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  )
}
