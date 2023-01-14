import Head from 'next/head'
import { getAllProducts } from '@/lib/shopify'
import ProductCard from '@/components/ProductCard'

export default function Products({ products }) {
  return (
    <>
      <Head>
        <title>Next-Shopify | Products</title>
        <meta name="description" content="Next.js Shopify Storefront API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-white">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
          All Products
        </h2>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map(product => (
            <ProductCard key={product.node.id} product={product} />
          ))}
        </div>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const products = await getAllProducts()
  console.log('products:', products)

  return {
    props: {
      products
    }
  }
}
