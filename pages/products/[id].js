import Head from 'next/head'
import { useContext, useState } from 'react'
import { CartContext } from '@/context/CartContext'
import { getAllProducts, getSingleProduct } from '@/lib/shopify'

export default function Product({ product }) {
  const { title, description } = product
  const { src, altText } = product.images.edges[0].node
  const { amount } = product.priceRange.minVariantPrice

  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useContext(CartContext)

  const handleClick = () => {
    addToCart(product)
  }

  return (
    <>
      <Head>
        <title>Next-Shopify | {title}</title>
        <meta name="description" content="Next.js Shopify Storefront API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-white">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
          {title}
        </h2>
        <div className='bg-slate-100 p-4 flex items-start gap-4'>
          <img
            src={src}
            alt={altText || title}
            className='w-1/2'
          />
          <div className='w-1/2'>
            <p className='text-slate-900 text-xl font-normal leading-[1.8rem] mb-6'>
              {description}
            </p>
            <div className='my-4 flex items-center gap-2'>
              <label htmlFor="qty" className='text-base font-medium'>
                Quantity:
              </label>
              <input
                type="number"
                id='qty'
                name='qty'
                min='1'
                max='10'
                className='p-1 focus:outline-none rounded border border-slate-300'
                onChange={(e) => setQuantity(e.target.value)}
                value={quantity}
              />
            </div>
            <p className='text-slate-900 text-lg font-medium'>
              Price: ${parseFloat((amount * quantity).toFixed(2))}
            </p>
            <button
              className='bg-[#0284c7] text-white text-sm rounded px-4 py-3 mt-4'
              onClick={handleClick}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getStaticPaths() {
  const products = await getAllProducts()
  const paths = products.map(product => ({
    params: {
      id: product.node.handle
    }
  }))

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const product = await getSingleProduct(params.id)
  console.log('product:', product)

  return {
    props: {
      product
    }
  }
}
