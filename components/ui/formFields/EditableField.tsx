import { KeyboardEvent, useState } from 'react'

interface EditableFieldProps<T> {
  value: string
  onSave: (newValue: string, item: T) => void
  item: T
  className?: string
}

export function EditableField<T>({
  value,
  onSave,
  item,
  className = 'text-gray-600',
}: EditableFieldProps<T>) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)

  const save = () => {
    const newValue = draft.trim()

    if (newValue === value.trim()) {
      setEditing(false)
      return
    }

    onSave(newValue, item)
    setEditing(false)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      save()
    }

    if (e.key === 'Escape') {
      e.preventDefault()
      e.stopPropagation()
      setDraft(value)
      setEditing(false)
    }
  }

  return editing ? (
    <div className='flex gap-2'>
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => {
          setDraft(value)
          setEditing(false)
        }}
        autoFocus
        className={`border rounded px-2 py-1 text-sm ${className}`}
      />
      <button onClick={save} className='text-blue-600'>
        ✔
      </button>
      <button
        onClick={() => {
          setDraft(value)
          setEditing(false)
        }}
        className='text-gray-600'
      >
        ✖
      </button>
    </div>
  ) : (
    <span
      onClick={() => {
        setDraft(value)
        setEditing(true)
      }}
      className={`${className} cursor-pointer hover:underline`}
    >
      {value}
    </span>
  )
}
