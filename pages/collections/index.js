import Head from 'next/head'
import { getAllCollections } from '@/lib/shopify'
import CollectionCard from '@/components/CollectionCard'

export default function Collections({ collections }) {
  return (
    <>
      <Head>
        <title>Next-Shopify | Collections</title>
        <meta name="description" content="Next.js Shopify Storefront API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-white">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
          All Collections
        </h2>
        <div className='mt-6 grid grid-cols-3 gap-6 items-center '>
          {collections.map(({ node }) => (
            <CollectionCard key={node.id} node={node} />
          ))}
        </div>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const collections = await getAllCollections()

  return {
    props: {
      collections
    }
  }
}
