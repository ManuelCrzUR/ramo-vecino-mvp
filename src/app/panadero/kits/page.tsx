'use client'

import { MOCK_KITS } from '@/lib/mockData'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { toast } from 'sonner'
import { Package, X } from 'lucide-react'

export default function KitsPage() {
  const [activeKitId, setActiveKitId] = useState<string | null>(null)
  const [quantity, setQuantity] = useState('1')

  const activeKit = MOCK_KITS.find((k) => k.id === activeKitId)

  const handleOrder = () => {
    if (!activeKitId || !quantity) {
      toast.error('Completa todos los campos')
      return
    }
    toast.success(`Pedido de ${quantity} ${activeKit?.name}(s) realizado`)
    setActiveKitId(null)
    setQuantity('1')
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ramo-grayDark mb-4">Kits y Reabastecimiento</h1>
        <p className="text-sm text-ramo-grayDark">
          Pide kits de insumos especializados para tu panadería
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {MOCK_KITS.map((kit) => (
          <button
            key={kit.id}
            onClick={() => setActiveKitId(kit.id)}
            className="border border-ramo-grayBorder rounded-lg p-4 hover:opacity-80 transition-opacity text-left"
            style={{ backgroundColor: 'rgba(231, 76, 87, 0.1)' }}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-ramo-grayDark">{kit.name}</h3>
                <p className="text-xs text-ramo-grayDark mt-1">{kit.description}</p>
                <p className="text-xs text-ramo-grayDark mt-2">Tipo: {kit.type}</p>
              </div>
              <p className="font-bold text-ramo-red text-lg">
                ${kit.price.toLocaleString()}
              </p>
            </div>
          </button>
        ))}
      </div>

      {activeKit && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50">
          <div className="bg-white w-full rounded-t-2xl p-6 space-y-4 max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-ramo-red">{activeKit.name}</h2>
              <button
                onClick={() => setActiveKitId(null)}
                className="p-1 hover:bg-ramo-grayLight rounded"
              >
                <X size={24} />
              </button>
            </div>
            <p className="text-sm text-ramo-grayDark">{activeKit.description}</p>
            <div>
              <label className="block text-sm font-medium text-ramo-grayDark mb-2">
                Cantidad
              </label>
              <Input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="border-ramo-grayBorder"
              />
            </div>
            <div className="bg-ramo-grayLight rounded-lg p-3">
              <p className="text-sm font-bold text-ramo-red">
                Total: ${(activeKit.price * Number(quantity || 1)).toLocaleString()}
              </p>
            </div>
            <Button
              onClick={handleOrder}
              className="w-full bg-ramo-red hover:bg-red-700 py-6"
            >
              Pedir Reabastecimiento
            </Button>
          </div>
        </div>
      )}

      <div className="rounded-lg p-6 space-y-4" style={{ borderWidth: '1px', borderColor: '#1F6FA8', backgroundColor: 'rgba(31, 111, 168, 0.1)' }}>
        <h2 className="font-bold text-ramo-grayDark flex items-center gap-2">
          <Package size={20} />
          Mis Pedidos Recientes
        </h2>
        <div className="text-sm text-ramo-grayDark text-center py-4">
          No hay pedidos realizados
        </div>
      </div>
    </div>
  )
}
