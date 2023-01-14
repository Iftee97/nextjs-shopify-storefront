import Head from 'next/head'
import Link from 'next/link'
import { useContext } from "react"
import { CartContext } from "@/context/CartContext"

export default function Cart() {
  let { cart, removeFromCart } = useContext(CartContext)
  console.log('cart:', cart)

  const handleDelete = (product) => {
    removeFromCart(product)
  }

  return (
    <>
      <Head>
        <title>Next-Shopify | Cart</title>
        <meta name="description" content="Next.js Shopify Storefront API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className=''>
        <h3 className="text-3xl text-center mb-6">Cart</h3>
        <div className='bg-[#eee] max-w-[80%] mx-auto p-4 mb-4'>
          {cart.length > 0 ? (
            cart.map(item => (
              <div key={Date.now()} className='flex items-center gap-4'>
                <img src={item.images
                  ? item.images.edges[0].node.src
                  : 'https://via.placeholder.com/150'} alt={item.title} className='w-20 h-20 object-cover' />
                <div className='flex-1'>
                  <h4 className='text-lg font-medium'>{item.title}</h4>
                  <p className='text-sm'>
                    Price: <span className='font-medium'>${item.priceRange.minVariantPrice.amount}</span>
                  </p>
                  <p className='text-sm'>
                    Quantity: <span className='font-medium'>{item.quantity}</span>
                  </p>
                </div>
                <button
                  className='bg-red-500 text-white text-sm p-2'
                  onClick={() => handleDelete(item)}
                >
                  delete
                </button>
              </div>
            ))
          ) : (
            <span className='text-center block'>Your cart is empty</span>
          )}
        </div>

        {/* todo: redirect to shopify's checkout page on btn click */}
        <Link href='/'>
          <button
            className={`text-[#fff] text-sm rounded px-4 py-3 bg-[#1e3a8a] cursor-pointer block mx-auto ${!cart.length && 'opacity-50 pointer-events-none'}`}
            disabled={!cart.length}
          >
            Checkout
          </button>
        </Link>
      </div>
    </>
  )
}
