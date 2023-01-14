import Head from 'next/head'
import { useContext } from "react"
import { CartContext } from "@/context/CartContext"

export default function Cart() {
  const { cart } = useContext(CartContext)
  console.log('cart:', cart)

  return (
    <>
      <Head>
        <title>Next-Shopify | Cart</title>
        <meta name="description" content="Next.js Shopify Storefront API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='bg-[#fff]'>
        <h3 className="text-3xl text-center">Cart</h3>


        {/* todo: redirect to shopify's checkout page on btn click */}
        <button className='bg-[#1e3a8a] text-[#fff] text-sm rounded px-4 py-3'>
          Checkout
        </button>
      </div>
    </>
  )
}
