'use client'

import { useEffect } from 'react'
import { useBrandStore } from '../store.brands'
import DataTable from '@/components/ui/DataTable'
import EditableBrandName from './EditableBrandName'

const BrandList = () => {
  const brandList = useBrandStore((s) => s.brands)
  const fetchBrands = useBrandStore((s) => s.fetchBrands)
  const loading = useBrandStore((s) => s.loading)
  const deleteBrand = useBrandStore((s) => s.deleteBrand)

  useEffect(() => {
    fetchBrands()
  }, [fetchBrands])
  return (
    <DataTable
      data={brandList}
      loading={loading}
      emptyMessage='No hay marcas registradas'
      columns={[
        {
          id: 'name',
          key: 'name',
          header: 'Marca',
          render: (brand) => <EditableBrandName brand={brand} />,
        },
        {
          id: 'actions',
          header: 'Acciones',
          render: (brand) => (
            <button
              onClick={() => deleteBrand(brand.id)}
              className='text-red-600 hover:text-red-900'
            >
              Eliminar
            </button>
          ),
        },
      ]}
    ></DataTable>
  )
}

export default BrandList
