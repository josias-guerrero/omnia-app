import { create } from 'zustand'
import { Property } from './types.properties'
import { PropertyApi } from './api.properties'

interface PropertyState {
  properties: Property[]
  loading: boolean
  fetchProperties: () => Promise<void>
  create: (name: Pick<Property, 'name'>) => Promise<void>
  update: (id: number, name: Pick<Property, 'name'>) => Promise<void>
  delete: (id: number) => Promise<void>
}

export const usePropertyStore = create<PropertyState>((set) => ({
  properties: [],
  loading: false,
  fetchProperties: async () => {
    set({ loading: true })
    const data = await PropertyApi.findAll()
    set({
      loading: false,
      properties: data,
    })
  },
  create: async (prop) => {
    set({ loading: true })
    const data = await PropertyApi.create(prop)
    set((state) => ({
      loading: false,
      properties: [...state.properties, data],
    }))
  },
  update: async (id, prop) => {
    set({ loading: true })
    const saved = await PropertyApi.update(id, prop)
    set((state) => ({
      loading: false,
      properties: state.properties.map((p) => (p.id === id ? saved : p)),
    }))
  },
  delete: async (id) => {
    set({ loading: true })
    await PropertyApi.delete(id)
    set((state) => ({
      loading: false,
      properties: state.properties.filter((p) => p.id !== id),
    }))
  },
}))
