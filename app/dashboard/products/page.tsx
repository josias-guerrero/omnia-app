import { ProductList } from '@/modules/products/components/ProductList'
import Link from 'next/link'
import Button from '@/components/ui/formFields/Button'

export default function Page() {
  return (
    <div className='mx-auto max-w-6xl'>
      <div className='mb-6 flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>Productos</h1>
          <p className='text-sm text-gray-500'>Administra tu inventario y precios.</p>
        </div>
        <Link href='/dashboard/products/new'>
          <Button>+ Nuevo Producto</Button>
        </Link>
      </div>

      <ProductList />
    </div>
  )
}
