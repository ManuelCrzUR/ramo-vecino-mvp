import { Combo } from '@/types'

export const MOCK_COMBOS: Combo[] = [
  {
    id: 'combo1',
    name: 'Desayuno Colombiano',
    products: ['chocoramo', 'arequipe', 'blanco'],
    price: 7500,
    description: 'Combo perfecto para el desayuno: Chocoramo, Pan de Arequipe y Pan Blanco',
  },
  {
    id: 'combo2',
    name: 'Dulce Ramo',
    products: ['chocoramo', 'arequipe'],
    price: 5000,
    description: 'Dos deliciosos panes dulces para satisfacer tu antojo',
  },
  {
    id: 'combo3',
    name: 'Familia Completa',
    products: ['chocoramo', 'arequipe', 'blanco', 'blanco'],
    price: 9500,
    description: '4 panes variados ideales para toda la familia',
  },
  {
    id: 'combo4',
    name: 'Pan Blanco Especial',
    products: ['blanco', 'blanco', 'blanco'],
    price: 7200,
    description: 'Tres panes blancos frescos recién horneados',
  },
]
