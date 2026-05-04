'use client'

import { create } from 'zustand'
import { persist, PersistStorage } from 'zustand/middleware'
import { User } from '@/types'

interface UserStore {
  user: User | null
  setUser: (user: User | null) => void
  logout: () => void
}

const storage: PersistStorage<UserStore> = {
  getItem: (name) => {
    if (typeof window === 'undefined') return null
    try {
      const item = localStorage.getItem(name)
      return item ? JSON.parse(item) : null
    } catch {
      return null
    }
  },
  setItem: (name, value) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(name, JSON.stringify(value))
      } catch {
        console.warn('Error guardando en localStorage')
      }
    }
  },
  removeItem: (name) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(name)
      } catch {
        console.warn('Error removiendo de localStorage')
      }
    }
  },
}

export const useUser = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'ramo-user-storage',
      storage,
    }
  )
)
