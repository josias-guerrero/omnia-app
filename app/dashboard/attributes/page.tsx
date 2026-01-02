import Card from '@/components/ui/formFields/Card'
import BrandForm from '@/modules/brands/components/BrandForm'
import BrandList from '@/modules/brands/components/BrandList'
import CategoryForm from '@/modules/categories/components/CategoryForm'
import CategoryList from '@/modules/categories/components/CategoryList'
import PropertyForm from '@/modules/properties/components/PropertyForm'
import PropertyList from '@/modules/properties/components/PropertyList'

const page = () => {
  return (
    <div className='flex justify-evenly'>
      <Card className='flex flex-col gap-2'>
        <h1 className='text-2xl font-bold text-gray-900'>Categorias</h1>
        <CategoryForm></CategoryForm>
        <CategoryList></CategoryList>
      </Card>
      <Card className='flex flex-col gap-2'>
        <h1 className='text-2xl font-bold text-gray-900'>Marcas</h1>
        <BrandForm />
        <BrandList></BrandList>
      </Card>
      <Card className='flex flex-col gap-2'>
        <h1 className='text-2xl font-bold text-gray-900'>Propiedades de productos</h1>
        <PropertyForm></PropertyForm>
        <PropertyList></PropertyList>
      </Card>
    </div>
  )
}

export default page
