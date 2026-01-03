import { create } from 'zustand'
import { Product } from './types.products'
import { ProductApi } from './api.products'
import { Page } from '../shared/shared.types'

interface ProductState {
  productsPage: Page<Product> | null
  loading: boolean
  currentPage: number
  currentSize: number

  //actions
  fetchProducts: (page?: number, size?: number) => Promise<void>
  setPage: (page: number) => Promise<void>
  setSize: (page: number) => Promise<void>
  addProduct: (product: Partial<Product>) => Promise<void>
  fetchProductById: (id: string) => Promise<Product>
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>

  //helpers
  getProductById: (id: string) => Product | undefined
  refreshCurrentPage: () => Promise<void>
}

export const useProductStore = create<ProductState>((set, get) => ({
  productsPage: null,
  loading: false,
  currentPage: 0,
  currentSize: 20,

  fetchProducts: async (page = 0, size = 20) => {
    set({ loading: true, currentPage: page, currentSize: size })
    try {
      const data = await ProductApi.findAll(page, size)
      set({ productsPage: data, loading: false })
    } catch (error) {
      set({ loading: false })
      throw error
    }
  },

  setPage: async (page) => {
    const { currentSize } = get()
    await get().fetchProducts(page, currentSize)
  },

  setSize: async (size) => {
    await get().fetchProducts(0, size)
  },

  addProduct: async (product) => {
    await ProductApi.create(product)

    await get().refreshCurrentPage()
  },

  getProductById: (id) => {
    const { productsPage } = get()
    return productsPage?.content.find((p) => p.id === id)
  },

  fetchProductById: async (id) => {
    set({ loading: true })
    const newProduct = await ProductApi.findById(id)
    set((state) => {
      if (!state.productsPage) {
        return {
          loading: false,
          productsPage: {
            content: [newProduct],
            page: 0,
            size: 0,
            totalElements: 1,
            totalPages: 1,
            empty: false,
            first: true,
          },
        }
      }
      return {
        loading: false,
        productsPage: {
          ...state.productsPage,
          content: [...state.productsPage.content, newProduct],
        },
      }
    })
    return newProduct
  },

  updateProduct: async (id, product) => {
    set({ loading: true })
    const updated = await ProductApi.update(id, product)
    set((state) => {
      if (!state.productsPage) return { loading: false }
      return {
        loading: false,
        productsPage: {
          ...state.productsPage,
          content: state.productsPage.content.map((p) => (p.id === id ? updated : p)),
        },
      }
    })
  },

  refreshCurrentPage: async () => {
    const { currentPage, currentSize } = get()
    await get().fetchProducts(currentPage, currentSize)
  },
}))
