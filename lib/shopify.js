const domain = process.env.SHOPIFY_STORE_DOMAIN
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN

async function ShopifyData(query) {
  const URL = `https://${domain}/api/2022-07/graphql.json`

  const options = {
    endpoint: URL,
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query })
  }

  try {
    const response = await fetch(URL, options)
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error("Error: Products not fetched")
  }
}

export async function getAllProducts() {
  const query = `{
    products(first: 50) {
      edges {
        node {
          id
          title
          handle
          description
          priceRange {
            maxVariantPrice {
              amount
              currencyCode
            }
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                src
                altText
              }
            }
          }
        }
      }
    }
  }`

  const response = await ShopifyData(query)
  const allProducts = response.data.products.edges || []
  return allProducts
}

export async function getSingleProduct(handle) {
  const query = `{
    productByHandle(handle: "${handle}") {
      id
      title
      handle
      description
      priceRange {
        maxVariantPrice {
          amount
          currencyCode
        }
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 1) {
        edges {
          node {
            src
            altText
          }
        }
      }
    }
  }`

  const response = await ShopifyData(query)
  const product = response.data.productByHandle || []
  return product
}

export async function getAllCollections() {
  const query = `{
    collections(first: 10) {
      edges {
        node {
          id
          title
          description
          image {
            src
            altText
          }
        }
      }
    }
  }`

  const response = await ShopifyData(query)
  const allCollections = response.data.collections.edges || []
  return allCollections
}
