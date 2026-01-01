import Card from '@/components/ui/formFields/Card'
import BrandForm from '@/modules/brands/components/BrandForm'
import BrandList from '@/modules/brands/components/BrandList'

const page = () => {
  return (
    <div>
      <Card className='flex flex-col gap-2'>
        <BrandForm />
        <BrandList></BrandList>
      </Card>
    </div>
  )
}

export default page
