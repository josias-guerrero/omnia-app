import { create } from 'zustand'
import { Property } from './types.properties'
import { PropertyApi } from './api.properties'

interface PropertyState {
  properties: Property[]
  loading: boolean
  fetchProperties: () => Promise<void>
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
}))
