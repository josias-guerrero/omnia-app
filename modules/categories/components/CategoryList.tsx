'use client'
import DataTable from '@/components/ui/DataTable'
import { useCategoryStore } from '../store.categories'
import { useEffect } from 'react'
import { EditableField } from '@/components/ui/formFields/EditableField'
import DeleteActionButton from '@/components/ui/actionButtons/DeleteActionButton'

const CategoryList = () => {
  const categoryList = useCategoryStore((s) => s.categories)
  const fetchCategories = useCategoryStore((s) => s.fetchCategories)
  const loading = useCategoryStore((s) => s.loading)
  const updateCategory = useCategoryStore((s) => s.update)
  const deleteCategory = useCategoryStore((s) => s.delete)

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  return (
    <DataTable
      data={categoryList}
      emptyMessage='No hay categorias que mostrar'
      loading={loading}
      columns={[
        {
          key: 'name',
          id: 'name',
          header: 'Categoría',
          render: (category) => (
            <EditableField
              key={category.id}
              item={category}
              value={category.name}
              onSave={(newValue, cat) => updateCategory(cat.id, { name: newValue })}
            ></EditableField>
          ),
        },
        {
          key: 'description',
          id: 'description',
          header: 'Descripción',
          render: (category) => (
            <EditableField
              key={category.id}
              item={category}
              value={category.description}
              onSave={(newValue, cat) => updateCategory(cat.id, { description: newValue })}
            ></EditableField>
          ),
        },
        {
          id: 'Actions',
          header: 'acciones',
          render: (category) => (
            <DeleteActionButton item={category} onDelete={deleteCategory}></DeleteActionButton>
          ),
        },
      ]}
    ></DataTable>
  )
}

export default CategoryList
