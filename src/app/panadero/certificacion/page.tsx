'use client'

import { Badge } from '@/components/ui/badge'
import { Award, Check } from 'lucide-react'

export default function CertificacionPage() {
  const requirements = [
    {
      id: 1,
      title: 'Cursos Completados',
      description: '4/5 lecciones completadas',
      completed: true,
    },
    {
      id: 2,
      title: 'Calidad de Producto',
      description: 'Rating mínimo 4.5 estrellas',
      completed: true,
    },
    {
      id: 3,
      title: 'Inspección Sanitaria',
      description: 'Aprobado',
      completed: true,
    },
    {
      id: 4,
      title: 'Tiempo en Operación',
      description: '6+ meses activo',
      completed: true,
    },
    {
      id: 5,
      title: 'Clientes Activos',
      description: '50+ clientes únicos',
      completed: true,
    },
  ]

  const allCompleted = requirements.every((r) => r.completed)

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <div className="text-6xl mb-4">{allCompleted ? '🏆' : '📋'}</div>
        <h1 className="text-2xl font-bold text-ramo-grayDark">
          {allCompleted ? 'Certificado Ramo Vecino' : 'Camino a la Certificación'}
        </h1>
        {allCompleted && (
          <p className="text-sm text-ramo-success mt-2">¡Felicidades, estás certificado!</p>
        )}
      </div>

      {allCompleted && (
        <div className="bg-gradient-to-r from-ramo-red to-red-700 text-white rounded-lg p-6 text-center space-y-3">
          <div className="text-4xl">✨</div>
          <p className="font-bold text-lg">Certificado Oficial</p>
          <p className="text-sm opacity-90">Tu panadería cumple con todos los estándares Ramo</p>
          <Badge variant="secondary" className="mt-2 bg-white/20">
            Válido hasta diciembre 2024
          </Badge>
        </div>
      )}

      <div className="space-y-3">
        <h2 className="font-bold text-ramo-grayDark text-lg">Requisitos</h2>
        {requirements.map((req) => (
          <div
            key={req.id}
            className="bg-white rounded-lg border border-ramo-grayBorder p-4 flex items-start gap-4"
          >
            <div
              className={`mt-1 rounded-full p-1 ${
                req.completed
                  ? 'bg-ramo-success text-white'
                  : 'bg-ramo-grayLight text-ramo-grayDark'
              }`}
            >
              <Check size={20} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-ramo-grayDark">{req.title}</h3>
              <p className="text-sm text-ramo-grayDark mt-1">{req.description}</p>
            </div>
          </div>
        ))}
      </div>

      {allCompleted && (
        <div className="bg-ramo-grayLight rounded-lg p-4 text-center">
          <p className="text-sm font-bold text-ramo-grayDark">
            📊 Tu certificación te da mayor visibilidad en Ramo Vecino
          </p>
        </div>
      )}
    </div>
  )
}
