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
  brand?: {
    id: number
    name: string
  }
  properties?: Record<string, string>
}
