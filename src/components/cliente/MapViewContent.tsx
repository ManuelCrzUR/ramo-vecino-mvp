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
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA2NCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48ZmlsdGVyIGlkPSJzaGFkb3ciIHg9Ii01MCUiIHk9Ii01MCUiIHdpZHRoPSIyMDAlIiBoZWlnaHQ9IjIwMCUiPjxmZURyb3BTaGFkb3cgZHg9IjAiIGR5PSI0IiBzdGREZXZpYXRpb249IjQiIGZsb29kLW9wYWNpdHk9IjAuNCIvPjwvZmlsdGVyPjwvZGVmcz48cGF0aCBkPSJNMzIgMEM0OS43IDAgNjQgMTQuMyA2NCAzMmMwIDE4LTMyIDQ4LTMyIDQ4cy0zMi0zMC0zMi00OEMwIDE0LjMgMTQuMyAwIDMyIDBaIiBmaWxsPSIjRkZENzAwIiBmaWx0ZXI9InVybCgjc2hhZG93KSIgc3Ryb2tlPSIjRTMwNjEzIiBzdHJva2Utd2lkdGg9IjMiLz48Y2lyY2xlIGN4PSIzMiIgY3k9IjI4IiByPSIxNiIgZmlsbD0iI0UzMDYxMyIvPjxjaXJjbGUgY3g9IjMyIiBjeT0iMjgiIHI9IjEyIiBmaWxsPSIjRkZENzAwIi8+PC9zdmc+',
  iconSize: [64, 80],
  iconAnchor: [32, 80],
  popupAnchor: [0, -80],
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

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap contributors © CARTO',
        maxZoom: 19,
        subdomains: 'abcd',
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

      const popupContent = `
        <div style="min-width: 200px; padding: 0;">
          <div style="background: linear-gradient(135deg, #FFD700 0%, #E30613 100%); color: white; padding: 12px; border-radius: 8px 8px 0 0;">
            <div style="font-weight: bold; font-size: 14px;">${bakery.name}</div>
            <div style="font-size: 12px; margin-top: 4px; opacity: 0.9;">${bakery.address}</div>
          </div>
          <div style="padding: 12px; background: white; border-radius: 0 0 8px 8px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span style="font-size: 12px; color: #6B7280;">Rating:</span>
              <span style="font-weight: bold; color: #FFD700;">⭐ ${bakery.rating}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span style="font-size: 12px; color: #6B7280;">Reseñas:</span>
              <span style="font-weight: bold; color: #1a1a1a;">${bakery.reviewsCount}</span>
            </div>
            ${bakery.isCertified ? '<div style="padding: 6px 10px; background: #10B981; color: white; border-radius: 4px; font-size: 11px; text-align: center; font-weight: bold;">✓ Certificada</div>' : ''}
            ${isRecent ? '<div style="margin-top: 8px; padding: 6px 10px; background: #FEE2E2; color: #E30613; border-radius: 4px; font-size: 11px; text-align: center; font-weight: bold;">🔥 Recién horneado</div>' : ''}
          </div>
        </div>
      `

      const marker = L.marker([bakery.lat, bakery.lng], { icon: customIcon })
        .bindPopup(popupContent, { maxWidth: 220, className: 'ramo-popup' })
        .bindTooltip(`<strong>${bakery.name}</strong>`, {
          permanent: false,
          className: 'ramo-tooltip',
          offset: [0, 0]
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
          filter: brightness(1.02) contrast(1.05);
        }
        .ramo-tooltip .leaflet-tooltip {
          background: white !important;
          border: 2px solid #7BC3ED !important;
          border-radius: 8px !important;
          color: #1a1a1a !important;
          box-shadow: 0 8px 24px rgba(0,0,0,0.12) !important;
          padding: 8px 12px !important;
          font-weight: 600 !important;
        }
        .ramo-tooltip .leaflet-tooltip-bottom::before {
          border-bottom-color: #7BC3ED !important;
        }
        .ramo-popup .leaflet-popup-content-wrapper {
          border-radius: 8px !important;
          box-shadow: 0 8px 24px rgba(0,0,0,0.15) !important;
          border: none !important;
          padding: 0 !important;
        }
        .ramo-popup .leaflet-popup-content {
          margin: 0 !important;
          padding: 0 !important;
          width: 100% !important;
        }
        .ramo-popup .leaflet-popup-tip {
          background: white !important;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1) !important;
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
            className="absolute bottom-0 left-0 right-0 rounded-t-3xl max-h-96 overflow-y-auto shadow-2xl border-t-4 z-30"
            style={{ backgroundColor: '#7BC3ED', borderTopColor: '#7BC3ED' }}
          >
            <div className="p-6 sticky top-0 rounded-t-3xl z-40 border-b-2" style={{ backgroundColor: '#7BC3ED', borderBottomColor: '#6CB4E5' }}>
              <div className="w-10 h-1 rounded-full mx-auto mb-4" style={{ backgroundColor: 'white' }} />
              <h2 className="font-bold text-lg text-white">Panaderías cercanas</h2>
              <p className="text-sm text-white/80 mt-1">{baketeriesSorted.length} panaderías</p>
            </div>

            <div className="p-4 space-y-2 pb-20">
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
                      className="block p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-lg active:scale-95"
                      style={{
                        backgroundColor: 'white',
                        borderColor: 'rgba(255,255,255,0.4)',
                      }}
                    >
                      <div className="flex justify-between items-start gap-3">
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 text-sm">{bakery.name}</h3>
                          <p className="text-xs text-gray-600 mt-1">{bakery.address}</p>
                          {bakery.isCertified && (
                            <p className="text-xs font-bold mt-1" style={{ color: '#7BC3ED' }}>✔ Certificada</p>
                          )}
                        </div>
                        <div className="text-right flex flex-col items-end gap-1">
                          <div className="flex items-center gap-1 text-sm font-bold" style={{ color: '#FF6D2D' }}>
                            <Star size={16} fill="currentColor" />
                            {bakery.rating}
                          </div>
                          {minutesAgo !== null && minutesAgo < 30 && (
                            <div className="flex items-center gap-1 text-xs font-bold animate-pulse" style={{ color: '#FF6D2D' }}>
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
