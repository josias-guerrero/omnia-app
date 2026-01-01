import { apiFetch } from '@/lib/http'
import { Brand } from './types.brands'

export const BrandsApi = {
  findAll: () => apiFetch<Brand[]>({ endpoint: '/api/v1/brands' }),
  create: (brand: Pick<Brand, 'name'>) =>
    apiFetch<Brand>({
      endpoint: '/api/v1/brands',
      options: { method: 'POST', body: JSON.stringify(brand) },
    }),
  update: (id: number, brand: Pick<Brand, 'name'>) =>
    apiFetch<Brand>({
      endpoint: `/api/v1/brands/${id}`,
      options: { method: 'PUT', body: JSON.stringify(brand) },
    }),
  delete: (id: number) =>
    apiFetch<void>({ endpoint: `/api/v1/brands/${id}`, options: { method: 'DELETE' } }),
}
