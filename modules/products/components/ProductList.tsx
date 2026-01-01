import DataTable from '@/components/ui/DataTable'
import { Product } from '@/modules/products/types.products'
import Link from 'next/link'

interface ProductListProps {
  products: Product[]
  loading?: boolean
}

export function ProductList({ products, loading }: ProductListProps) {
  return (
    <DataTable
      data={products}
      loading={loading}
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
          id: 'actions',
          header: 'Acciones',
          render: (p) => (
            <Link
              href={`/dashboard/products/${p.id}`}
              className='text-blue-600 hover:text-blue-900'
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
