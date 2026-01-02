import { Brand } from '../types.brands'
import { useBrandStore } from '../store.brands'
import { EditableField } from '@/components/ui/formFields/EditableField'

const EditableBrandName = ({ brand }: { brand: Brand }) => {
  const saveBrand = useBrandStore((e) => e.updateBrand)
  return (
    <EditableField
      value={brand.name}
      onSave={(newValue, br) => saveBrand(br.id, { name: newValue })}
      item={brand}
    ></EditableField>
  )
}

export default EditableBrandName
