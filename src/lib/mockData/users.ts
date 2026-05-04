import { User } from '@/types'

export const MOCK_USERS: Record<string, User> = {
  cliente1: {
    id: 'c1',
    email: 'cliente@demo.com',
    password: 'demo123',
    role: 'cliente',
    name: 'María García',
    phone: '+57 300 1234567',
    favorites: ['bakery-la-esperanza'],
    loyaltySeals: 5,
  },
  cliente2: {
    id: 'c2',
    email: 'cliente2@demo.com',
    password: 'demo123',
    role: 'cliente',
    name: 'Juan Pérez',
    phone: '+57 310 9876543',
    favorites: [],
    loyaltySeals: 2,
  },
  panadero1: {
    id: 'p1',
    email: 'panadero@demo.com',
    password: 'demo123',
    role: 'panadero',
    name: 'Carlos Rodríguez',
    phone: '+57 320 5555555',
    bakeryId: 'bakery-la-esperanza',
  },
  panadero2: {
    id: 'p2',
    email: 'panadero2@demo.com',
    password: 'demo123',
    role: 'panadero',
    name: 'Ana López',
    phone: '+57 310 7777777',
    bakeryId: 'bakery-el-trigal',
  },
}
