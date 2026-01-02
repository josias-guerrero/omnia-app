'use client'

import DataTable from '@/components/ui/DataTable'
import { usePropertyStore } from '../store.properties'
import { EditableField } from '@/components/ui/formFields/EditableField'
import { useEffect } from 'react'
import DeleteActionButton from '@/components/ui/actionButtons/DeleteActionButton'

const PropertyList = () => {
  const propertyList = usePropertyStore((p) => p.properties)
  const loading = usePropertyStore((p) => p.loading)
  const fetchProperties = usePropertyStore((p) => p.fetchProperties)
  const deleteProperty = usePropertyStore((p) => p.delete)
  const updateProperty = usePropertyStore((p) => p.update)

  useEffect(() => {
    fetchProperties()
  }, [fetchProperties])

  return (
    <DataTable
      emptyMessage='No hay propiedades que mostrar'
      loading={loading}
      data={propertyList}
      columns={[
        {
          key: 'name',
          id: 'name',
          header: 'Propiedad',
          render: (prop) => (
            <EditableField
              item={prop}
              onSave={(newValue, property) => updateProperty(property.id, { name: newValue })}
              value={prop.name}
            ></EditableField>
          ),
        },
        {
          id: 'Actions',
          header: 'acciones',
          render: (prop) => (
            <DeleteActionButton item={prop} onDelete={deleteProperty}></DeleteActionButton>
          ),
        },
      ]}
    ></DataTable>
  )
}

export default PropertyList
