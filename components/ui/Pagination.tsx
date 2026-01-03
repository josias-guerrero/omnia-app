interface PaginationProps {
  currentPage: number
  totalPages: number
  pageSize: number
  totalElements: number
  isFirst: boolean
  isLast: boolean
  onPageChange: (page: number) => void
  onSizeChange: (size: number) => void
}

function Pagination({
  currentPage,
  totalElements,
  totalPages,
  pageSize,
  isFirst,
  isLast,
  onPageChange,
  onSizeChange,
}: PaginationProps) {
  const pageSizes = [10, 20, 50, 100]

  const startItem = currentPage * pageSize + 1
  const endItem = Math.min((currentPage + 1) * pageSize, totalElements)

  return (
    <div className='flex items-center justify-between border rounded-md border-gray-200 bg-white px-4 py-3 sm:px-6'>
      {/* Info de elementos */}
      <div className='flex flex-1 justify-between sm:hidden'>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={isFirst}
          className='relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
        >
          Anterior
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={isLast}
          className='relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
        >
          Siguiente
        </button>
      </div>

      <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
        <div className='flex items-center gap-4'>
          <p className='text-sm text-gray-700'>
            Mostrando <span className='font-medium'>{startItem}</span> a{' '}
            <span className='font-medium'>{endItem}</span> de{' '}
            <span className='font-medium'>{totalElements}</span> resultados
          </p>

          {/* Selector de tamaño de página */}
          <select
            value={pageSize}
            onChange={(e) => onSizeChange(Number(e.target.value))}
            className='rounded-md border text-gray-500 border-gray-300 py-1 px-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
          >
            {pageSizes.map((size) => (
              <option key={size} value={size}>
                {size} por página
              </option>
            ))}
          </select>
        </div>

        {/* Controles de navegación */}
        <nav className='isolate inline-flex -space-x-px rounded-md shadow-sm'>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={isFirst}
            className='relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            <span className='sr-only'>Anterior</span>
            <svg className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
              <path
                fillRule='evenodd'
                d='M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z'
                clipRule='evenodd'
              />
            </svg>
          </button>

          {/* Números de página */}
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
            let pageNum
            if (totalPages <= 5) {
              pageNum = i
            } else if (currentPage < 3) {
              pageNum = i
            } else if (currentPage > totalPages - 4) {
              pageNum = totalPages - 5 + i
            } else {
              pageNum = currentPage - 2 + i
            }

            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                  pageNum === currentPage
                    ? 'z-10 bg-blue-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                    : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20'
                }`}
              >
                {pageNum + 1}
              </button>
            )
          })}

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={isLast}
            className='relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            <span className='sr-only'>Siguiente</span>
            <svg className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
              <path
                fillRule='evenodd'
                d='M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z'
                clipRule='evenodd'
              />
            </svg>
          </button>
        </nav>
      </div>
    </div>
  )
}

export default Pagination
