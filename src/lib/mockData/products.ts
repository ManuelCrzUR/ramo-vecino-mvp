import { Product } from '@/types'

export const MOCK_PRODUCTS: Record<string, Product> = {
  chocoramo: {
    id: 'chocoramo',
    name: 'Chocoramo',
    price: 2500,
    description: 'Pastel de chocolate relleno de arequipe y nueces',
  },
  arequipe: {
    id: 'arequipe',
    name: 'Pan de Arequipe',
    price: 2800,
    description: 'Pan dulce con relleno generoso de arequipe',
  },
  blanco: {
    id: 'blanco',
    name: 'Pan Blanco',
    price: 2700,
    description: 'Pan clásico fresco horneado diariamente',
  },
}
