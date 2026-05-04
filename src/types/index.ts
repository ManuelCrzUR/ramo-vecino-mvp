export interface User {
  id: string
  email: string
  password: string
  role: 'cliente' | 'panadero'
  name: string
  phone?: string
  bakeryId?: string
  favorites?: string[]
  loyaltySeals?: number
}

export interface Bakery {
  id: string
  name: string
  ownerId?: string
  address: string
  lat: number
  lng: number
  rating: number
  reviewsCount: number
  isCertified: boolean
  availableProducts: string[]
  isActive: boolean
  phone?: string
}

export interface BakeEvent {
  id: string
  bakeryId: string
  product: string
  bakedAt: Date
}

export interface Product {
  id: string
  name: string
  price: number
  description: string
}

export interface Combo {
  id: string
  name: string
  products: string[]
  price: number
  description: string
}

export interface Kit {
  id: string
  name: string
  type: string
  price: number
  description: string
}

export interface Tendencia {
  name: string
  producto: string
  percentage: number
}

export interface Leccion {
  id: string
  title: string
  duration: number
  description: string
  videoUrl?: string
}
