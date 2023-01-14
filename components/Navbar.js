import Link from 'next/link'
import { useContext } from "react"
import { CartContext } from "@/context/CartContext"

export default function Navbar() {
  const { cart } = useContext(CartContext)

  return (
    <nav className='bg-gray-100  mb-8'>
      <div className='max-w-7xl mx-auto p-4 flex items-center justify-between'>
        <span className='text-2xl font-bold'>
          <Link href='/'>Next-Shopify</Link>
        </span>
        <ul className='flex items-center gap-4 text-blue-500'>
          <li>
            <Link href='/collections'>
              Collections
            </Link>
          </li>
          <li>
            <Link href='/products'>
              Products
            </Link>
          </li>
          <li>
            <Link href='/cart' className='flex items-center gap-2'>
              <span>Cart</span>
              {cart.length > 0 && (
                <span className='bg-blue-500 text-white rounded-full p-1 text-xs'>
                  {cart.length}
                </span>
              )}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
