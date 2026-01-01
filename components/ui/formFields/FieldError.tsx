import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const FieldError = ({ children }: Props) => {
  return <span className='mt-1 text-sm text-red-500'>{children}</span>
}

export default FieldError
