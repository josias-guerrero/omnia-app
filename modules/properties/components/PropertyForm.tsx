'use client'
import { useForm } from 'react-hook-form'
import { usePropertyStore } from '../store.properties'
import Input from '@/components/ui/formFields/Input'
import Button from '@/components/ui/formFields/Button'

const PropertyForm = () => {
  const { register, handleSubmit, reset } = useForm<{ name: string }>()
  const createProperty = usePropertyStore((p) => p.create)

  const onSubmit = (data: { name: string }) => {
    createProperty(data)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex gap-2'>
      <Input {...register('name', { required: true })} placeholder='Nombre de nueva propiedad' />
      <Button>Guardar</Button>
    </form>
  )
}

export default PropertyForm
