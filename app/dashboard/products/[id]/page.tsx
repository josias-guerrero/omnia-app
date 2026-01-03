import { ProductForm } from '@/modules/products/components/ProductForm'

type Props = {
  params: Promise<{ id: string }>
}

const page = async ({ params }: Props) => {
  const { id } = await params
  return <ProductForm productId={id}></ProductForm>
}

export default page
