import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className='flex items-center justify-between bg-gray-100 px-20 py-4 mb-8'>
      <span className='text-2xl font-bold'>
        <Link href='/'>Next-Shopify</Link>
      </span>
      <ul className='flex items-center justify-between gap-4 text-blue-500'>
        <li>
          <Link href='/products'>Products</Link>
        </li>
        <li>
          <Link href='/collections'>Collections</Link>
        </li>
        <li>
          <Link href='/cart'>Cart</Link>
        </li>
      </ul>
    </nav>
  )
}
