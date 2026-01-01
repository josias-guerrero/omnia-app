import { ReactNode } from 'react'

interface Column<T> {
  id: string
  key?: keyof T
  header: string
  render?: (item: T) => ReactNode
  className?: string
}

type DataTableProps<T> = {
  data: T[]
  columns: Column<T>[]
  loading?: boolean
  emptyMessage?: string
}

function DataTable<T extends { id: string | number }>({
  data,
  columns,
  loading,
  emptyMessage = 'No hay datos disponibles',
}: DataTableProps<T>) {
  if (loading) {
    return (
      <div className='flex items-center justify-center p-8'>
        <div className='h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500'></div>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-12 text-center bg-white'>
        <h3 className='text-lg font-medium text-gray-900'>{emptyMessage}</h3>
        <p className='mt-1 text-sm text-gray-500'>Comienza agregando datos.</p>
      </div>
    )
  }
  return (
    <div className='overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm'>
      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-200 text-left text-sm'>
          <thead className='bg-gray-50 text-gray-500'>
            <tr>
              {columns.map((col) => (
                <th key={col.id} className={`px-6 py-3 font-medium ${col.className ?? ''}`}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {data.map((item) => (
              <tr key={item.id}>
                {columns.map((col) => (
                  <td key={col.id} className='px-6 py-4'>
                    {col.render ? col.render(item) : col.key ? String(item[col.key]) : null}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DataTable
