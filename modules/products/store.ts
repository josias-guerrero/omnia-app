import { create } from 'zustand'
import { Product } from './types.products'
import { ProductApi } from './api.products'

interface ProductState {
  products: Product[]
  loading: boolean
  fetchProducts: () => Promise<void>
  addProduct: (product: Partial<Product>) => Promise<void>
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  loading: false,

  fetchProducts: async () => {
    set({ loading: true })
    const data = await ProductApi.findAll()
    set({ products: data, loading: false })
  },

  addProduct: async (product) => {
    const newProduct = await ProductApi.create(product)
    set((state) => ({
      products: [...state.products, newProduct],
    }))
  },
}))
