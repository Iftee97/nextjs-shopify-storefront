export default function CollectionCard({ node }) {
  return (
    <div className='mb-8 bg-gray-200 hover:bg-gray-100 rounded-lg p-4 flex items-center justify-between'>
      <h3 className='text-xl font-medium text-gray-900'>
        {node.title}
      </h3>
      {node.image && (
        <img
          className='h-20 w-20 object-cover rounded-full'
          src={node.image.src}
          alt={(node.image.altText) || node.title}
        />
      )}
    </div>
  )
}
