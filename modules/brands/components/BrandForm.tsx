'use client'
import { useBrandStore } from '../store.brands'
import Input from '@/components/ui/formFields/Input'
import Button from '@/components/ui/formFields/Button'
import { useForm } from 'react-hook-form'

const BrandForm = () => {
  const { register, handleSubmit, reset } = useForm<{ name: string }>()
  const saveBrand = useBrandStore((s) => s.createBrand)

  const onSubmit = async (data: { name: string }) => {
    await saveBrand(data)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex gap-2'>
      <Input {...register('name', { required: true })} placeholder='Nombre de nueva marca' />
      <Button>Guardar</Button>
    </form>
  )
}

export default BrandForm
