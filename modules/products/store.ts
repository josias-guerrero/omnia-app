import { create } from 'zustand'
import { Product } from './types.products'
import { ProductApi } from './api.products'

interface ProductState {
  products: Product[]
  loading: boolean
  fetchProducts: () => Promise<void>
  addProduct: (product: Partial<Product>) => Promise<void>
  getProductById: (id: string) => Product | undefined
  fetchProductById: (id: string) => Promise<Product>
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>
}

export const useProductStore = create<ProductState>((set, get) => ({
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

  getProductById: (id) => get().products.find((p) => p.id === id),

  fetchProductById: async (id) => {
    set({ loading: true })
    const newProduct = await ProductApi.findById(id)
    set((state) => ({
      products: [...state.products.filter((p) => p.id !== id), newProduct],
    }))
    return newProduct
  },

  updateProduct: async (id, product) => {
    set({ loading: true })
    const updated = await ProductApi.update(id, product)
    set((state) => ({
      loading: false,
      products: state.products.map((p) => (p.id === id ? updated : p)),
    }))
  },
}))
