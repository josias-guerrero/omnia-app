import { apiFetch } from '@/lib/http'
import { Brand } from './types.brands'

export const BrandsApi = {
  findAll: () => apiFetch<Brand[]>({ endpoint: '/api/v1/brands' }),
}
