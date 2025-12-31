import { create } from 'zustand'
import { Category } from './types.categories'
import { CategoryApi } from './api.categories'

interface CategoriesState {
  categories: Category[]
  loading: boolean
  fetchCategories: () => Promise<void>
}

export const useCategoryStore = create<CategoriesState>((set) => ({
  categories: [],
  loading: false,
  fetchCategories: async () => {
    set({ loading: true })
    const data = await CategoryApi.findAll()
    set({ loading: false, categories: data })
  },
}))
