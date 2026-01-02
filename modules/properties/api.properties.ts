import { apiFetch } from '@/lib/http'
import { Property } from './types.properties'

export const PropertyApi = {
  findAll: () => apiFetch<Property[]>({ endpoint: '/api/v1/properties' }),
  create: (prop: Pick<Property, 'name'>) =>
    apiFetch<Property>({
      endpoint: '/api/v1/properties',
      options: { method: 'POST', body: JSON.stringify(prop) },
    }),
  update: (id: number, prop: Pick<Property, 'name'>) =>
    apiFetch<Property>({
      endpoint: `/api/v1/properties/${id}`,
      options: { method: 'PUT', body: JSON.stringify(prop) },
    }),
  delete: (id: number) =>
    apiFetch<void>({ endpoint: `/api/v1/properties/${id}`, options: { method: 'DELETE' } }),
}
