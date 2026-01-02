import { create } from 'zustand'

import { Category } from './types.categories'
import { CategoryApi } from './api.categories'

interface CategoriesState {
  categories: Category[]
  loading: boolean
  fetchCategories: () => Promise<void>
  create: (category: Partial<Category>) => Promise<void>
  delete: (id: number) => Promise<void>
  update: (id: number, category: Partial<Category>) => Promise<void>
}

export const useCategoryStore = create<CategoriesState>((set) => ({
  categories: [],
  loading: false,
  fetchCategories: async () => {
    set({ loading: true })
    const data = await CategoryApi.findAll()
    set({ loading: false, categories: data })
  },
  delete: async (id) => {
    set({ loading: true })
    await CategoryApi.delete(id)
    set((state) => ({ categories: state.categories.filter((c) => c.id !== id) }))
  },
  create: async (category) => {
    set({ loading: true })
    const data = await CategoryApi.create(category)
    set((state) => ({
      categories: [...state.categories, data],
      loading: false,
    }))
  },
  update: async (id, category) => {
    set({ loading: true })
    const data = await CategoryApi.update(id, category)
    set((state) => ({
      categories: state.categories.map((c) => (id === c.id ? data : c)),
      loading: false,
    }))
  },
}))
