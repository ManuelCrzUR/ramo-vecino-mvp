import { Kit } from '@/types'

export const MOCK_KITS: Kit[] = [
  {
    id: 'kit1',
    name: 'Kit Premezcla Chocoramo',
    type: 'premezcla',
    price: 12500,
    description: 'Mezcla lista para preparar Chocoramo de calidad premium',
  },
  {
    id: 'kit2',
    name: 'Kit Cobertura Chocolate',
    type: 'cobertura',
    price: 8900,
    description: 'Cobertura de chocolate de primera calidad',
  },
  {
    id: 'kit3',
    name: 'Kit Relleno Arequipe',
    type: 'relleno',
    price: 7500,
    description: 'Arequipe fresco en presentación de 2kg',
  },
  {
    id: 'kit4',
    name: 'Kit Fermentación Express',
    type: 'insumo',
    price: 6200,
    description: 'Mejorante para fermentación rápida y uniforme',
  },
  {
    id: 'kit5',
    name: 'Kit Completo Panadería',
    type: 'combo',
    price: 28000,
    description: 'Kit incluye premezcla, cobertura, relleno e insumos',
  },
]
