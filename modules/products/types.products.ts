import { Brand } from '../brands/types.brands'
import { Category } from '../categories/types.categories'

export interface Product {
  id: string
  sku: string
  barcode?: string
  cost: number
  price: number
  description?: string
  createdAt: Date
  updatedAt: Date
  name: string
  stock: number
  brand?: Partial<Brand>
  properties?: Record<string, string>
  categories?: Category[]
}
