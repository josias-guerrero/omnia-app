import { apiFetch } from '@/lib/http'
import { Category } from './types.categories'

export const CategoryApi = {
  findAll: () => apiFetch<Category[]>({ endpoint: '/api/v1/categories' }),
  delete: (id: number) =>
    apiFetch<void>({ endpoint: `/api/v1/categories/${id}`, options: { method: 'DELETE' } }),
  create: (category: Partial<Category>) =>
    apiFetch<Category>({
      endpoint: '/api/v1/categories',
      options: { method: 'POST', body: JSON.stringify(category) },
    }),
  update: (id: number, category: Partial<Category>) =>
    apiFetch<Category>({
      endpoint: `/api/v1/categories/${id}`,
      options: { method: 'PUT', body: JSON.stringify(category) },
    }),
}
