interface Props<T extends { id: string | number }> {
  onDelete: (id: T['id']) => void
  item: T
}

function DeleteActionButton<T extends { id: string | number }>({ onDelete, item }: Props<T>) {
  return (
    <button onClick={() => onDelete(item.id)} className='text-red-600 hover:text-red-900'>
      Eliminar
    </button>
  )
}

export default DeleteActionButton
