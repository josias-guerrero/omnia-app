import { apiFetch } from '@/lib/http'
import { Product } from './types.products'

export const ProductApi = {
  findAll: () => apiFetch<Product[]>({ endpoint: '/api/v1/products' }),
  findById: (id: string) => apiFetch({ endpoint: `/api/v1/products/${id}` }),
  create: (data: Partial<Product>) =>
    apiFetch<Product>({
      endpoint: '/api/v1/products',
      options: { method: 'POST', body: JSON.stringify(data) },
    }),
}
