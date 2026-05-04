import { BakeEvent } from '@/types'

export const MOCK_BAKE_EVENTS: BakeEvent[] = [
  {
    id: 'ev1',
    bakeryId: 'bakery-la-esperanza',
    product: 'chocoramo',
    bakedAt: new Date(Date.now() - 8 * 60000),
  },
  {
    id: 'ev2',
    bakeryId: 'bakery-el-trigal',
    product: 'arequipe',
    bakedAt: new Date(Date.now() - 23 * 60000),
  },
  {
    id: 'ev3',
    bakeryId: 'bakery-don-pan',
    product: 'blanco',
    bakedAt: new Date(Date.now() - 45 * 60000),
  },
  {
    id: 'ev4',
    bakeryId: 'bakery-pan-casero',
    product: 'arequipe',
    bakedAt: new Date(Date.now() - 12 * 60000),
  },
  {
    id: 'ev5',
    bakeryId: 'bakery-tradicion',
    product: 'chocoramo',
    bakedAt: new Date(Date.now() - 35 * 60000),
  },
]
