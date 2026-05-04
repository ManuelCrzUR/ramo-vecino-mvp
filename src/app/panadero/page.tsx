'use client'

import { useState } from 'react'
import { useUser } from '@/lib/store'
import { MOCK_BAKERIES, MOCK_PRODUCTS, MOCK_BAKE_EVENTS } from '@/lib/mockData'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Flame, X, Star, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'

export default function PanaderoPage() {
  const user = useUser((state) => state.user)
  const bakery = user?.bakeryId ? MOCK_BAKERIES[user.bakeryId] : null
  const [isOpen, setIsOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)

  const recentEvent = MOCK_BAKE_EVENTS.find((e) => e.bakeryId === bakery?.id)
  const minutesAgo = recentEvent
    ? Math.floor((Date.now() - new Date(recentEvent.bakedAt).getTime()) / 60000)
    : null

  const handleBakeEvent = () => {
    if (!selectedProduct) {
      toast.error('Selecciona un producto')
      return
    }
    toast.success(`¡Hornada de ${selectedProduct} registrada!`)
    setIsOpen(false)
    setSelectedProduct(null)
  }

  return (
    <div className="p-6 space-y-6 min-h-screen" style={{ backgroundColor: '#F7F8FA' }}>
      {bakery && (
        <div className="rounded-xl p-6 space-y-4 border-2 border-gray-300" style={{ backgroundColor: '#FFFFFF' }}>
          <h1 className="text-3xl font-bold text-ramo-dark">{bakery.name}</h1>
          <div className="space-y-2">
            <p className="text-sm text-ramo-gray">{bakery.address}</p>
            <div className="flex items-center gap-1 text-sm text-ramo-dark">
              <Star size={16} fill="#1F6FA8" style={{ color: '#1F6FA8' }} />
              {bakery.rating} ({bakery.reviewsCount} opiniones)
            </div>
            {bakery.isCertified && (
              <div className="flex items-center gap-1 text-sm" style={{ color: '#8ECFE8' }}>
                <CheckCircle size={16} />
                Certificada
              </div>
            )}
          </div>
          {minutesAgo !== null && (
            <p className="text-sm rounded px-3 py-1 inline-block text-ramo-dark" style={{ backgroundColor: 'rgba(231, 76, 87, 0.1)' }}>
              Última hornada: hace {minutesAgo} minutos
            </p>
          )}
        </div>
      )}

      <motion.div whileTap={{ scale: 0.95 }}>
        <motion.button
          onClick={() => setIsOpen(true)}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-full text-white font-bold py-6 rounded-lg flex items-center justify-center gap-2 text-lg transition-all border-2"
          style={{ backgroundColor: '#E74C57', borderColor: '#E74C57' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#D63846'
            e.currentTarget.style.borderColor = '#D63846'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#E74C57'
            e.currentTarget.style.borderColor = '#E74C57'
          }}
        >
          <Flame size={28} />
          Acabo de Hornear
        </motion.button>
      </motion.div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50">
          <div className="bg-white w-full rounded-t-3xl p-6 space-y-4 max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-900">Registrar Hornada</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X size={24} />
              </button>
            </div>
            <p className="text-sm text-gray-600">¿Qué acabas de hornear?</p>
            <div className="space-y-2">
              {Object.values(MOCK_PRODUCTS).map((product) => (
                <button
                  key={product.id}
                  onClick={() => setSelectedProduct(product.name)}
                  className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                    selectedProduct === product.name
                      ? 'bg-red-600 border-red-600 text-white'
                      : 'bg-white border-gray-200 hover:border-red-400'
                  }`}
                >
                  <p className="font-bold">{product.name}</p>
                  <p className="text-xs opacity-75">$ {product.price.toLocaleString()}</p>
                </button>
              ))}
            </div>
            <Button
              onClick={handleBakeEvent}
              className="w-full bg-red-600 hover:bg-red-700 py-6 text-white"
            >
              Confirmar
            </Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl p-4 text-center border-2 border-gray-300" style={{ backgroundColor: '#FFFFFF' }}>
          <p className="text-3xl font-bold text-ramo-dark">{bakery?.availableProducts.length}</p>
          <p className="text-sm text-ramo-gray mt-2">Productos</p>
        </div>
        <div className="rounded-xl p-4 text-center border-2 border-gray-300" style={{ backgroundColor: '#FFFFFF' }}>
          <p className="text-3xl font-bold text-ramo-dark">{bakery?.reviewsCount}</p>
          <p className="text-sm text-ramo-gray mt-2">Reseñas</p>
        </div>
      </div>
    </div>
  )
}
