
import Link from 'next/link'

const Sidebar = () => {
  const links = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Productos', href: '/dashboard/products' },
    { name: 'Ventas', href: '/dashboard/sales' },
    { name: 'Reportes', href: '/dashboard/reports' },
    { name: 'Configuración', href: '/dashboard/settings' },
  ]

  return (
    <aside className='flex h-screen w-64 flex-col bg-gray-900 text-white'>
      <div className='flex h-16 items-center justify-center border-b border-gray-800 text-xl font-bold tracking-wider'>
        OMNIA
      </div>
      <nav className='flex-1 py-6'>
        <ul className='space-y-1'>
          {links.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className='block border-l-4 border-transparent px-6 py-3 text-gray-400 transition-colors hover:border-blue-500 hover:bg-gray-800 hover:text-white'
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className='border-t border-gray-800 p-4'>
        <div className='flex items-center gap-3'>
          <div className='h-8 w-8 rounded-full bg-blue-500'></div>
          <div>
            <p className='text-sm font-medium text-white'>Josias Guerrero</p>
            <p className='text-xs text-gray-500'>Admin</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
