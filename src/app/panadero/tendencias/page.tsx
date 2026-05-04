'use client'

import { MOCK_TENDENCIAS_CHART, MOCK_TENDENCIAS } from '@/lib/mockData'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

export default function TendenciasPage() {
  const uniqueProducts = [...new Set(MOCK_TENDENCIAS.map((t) => t.producto))]

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ramo-grayDark">Tendencias de Ventas</h1>
        <p className="text-sm text-ramo-grayDark mt-2">
          Análisis del desempeño de tus productos
        </p>
      </div>

      <div className="bg-white rounded-lg border border-ramo-grayBorder p-6">
        <h2 className="font-bold text-ramo-grayDark mb-4">Últimas 4 Semanas</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={MOCK_TENDENCIAS_CHART}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #E5E7EB',
              }}
            />
            <Legend />
            <Bar dataKey="Chocoramo" fill="#E30613" />
            <Bar dataKey="Arequipe" fill="#0099FF" />
            <Bar dataKey="Blanco" fill="#F3F4F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {uniqueProducts.map((product) => {
          const current = MOCK_TENDENCIAS.find(
            (t) => t.producto === product && t.name === 'Semana 4'
          )
          const previous = MOCK_TENDENCIAS.find(
            (t) => t.producto === product && t.name === 'Semana 1'
          )
          const growth = current && previous ? current.percentage - previous.percentage : 0

          return (
            <div
              key={product}
              className="bg-white rounded-lg border border-ramo-grayBorder p-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-ramo-grayDark">{product}</h3>
                  <p className="text-sm text-ramo-grayDark mt-1">
                    Participación actual: {current?.percentage}%
                  </p>
                </div>
                <div
                  className={`text-lg font-bold ${growth >= 0 ? 'text-ramo-success' : 'text-ramo-alert'}`}
                >
                  {growth >= 0 ? '+' : ''}{growth}%
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
