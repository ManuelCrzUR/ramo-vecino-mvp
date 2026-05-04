'use client'

import { MOCK_APRENDE } from '@/lib/mockData'
import { Badge } from '@/components/ui/badge'
import { BookOpen } from 'lucide-react'

export default function AprendePage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ramo-grayDark flex items-center gap-2">
          <BookOpen size={28} className="text-ramo-red" />
          Centro de Capacitación
        </h1>
        <p className="text-sm text-ramo-grayDark mt-2">
          Aprende técnicas avanzadas de panadería
        </p>
      </div>

      <div className="space-y-4">
        {MOCK_APRENDE.map((leccion) => (
          <div
            key={leccion.id}
            className="bg-white rounded-lg border border-ramo-grayBorder overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="bg-gradient-to-r from-ramo-red to-red-700 text-white p-4 h-24 flex items-end">
              <div className="text-3xl">📹</div>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <h3 className="font-bold text-ramo-grayDark">{leccion.title}</h3>
                <p className="text-sm text-ramo-grayDark mt-2">{leccion.description}</p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-ramo-grayBorder">
                <Badge variant="secondary" className="bg-ramo-grayLight">
                  ⏱️ {leccion.duration} min
                </Badge>
                <button className="text-ramo-red font-bold text-sm hover:underline">
                  Ver →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
