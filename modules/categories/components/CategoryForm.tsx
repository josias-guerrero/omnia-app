'use client'

import { useForm } from 'react-hook-form'
import { useCategoryStore } from '../store.categories'
import Button from '@/components/ui/formFields/Button'
import Input from '@/components/ui/formFields/Input'

const CategoryForm = () => {
  const { register, handleSubmit, reset } = useForm<{ name: string; description?: string }>()
  const createCategory = useCategoryStore((c) => c.create)

  const onSubmit = async (data: { name: string; description?: string }) => {
    await createCategory(data)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex gap-2'>
      <Input {...register('name', { required: true })} placeholder='Nombre de categoria' />
      <Input {...register('description')} placeholder='Descripcion de categoria' />
      <Button>Guardar</Button>
    </form>
  )
}

export default CategoryForm
