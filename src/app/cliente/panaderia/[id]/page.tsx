'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MOCK_BAKERIES, MOCK_PRODUCTS, MOCK_COMBOS, MOCK_BAKE_EVENTS } from '@/lib/mockData'
import { useUser } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Heart, MapPin, Phone } from 'lucide-react'

export default function BakeryDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const router = useRouter()
  const user = useUser((state) => state.user)
  const bakery = MOCK_BAKERIES[params.id]
  const [isFavorited, setIsFavorited] = useState(
    user?.favorites?.includes(bakery?.id) || false
  )

  if (!bakery) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-ramo-grayDark">Panadería no encontrada</p>
      </div>
    )
  }

  const recentEvent = MOCK_BAKE_EVENTS.find((e) => e.bakeryId === bakery.id)
  const minutesAgo = recentEvent
    ? Math.floor((Date.now() - new Date(recentEvent.bakedAt).getTime()) / 60000)
    : null

  const bakeryProducts = MOCK_PRODUCTS
  const bakeryComBos = MOCK_COMBOS.slice(0, 2)

  return (
    <div className="min-h-screen pb-24">
      <div className="relative">
        <div className="absolute top-4 left-4 z-10 flex gap-2">
          <button
            onClick={() => router.back()}
            className="bg-white rounded-full p-2 shadow-lg"
          >
            <ArrowLeft size={24} className="text-ramo-grayDark" />
          </button>
        </div>

        <div className="bg-gradient-to-br from-ramo-blue to-ramo-blueDark text-white p-6 pb-12 space-y-4">
          <h1 className="text-3xl font-bold">{bakery.name}</h1>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <p>{bakery.address}</p>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} />
              <p>{bakery.phone || '+57 1 2345678'}</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-white/20">
                ⭐ {bakery.rating} ({bakery.reviewsCount})
              </Badge>
              {bakery.isCertified && (
                <Badge variant="secondary" className="bg-ramo-success">
                  ✓ Certificada
                </Badge>
              )}
            </div>
            <button
              onClick={() => setIsFavorited(!isFavorited)}
              className="bg-white/20 rounded-full p-2 hover:bg-white/30"
            >
              <Heart
                size={24}
                className={isFavorited ? 'fill-ramo-red text-ramo-red' : 'text-white'}
              />
            </button>
          </div>

          {minutesAgo !== null && minutesAgo < 30 && (
            <div className="bg-ramo-alert/20 rounded-lg p-2 text-sm">
              🔥 Acaban de hornear hace {minutesAgo} minutos
            </div>
          )}
        </div>

        <div className="bg-white -mt-6 rounded-t-3xl px-6 py-6">
          <Tabs defaultValue="productos" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="productos">Productos</TabsTrigger>
              <TabsTrigger value="combos">Combos</TabsTrigger>
            </TabsList>

            <TabsContent value="productos" className="space-y-4 mt-6">
              {bakeryProducts &&
                Object.values(bakeryProducts).map((product) => (
                  <div
                    key={product.id}
                    className="border border-ramo-grayBorder rounded-lg p-4 hover:bg-ramo-grayLight transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-ramo-grayDark">{product.name}</h3>
                        <p className="text-sm text-ramo-grayDark mt-1">
                          {product.description}
                        </p>
                      </div>
                      <p className="font-bold text-ramo-blue text-lg">
                        ${product.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
            </TabsContent>

            <TabsContent value="combos" className="space-y-4 mt-6">
              {bakeryComBos.map((combo) => (
                <div
                  key={combo.id}
                  className="border border-ramo-grayBorder rounded-lg p-4 hover:bg-ramo-grayLight transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-ramo-grayDark">{combo.name}</h3>
                      <p className="text-sm text-ramo-grayDark mt-1">
                        {combo.description}
                      </p>
                      <p className="text-xs text-ramo-grayDark mt-2">
                        {combo.products.length} productos
                      </p>
                    </div>
                    <p className="font-bold text-ramo-red text-lg">
                      ${combo.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
