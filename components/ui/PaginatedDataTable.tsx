import { Page } from '@/modules/shared/shared.types'
import DataTable, { Column } from './DataTable'
import Pagination from './Pagination'

type PaginatedDataTableProps<T> = {
  page: Page<T>
  columns: Column<T>[]
  loading?: boolean
  emptyMessage?: string
  onPageChange?: (page: number) => void
  onSizeChange?: (size: number) => void
}

function PaginatedDataTable<T extends { id: string | number }>({
  page,
  columns,
  loading,
  emptyMessage,
  onPageChange = () => {},
  onSizeChange = () => {},
}: PaginatedDataTableProps<T>) {
  return (
    <div className='space-y-2'>
      <DataTable
        data={page.content}
        columns={columns}
        loading={loading}
        emptyMessage={emptyMessage}
      />

      {!loading && !page.empty && (
        <Pagination
          currentPage={page.page}
          totalPages={page.totalPages}
          pageSize={page.size}
          totalElements={page.totalElements}
          isFirst={page.first}
          isLast={page.page >= page.totalPages - 1}
          onPageChange={onPageChange}
          onSizeChange={onSizeChange}
        />
      )}
    </div>
  )
}

export default PaginatedDataTable
