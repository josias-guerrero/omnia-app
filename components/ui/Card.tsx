import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const Card = ({ children }: Props) => {
  return <div className='rounded-lg border border-gray-200 bg-white p-6 shadow-sm'>{children}</div>
}

export default Card
