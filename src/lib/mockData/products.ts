import { Product } from '@/types'

export const MOCK_PRODUCTS: Record<string, Product> = {
  'torta-mixta': {
    id: 'torta-mixta',
    name: 'Torta Mixta',
    price: 15000,
    description: 'Torta esponjosa con frutas y crema',
    image: '🎂',
  },
  'torta-arequipe': {
    id: 'torta-arequipe',
    name: 'Torta Arequipeños',
    price: 16000,
    description: 'Deliciosa torta con relleno de arequipe y nueces',
    image: '🎂',
  },
  'torta-chocolate-blanco': {
    id: 'torta-chocolate-blanco',
    name: 'Torta Cubierta Chocolate Blanco',
    price: 17500,
    description: 'Torta con cobertura de chocolate blanco premium',
    image: '🎂',
  },
  'torta-chocolate-negro': {
    id: 'torta-chocolate-negro',
    name: 'Torta Cubierta Chocolate Negro',
    price: 17500,
    description: 'Torta con cobertura de chocolate negro intenso',
    image: '🎂',
  },
}
