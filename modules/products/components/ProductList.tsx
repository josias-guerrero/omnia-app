import { Product } from '@/modules/products/types.products'
import Link from 'next/link'

interface ProductListProps {
  products: Product[]
  loading?: boolean
}

export function ProductList({ products, loading }: ProductListProps) {
  if (loading) {
    return (
      <div className='flex items-center justify-center p-8'>
        <div className='h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500'></div>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-12 text-center bg-white'>
        <h3 className='text-lg font-medium text-gray-900'>No hay productos</h3>
        <p className='mt-1 text-sm text-gray-500'>Comienza agregando un nuevo producto a tu inventario.</p>
      </div>
    )
  }

  return (
    <div className='overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm'>
      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-200 text-left text-sm'>
          <thead className='bg-gray-50 text-gray-500'>
            <tr>
              <th className='px-6 py-3 font-medium'>SKU</th>
              <th className='px-6 py-3 font-medium'>Producto</th>
              <th className='px-6 py-3 font-medium'>Marca</th>
              <th className='px-6 py-3 font-medium'>Precio</th>
              <th className='px-6 py-3 font-medium'>Stock</th>
              <th className='px-6 py-3 font-medium text-right'>Acciones</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {products.map((product) => (
              <tr key={product.id} className='hover:bg-gray-50 transition-colors'>
                <td className='whitespace-nowrap px-6 py-4 text-gray-500'>{product.sku}</td>
                <td className='px-6 py-4 font-medium text-gray-900'>{product.name}</td>
                <td className='whitespace-nowrap px-6 py-4 text-gray-500'>
                  {product.brand?.name || '-'}
                </td>
                <td className='whitespace-nowrap px-6 py-4 font-medium text-gray-900'>
                  ${product.price.toFixed(2)}
                </td>
                <td className='whitespace-nowrap px-6 py-4'>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      product.stock > 10
                        ? 'bg-green-100 text-green-800'
                        : product.stock > 0
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {product.stock}
                  </span>
                </td>
                <td className='whitespace-nowrap px-6 py-4 text-right'>
                  <Link
                    href={`/dashboard/products/${product.id}`}
                    className='text-blue-600 hover:text-blue-900'
                  >
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
