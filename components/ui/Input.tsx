import { forwardRef, InputHTMLAttributes } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement>

const Input = forwardRef<HTMLInputElement, Props>(({ className = '', ...props }, ref) => {
  return (
    <input
      ref={ref}
      {...props}
      className={`w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    />
  )
})

Input.displayName = 'Input'

export default Input
