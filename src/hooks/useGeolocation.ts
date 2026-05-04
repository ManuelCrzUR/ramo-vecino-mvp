'use client'

import { useEffect, useState } from 'react'

export function useGeolocation() {
  const [coords, setCoords] = useState<[number, number]>([4.65, -74.06])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!navigator.geolocation) {
      setCoords([4.65, -74.06])
      setLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords([position.coords.latitude, position.coords.longitude])
        setLoading(false)
      },
      (err) => {
        console.warn('Geolocation error:', err)
        setCoords([4.65, -74.06])
        setLoading(false)
      },
      { timeout: 5000, enableHighAccuracy: false }
    )
  }, [])

  return { coords, loading }
}
