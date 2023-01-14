import Link from 'next/link'

export default function ProductCard({ product }) {
  const { handle, title } = product.node
  const { altText, src } = product.node.images.edges[0].node
  const price = product.node.priceRange.minVariantPrice.amount

  return (
    <Link href={`/products/${handle}`}>
      <span className="group">
        <div className="w-full bg-gray-200 rounded-3xl overflow-hidden">
          <div className="relative group-hover:opacity-75">
            <img src={src} alt={altText || `${title} image`} />
          </div>
        </div>
        <h3 className="mt-4 text-lg font-medium text-gray-900">{title}</h3>
        <p className="mt-1 text-sm text-gray-700">${price}</p>
      </span>
    </Link>
  )
}
