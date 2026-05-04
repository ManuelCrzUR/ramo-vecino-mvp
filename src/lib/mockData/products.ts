import { Product } from '@/types'

export const MOCK_PRODUCTS: Record<string, Product> = {
  'torta-mixta': {
    id: 'torta-mixta',
    name: 'Torta Mixta',
    price: 15000,
    description: 'Torta esponjosa con frutas y crema',
    image: '/torta-mixta.jpeg',
  },
  'torta-arequipe': {
    id: 'torta-arequipe',
    name: 'Torta Arequipeños',
    price: 16000,
    description: 'Deliciosa torta con relleno de arequipe y nueces',
    image: '/torta-arequipe.jpeg',
  },
  'torta-chocolate-blanco': {
    id: 'torta-chocolate-blanco',
    name: 'Torta Cubierta Chocolate Blanco',
    price: 17500,
    description: 'Torta con cobertura de chocolate blanco premium',
    image: '/torta-chocolate-blanco.jpeg',
  },
  'torta-chocolate-negro': {
    id: 'torta-chocolate-negro',
    name: 'Torta Cubierta Chocolate Negro',
    price: 17500,
    description: 'Torta con cobertura de chocolate negro intenso',
    image: '/torta-chocolate-negro.jpeg',
  },
  'chocoramo-fresh': {
    id: 'chocoramo-fresh',
    name: 'Chocoramo Fresh',
    price: 3500,
    description: 'Chocoramo recién horneado, crujiente y delicioso',
    image: '/chocoramo-fresh.jpeg',
  },
  'bites-ramo-4': {
    id: 'bites-ramo-4',
    name: 'Bites Ramo x4',
    price: 8000,
    description: 'Caja de 4 bites de chocolate, perfectos para compartir',
    image: '/bites-ramo.jpeg',
  },
  'bites-ramo-6': {
    id: 'bites-ramo-6',
    name: 'Bites Ramo x6',
    price: 11000,
    description: 'Caja de 6 bites de chocolate, ideal para la familia',
    image: '/bites-ramo.jpeg',
  },
  'bites-ramo-8': {
    id: 'bites-ramo-8',
    name: 'Bites Ramo x8',
    price: 14000,
    description: 'Caja de 8 bites de chocolate, perfecta para eventos',
    image: '/bites-ramo.jpeg',
  },
  'bites-ramo-10': {
    id: 'bites-ramo-10',
    name: 'Bites Ramo x10',
    price: 17000,
    description: 'Caja de 10 bites de chocolate, para verdaderos amantes',
    image: '/bites-ramo.jpeg',
  },
}
