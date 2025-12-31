import { apiFetch } from '@/lib/http'
import { Property } from './types.properties'

export const PropertyApi = {
  findAll: () => apiFetch<Property[]>({ endpoint: '/api/v1/properties' }),
}
