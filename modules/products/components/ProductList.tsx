'use client'

import PaginatedDataTable from '@/components/ui/PaginatedDataTable'
import Link from 'next/link'
import { useProductStore } from '../store'
import { useEffect } from 'react'

export function ProductList() {
  const fetchPage = useProductStore((e) => e.fetchProducts)
  const page = useProductStore((e) => e.productsPage)
  const loading = useProductStore((e) => e.loading)
  const setPage = useProductStore((e) => e.setPage)
  const setSize = useProductStore((e) => e.setSize)

  useEffect(() => {
    fetchPage()
  }, [fetchPage])

  if (!page) {
    return (
      <div className='flex items-center justify-center p-8'>
        <div className='h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500'></div>
      </div>
    )
  }

  return (
    <PaginatedDataTable
      page={page}
      emptyMessage='No hay productos que mostrar'
      loading={loading}
      onPageChange={setPage}
      onSizeChange={setSize}
      columns={[
        { id: 'sku', key: 'sku', header: 'SKU' },
        { id: 'name', key: 'name', header: 'Producto' },
        { id: 'brand', key: 'brand', header: 'Marca', render: (p) => p.brand?.name || '-' },
        { id: 'price', key: 'price', header: 'Precio', render: (p) => `$${p.price.toFixed(2)}` },
        {
          id: 'stock',
          key: 'stock',
          header: 'Stock',
          render: (p) => (
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                p.stock > 10
                  ? 'bg-green-100 text-green-800'
                  : p.stock > 0
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
              }`}
            >
              {p.stock}
            </span>
          ),
        },
        {
          id: 'categories',
          key: 'categories',
          header: 'Categorías',
          render: (p) => {
            if (!p.categories || p.categories.length === 0) return '-'

            const names = p.categories.map((c) => c.name)
            const visible = names.slice(0, 2)
            const extra = names.length - visible.length

            return (
              <span className='text-sm'>
                {visible.join(', ')}
                {extra > 0 && <span className='ml-1 text-gray-400'>+{extra}</span>}
              </span>
            )
          },
        },
        {
          id: 'properties',
          key: 'properties',
          header: 'Props',
          className: 'text-center',

          render: (p) =>
            p.properties && Object.keys(p.properties).length > 0 ? (
              <span className='inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs'>
                {Object.keys(p.properties).length}
              </span>
            ) : (
              '-'
            ),
        },
        {
          id: 'actions',
          header: 'Acciones',
          render: (p) => (
            <Link
              href={`/dashboard/products/${p.id}`}
              className=' text-blue-600 hover:text-blue-900'
            >
              Editar
            </Link>
          ),
          className: 'text-right',
        },
      ]}
    />
  )
}
