import Head from 'next/head'
import { getAllProducts, getAllCollections } from "../lib/shopify"
import ProductCard from "../components/ProductCard"
import CollectionCard from "../components/CollectionCard"

export default function Home({ products, collections }) {
  return (
    <>
      <Head>
        <title>Next-Shopify | Home</title>
        <meta name="description" content="Next.js Shopify Storefront API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-white">
        <h1 className='text-5xl mb-6 text-center font-bold'>
          Home
        </h1>
        <div className='mb-20'>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.slice(0, 6).map((product) => (
              <ProductCard key={product.node.id} product={product} />
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
            Featured Collections
          </h2>
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {collections.slice(0, 4).map(({ node }) => (
              <CollectionCard key={node.id} node={node} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const products = await getAllProducts()
  const collections = await getAllCollections()

  return {
    props: {
      products,
      collections
    }
  }
}
