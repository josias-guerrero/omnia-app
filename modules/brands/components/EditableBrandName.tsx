import { useState } from 'react'
import { Brand } from '../types.brands'
import { useBrandStore } from '../store.brands'

const EditableBrandName = ({ brand }: { brand: Brand }) => {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(brand.name)
  const saveBrand = useBrandStore((s) => s.updateBrand)

  const save = () => {
    saveBrand(brand.id, { name: value })
    setEditing(false)
  }

  return editing ? (
    <div className='flex gap-2'>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className='text-gray-600 border rounded px-2 py-1 text-sm'
      />
      <button onClick={save} className='text-blue-600'>
        ✔
      </button>
      <button onClick={() => setEditing(false)} className='text-gray-600'>
        ✖
      </button>
    </div>
  ) : (
    <span onClick={() => setEditing(true)} className='text-gray-600 cursor-pointer hover:underline'>
      {brand.name}
    </span>
  )
}

export default EditableBrandName
