'use client'

import { useState } from 'react'
import { MOCK_BAKERIES, MOCK_PRODUCTS } from '@/lib/mockData'
import { useUser } from '@/lib/store'
import Link from 'next/link'
import { Star } from 'lucide-react'

export default function FavoritosPage() {
  const user = useUser((state) => state.user)
  const [activeTab, setActiveTab] = useState<'bakeries' | 'products'>('bakeries')

  const favorites = user?.favorites || []
  const favBakeries = favorites
    .map((id) => MOCK_BAKERIES[id])
    .filter(Boolean)

  const favoriteProducts = user?.favoriteProducts || ['chocoramo', 'arequipe']
  const favProducts = favoriteProducts
    .map((id) => MOCK_PRODUCTS[id])
    .filter(Boolean)

  return (
    <div className="min-h-screen bg-white p-6 pb-24">
      <h1 className="text-2xl font-bold text-ramo-dark mb-6">Mis Favoritos</h1>

      {/* Selector Tabs */}
      <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('bakeries')}
          className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
            activeTab === 'bakeries'
              ? 'bg-white text-ramo-dark shadow-md'
              : 'text-ramo-gray hover:text-ramo-dark'
          }`}
        >
          Panaderías ({favBakeries.length})
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
            activeTab === 'products'
              ? 'bg-white text-ramo-dark shadow-md'
              : 'text-ramo-gray hover:text-ramo-dark'
          }`}
        >
          Productos ({favProducts.length})
        </button>
      </div>

      {/* Panaderías Tab */}
      {activeTab === 'bakeries' && (
        <div className="space-y-3">
          {favBakeries.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-ramo-gray">No tienes panaderías favoritas aún</p>
              <p className="text-sm text-ramo-gray mt-2">
                Agrega tus panaderías favoritas desde el mapa
              </p>
            </div>
          ) : (
            favBakeries.map((bakery) => (
              <Link
                key={bakery.id}
                href={`/cliente/panaderia/${bakery.id}`}
                className="block rounded-xl p-4 border-2 border-ramo-border hover:shadow-lg transition-all"
                style={{ backgroundColor: 'rgba(123, 195, 237, 0.15)' }}
              >
                <div className="flex justify-between items-start gap-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-ramo-dark">{bakery.name}</h3>
                    <p className="text-xs text-ramo-gray mt-1">{bakery.address}</p>
                    {bakery.isCertified && (
                      <p className="text-xs text-green-600 font-bold mt-1">✓ Certificada</p>
                    )}
                  </div>
                  <div className="flex items-center gap-1 font-bold text-orange-500 text-sm flex-shrink-0">
                    <Star size={16} fill="currentColor" />
                    {bakery.rating}
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      )}

      {/* Productos Tab */}
      {activeTab === 'products' && (
        <div className="space-y-3">
          {favProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-ramo-gray">No tienes productos favoritos aún</p>
              <p className="text-sm text-ramo-gray mt-2">
                Agrega productos favoritos desde las panaderías
              </p>
            </div>
          ) : (
            favProducts.map((product) => (
              <div
                key={product.id}
                className="rounded-xl p-4 border-2 border-ramo-border hover:shadow-lg transition-all"
                style={{ backgroundColor: 'rgba(123, 195, 237, 0.15)' }}
              >
                <div className="flex justify-between items-start gap-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-ramo-dark">{product.name}</h3>
                    <p className="text-xs text-ramo-gray mt-1">{product.description}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <p className="font-bold text-blue-600 text-sm">
                      ${product.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
