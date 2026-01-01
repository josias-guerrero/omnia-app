import { LabelHTMLAttributes } from 'react'

type Props = LabelHTMLAttributes<HTMLLabelElement>
const FieldLabel = ({ children, className, ...props }: Props) => {
  return (
    <label {...props} className={`mb-1 block text-sm font-medium text-gray-700 ${className ?? ''}`}>
      {children}
    </label>
  )
}

export default FieldLabel
