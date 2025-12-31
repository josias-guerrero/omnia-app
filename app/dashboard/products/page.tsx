'use client'

import { useProductStore } from '@/modules/products/store'
import { useEffect } from 'react'

export default function Page() {
  const { products, fetchProducts, loading } = useProductStore()

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  if (loading) return <p>Cargando...</p>

  return (
    <div>
      <h1>Productos</h1>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} - {p.price}
          </li>
        ))}
      </ul>
    </div>
  )
}
