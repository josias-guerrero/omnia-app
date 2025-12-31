import { create } from 'zustand'
import { Brand } from './types.brands'
import { BrandsApi } from './api.brands'

interface BrandsState {
  brands: Brand[]
  loading: boolean
  fetchBrands: () => Promise<void>
}

export const useBrandStore = create<BrandsState>((set) => ({
  brands: [],
  loading: false,
  fetchBrands: async () => {
    set({ loading: true })
    const data = await BrandsApi.findAll()
    set({ brands: data, loading: false })
  },
}))
