'use client'

import { useState, use } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { MOCK_BAKERIES, MOCK_PRODUCTS, MOCK_COMBOS, MOCK_BAKE_EVENTS } from '@/lib/mockData'
import { useUser } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Heart, MapPin, Phone, Star, CheckCircle, Flame } from 'lucide-react'

export default function BakeryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const user = useUser((state) => state.user)
  const bakery = MOCK_BAKERIES[id]
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

        <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 pb-12 space-y-4">
          <h1 className="text-3xl font-bold">{bakery.name}</h1>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <p>{bakery.address}</p>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} />
              <p>{bakery.phone}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">⏰ Horario:</span>
              <p>{bakery.scheduleOpen} - {bakery.scheduleClose}</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-white/20 flex items-center gap-1">
                <Star size={14} fill="white" />
                {bakery.rating} ({bakery.reviewsCount})
              </Badge>
              {bakery.isCertified && (
                <Badge variant="secondary" className="bg-ramo-success flex items-center gap-1">
                  <CheckCircle size={14} />
                  Certificada
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
            <div className="bg-ramo-alert/20 rounded-lg p-3 text-sm flex items-center gap-2 border border-white/30">
              <Flame size={16} />
              Acaban de hornear hace {minutesAgo} minutos
            </div>
          )}
          {minutesAgo === null && (
            <div className="bg-white/10 rounded-lg p-3 text-sm border border-white/30">
              Sin eventos de horneado recientes
            </div>
          )}
        </div>

        <div className="bg-white -mt-6 rounded-t-3xl px-6 py-6">
          <Tabs defaultValue="tortas" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="tortas">Tortas</TabsTrigger>
              <TabsTrigger value="especiales">Especiales</TabsTrigger>
              <TabsTrigger value="combos">Combos</TabsTrigger>
              <TabsTrigger value="resenas">Reseñas</TabsTrigger>
            </TabsList>

            <TabsContent value="tortas" className="space-y-4 mt-6">
              {[
                MOCK_PRODUCTS['torta-mixta'],
                MOCK_PRODUCTS['torta-arequipe'],
                MOCK_PRODUCTS['torta-chocolate-blanco'],
                MOCK_PRODUCTS['torta-chocolate-negro'],
              ].map((product) => (
                product && (
                  <div
                    key={product.id}
                    className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer active:scale-95"
                  >
                    <div className="flex gap-4">
                      {product.image && (
                        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200 relative">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">{product.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {product.description}
                        </p>
                        <p className="font-bold text-blue-600 text-lg mt-2">
                          ${product.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              ))}
            </TabsContent>

            <TabsContent value="especiales" className="space-y-4 mt-6">
              {MOCK_PRODUCTS['chocoramo-fresh'] && (
                <div className="border-2 border-orange-200 rounded-lg p-4 bg-orange-50 hover:bg-orange-100 transition-colors cursor-pointer active:scale-95">
                  <div className="flex gap-4">
                    {MOCK_PRODUCTS['chocoramo-fresh'].image && (
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200 relative">
                        <Image
                          src={MOCK_PRODUCTS['chocoramo-fresh'].image}
                          alt={MOCK_PRODUCTS['chocoramo-fresh'].name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">
                        {MOCK_PRODUCTS['chocoramo-fresh'].name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {MOCK_PRODUCTS['chocoramo-fresh'].description}
                      </p>
                      <p className="font-bold text-orange-600 text-lg mt-2">
                        ${MOCK_PRODUCTS['chocoramo-fresh'].price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="combos" className="space-y-4 mt-6">
              {bakeryComBos.map((combo) => (
                <div
                  key={combo.id}
                  className="border-2 border-red-200 rounded-lg p-4 bg-red-50 hover:bg-red-100 transition-colors cursor-pointer active:scale-95"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">{combo.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {combo.description}
                      </p>
                      <p className="text-xs text-gray-700 mt-2 font-semibold">
                        📦 {combo.products.length} productos incluidos
                      </p>
                    </div>
                    <p className="font-bold text-red-600 text-lg ml-4 whitespace-nowrap">
                      ${combo.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="resenas" className="space-y-4 mt-6">
              <div className="bg-blue-50 rounded-lg p-6 text-center border-2 border-blue-200">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Star size={24} fill="#FFD700" className="text-yellow-400" />
                  <span className="text-3xl font-bold text-gray-900">{bakery.rating}</span>
                </div>
                <p className="text-gray-600 font-semibold">{bakery.reviewsCount} reseñas</p>
              </div>
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-10 h-10 rounded-full bg-blue-300 flex items-center justify-center text-white font-bold">
                        {String.fromCharCode(65 + i)}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">Cliente {i + 1}</p>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, j) => (
                            <Star
                              key={j}
                              size={12}
                              fill={j < (4 + i) % 5 ? '#FFD700' : '#E5E7EB'}
                              className={j < (4 + i) % 5 ? 'text-yellow-400' : 'text-gray-300'}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      Excelente panadería, productos frescos y de muy buena calidad. Recomendado.
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
