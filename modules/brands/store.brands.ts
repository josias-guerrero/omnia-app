import { create } from 'zustand'
import { Brand } from './types.brands'
import { BrandsApi } from './api.brands'

interface BrandsState {
  brands: Brand[]
  loading: boolean
  createBrand: (brand: Pick<Brand, 'name'>) => Promise<Brand>
  fetchBrands: () => Promise<void>
  updateBrand: (id: number, brand: Pick<Brand, 'name'>) => Promise<void>
  deleteBrand: (id: number) => Promise<void>
}

export const useBrandStore = create<BrandsState>((set) => ({
  brands: [],
  loading: false,
  createBrand: async (brand) => {
    try {
      set({ loading: true })

      const data = await BrandsApi.create(brand)

      set((state) => ({
        brands: [...state.brands, data],
        loading: false,
      }))

      return data
    } catch (error) {
      set({ loading: false })
      throw error
    }
  },
  fetchBrands: async () => {
    set({ loading: true })
    const data = await BrandsApi.findAll()
    set({ brands: data, loading: false })
  },
  updateBrand: async (id, brand) => {
    set({ loading: true })
    const updated = await BrandsApi.update(id, brand)
    set((state) => ({
      brands: state.brands.map((b) => (b.id === id ? updated : b)),
      loading: false,
    }))
  },
  deleteBrand: async (id) => {
    set({ loading: true })
    await BrandsApi.delete(id)
    set((state) => ({
      brands: state.brands.filter((b) => b.id !== id),
      loading: false,
    }))
  },
}))
