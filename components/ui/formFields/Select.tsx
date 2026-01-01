import { forwardRef, SelectHTMLAttributes } from 'react'

type Props = SelectHTMLAttributes<HTMLSelectElement>

const Select = forwardRef<HTMLSelectElement, Props>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        {...props}
        className={`w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      >
        {children}
      </select>
    )
  }
)

Select.displayName = 'Select'

export default Select
