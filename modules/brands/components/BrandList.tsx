'use client'

import { useEffect } from 'react'
import { useBrandStore } from '../store.brands'
import DataTable from '@/components/ui/DataTable'
import DeleteActionButton from '@/components/ui/actionButtons/DeleteActionButton'
import { EditableField } from '@/components/ui/formFields/EditableField'

const BrandList = () => {
  const brandList = useBrandStore((s) => s.brands)
  const fetchBrands = useBrandStore((s) => s.fetchBrands)
  const loading = useBrandStore((s) => s.loading)
  const deleteBrand = useBrandStore((s) => s.deleteBrand)
  const saveBrand = useBrandStore((s) => s.updateBrand)

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
          render: (brand) => (
            <EditableField
              item={brand}
              onSave={(newName, brand) => saveBrand(brand.id, { name: newName })}
              value={brand.name}
            />
          ),
        },
        {
          id: 'actions',
          header: 'Acciones',
          render: (brand) => (
            <DeleteActionButton item={brand} onDelete={deleteBrand}></DeleteActionButton>
          ),
        },
      ]}
    ></DataTable>
  )
}

export default BrandList
