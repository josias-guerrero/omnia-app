'use client'
import Card from '@/components/ui/formFields/Card'
import { useBrandStore } from '@/modules/brands/store.brands'
import { useCategoryStore } from '@/modules/categories/store.categories'
import { usePropertyStore } from '@/modules/properties/store.properties'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ProductFormData, productSchema } from '../schemas/product.schema'
import { useProductStore } from '../store'
import Button from '@/components/ui/formFields/Button'
import FieldError from '@/components/ui/formFields/FieldError'
import Input from '@/components/ui/formFields/Input'
import Select from '@/components/ui/formFields/Select'
import FieldLabel from '@/components/ui/formFields/FieldLabel'

type ProductFormProps = {
  productId?: string
}

export function ProductForm({ productId }: ProductFormProps) {
  const addProduct = useProductStore((s) => s.addProduct)
  const updateProduct = useProductStore((s) => s.updateProduct)
  const fetchProductById = useProductStore((s) => s.fetchProductById)

  const fetchBrands = useBrandStore((s) => s.fetchBrands)
  const brands = useBrandStore((s) => s.brands)

  const fetchProperties = usePropertyStore((s) => s.fetchProperties)
  const propertiesList = usePropertyStore((s) => s.properties)

  const fetchCategories = useCategoryStore((s) => s.fetchCategories)
  const categories = useCategoryStore((s) => s.categories)

  const isEditMode = Boolean(productId)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    control,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  })

  const [properties, setProperties] = useState<
    { selected: string; customName?: string; value: string }[]
  >([])

  useEffect(() => {
    fetchBrands()
    fetchCategories()
    fetchProperties()
  }, [fetchBrands, fetchCategories, fetchProperties])

  // 🔹 Cargar producto si es edición
  useEffect(() => {
    if (!productId) return

    const loadProduct = async () => {
      const product = await fetchProductById(productId)

      reset({
        name: product.name,
        sku: product.sku,
        barcode: product.barcode ? product.barcode : undefined,
        description: product.description,
        cost: product.cost,
        price: product.price,
        stock: product.stock,
        brandId: product.brand?.id,
        categoryIds: product.categories?.map((c) => c.id),
      })

      const propsArray = Object.entries(product.properties ?? {}).map(([key, value]) => ({
        selected: key,
        value,
      }))

      setProperties(propsArray)
    }

    loadProduct()
  }, [productId, fetchProductById, reset])

  const addPropertyField = () => {
    setProperties([...properties, { selected: '', value: '' }])
  }

  const updatePropertyField = (
    index: number,
    field: 'customName' | 'selected' | 'value',
    value: string
  ) => {
    const newProps = [...properties]
    newProps[index][field] = value
    setProperties(newProps)
  }

  const onSubmit = async (data: ProductFormData) => {
    const propsRecord: Record<string, string> = {}

    properties.forEach((p) => {
      let name = p.selected
      if (name === '__new__' && p.customName) {
        name = p.customName.trim().toLowerCase()
      }
      if (name && p.value) {
        propsRecord[name] = p.value
      }
    })

    if (isEditMode && productId) {
      await updateProduct(productId, { ...data, properties: propsRecord })
    } else {
      await addProduct({ ...data, properties: propsRecord })
    }
  }
  return (
    <div className='mx-auto max-w-4xl p-6'>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold text-gray-900'>
          {isEditMode ? 'Editar Producto' : 'Nuevo Producto'}
        </h1>
        <p className='text-sm text-gray-500'>Complete la información para registrar un producto.</p>
      </div>

      <Card>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
          {/* Información General */}
          <section>
            <h3 className='mb-4 text-lg font-medium text-gray-900'>Información General</h3>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <div className='md:col-span-2'>
                <FieldLabel htmlFor='name'>Nombre del Producto</FieldLabel>
                <Input placeholder='Ej. Camiseta Algodón' id='name' {...register('name')} />
                {errors.name && <FieldError>{errors.name.message}</FieldError>}
              </div>

              <div>
                <FieldLabel htmlFor='sku'>SKU</FieldLabel>
                <Input id='sku' placeholder='SKU-12345' {...register('sku')} />
                {errors.sku && <FieldError>{errors.sku.message}</FieldError>}
              </div>

              <div>
                <FieldLabel htmlFor='barcode'>Código de barras</FieldLabel>
                <Input id='barcode' placeholder='0000000000' {...register('barcode')} />
                {errors.barcode && <FieldError>{errors.barcode.message}</FieldError>}
              </div>

              <div className='md:col-span-2'>
                <FieldLabel htmlFor='description'>Descripción</FieldLabel>
                <Input
                  id='description'
                  placeholder='Descripción detallada...'
                  {...register('description')}
                />
              </div>
            </div>
          </section>

          <hr className='border-gray-200' />

          {/* Inventario y Precios */}
          <section>
            <h3 className='mb-4 text-lg font-medium text-gray-900'>Inventario y Precios</h3>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
              <div>
                <FieldLabel htmlFor='cost'>Costo</FieldLabel>
                <div className='relative'>
                  <span className='absolute left-3 top-2 text-gray-500'>$</span>
                  <Input
                    id='cost'
                    className='pl-7'
                    type='number'
                    step='0.01'
                    {...register('cost', { valueAsNumber: true })}
                  />
                </div>
              </div>

              <div>
                <FieldLabel htmlFor='price'>Precio de Venta</FieldLabel>
                <div className='relative'>
                  <span className='absolute left-3 top-2 text-gray-500'>$</span>
                  <Input
                    id='price'
                    className='pl-7'
                    type='number'
                    step='0.01'
                    {...register('price', { valueAsNumber: true })}
                  />
                </div>
              </div>

              <div>
                <FieldLabel htmlFor='stock'>Stock Inicial</FieldLabel>
                <Input id='stock' type='number' {...register('stock', { valueAsNumber: true })} />
              </div>
            </div>
          </section>

          <hr className='border-gray-200' />

          {/* Clasificación */}
          <section>
            <h3 className='mb-4 text-lg font-medium text-gray-900'>Clasificación</h3>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <div>
                <FieldLabel htmlFor='brand'>Marca</FieldLabel>
                <Select id='brand' {...register('brandId', { valueAsNumber: true })}>
                  {brands.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <FieldLabel>Categorías</FieldLabel>
                <Controller
                  control={control}
                  name='categoryIds'
                  render={({ field }) => (
                    <Select
                      multiple
                      className='h-32'
                      value={field.value?.map(String) || []}
                      onChange={(e) => {
                        const values = Array.from(e.target.selectedOptions, (opt) =>
                          Number(opt.value)
                        )
                        field.onChange(values)
                      }}
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </Select>
                  )}
                />
                <p className='mt-1 text-xs text-gray-500'>
                  Mantén presionado Ctrl (Windows) o Cmd (Mac) para seleccionar múltiples.
                </p>
                {errors.categoryIds && <FieldError>{errors.categoryIds?.message}</FieldError>}
              </div>
            </div>
          </section>

          <hr className='border-gray-200' />

          {/* Propiedades Dinámicas */}
          <section className='rounded-md bg-gray-50 p-4'>
            <div className='mb-4 flex items-center justify-between'>
              <h3 className='text-lg font-medium text-gray-900'>Propiedades Adicionales</h3>
              <Button type='button' onClick={addPropertyField} className='text-sm'>
                + Agregar Propiedad
              </Button>
            </div>

            <div className='space-y-3'>
              {properties.length === 0 && (
                <p className='text-center text-sm text-gray-500 italic'>
                  No hay propiedades adicionales.
                </p>
              )}

              {properties.map((prop, idx) => (
                <div
                  key={idx}
                  className='flex flex-col gap-2 rounded-md bg-white p-3 shadow-sm sm:flex-row'
                >
                  <div className='flex-1'>
                    <Select
                      value={prop.selected}
                      onChange={(e) => updatePropertyField(idx, 'selected', e.target.value)}
                    >
                      <option value=''>Seleccione...</option>
                      {propertiesList.map((p) => (
                        <option key={p.id} value={p.name.toLowerCase()}>
                          {p.name}
                        </option>
                      ))}
                      <option value='__new__'>+ Crear nueva...</option>
                    </Select>
                  </div>

                  {prop.selected === '__new__' && (
                    <div className='flex-1'>
                      <Input
                        placeholder='Nombre de la propiedad'
                        value={prop.customName || ''}
                        onChange={(e) => updatePropertyField(idx, 'customName', e.target.value)}
                      />
                    </div>
                  )}

                  <div className='flex-1'>
                    <Input
                      placeholder='Valor (ej. Rojo, XL)'
                      value={prop.value}
                      onChange={(e) => updatePropertyField(idx, 'value', e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className='flex justify-end pt-4'>
            <Button type='submit' disabled={isSubmitting} className='w-full md:w-auto px-8'>
              {isSubmitting ? 'Guardando...' : 'Guardar Producto'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
