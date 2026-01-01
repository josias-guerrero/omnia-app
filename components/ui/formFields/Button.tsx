import { ButtonHTMLAttributes } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement>
const Button = ({ className = '', ...props }: Props) => {
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 ${className}`}
    ></button>
  )
}

export default Button
