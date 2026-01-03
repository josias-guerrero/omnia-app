import { apiFetch } from '@/lib/http'
import { Product } from './types.products'

export const ProductApi = {
  findAll: () => apiFetch<Product[]>({ endpoint: '/api/v1/products' }),
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
