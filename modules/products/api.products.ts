import { apiFetch } from '@/lib/http'
import { Product } from './types.products'
import { Page } from '../shared/shared.types'

export const ProductApi = {
  findAll: (page = 0, size = 20) =>
    apiFetch<Page<Product>>({ endpoint: `/api/v1/products?page=${page}&size=${size}` }),
  findById: (id: string) => apiFetch<Product>({ endpoint: `/api/v1/products/${id}` }),
  create: (data: Partial<Product>) =>
    apiFetch<Product>({
      endpoint: '/api/v1/products',
      options: { method: 'POST', body: JSON.stringify(data) },
    }),
  update: (id: string, data: Partial<Product>) =>
    apiFetch<Product>({
      endpoint: `/api/v1/products/${id}`,
      options: { method: 'PUT', body: JSON.stringify(data) },
    }),
}
