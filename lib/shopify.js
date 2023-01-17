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
    products(first: 250) {
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
      variants(first: 10) {
        edges {
          node {
            id
            image {
              src
              altText
            }
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

// merchandiseId: gid://shopify/ProductVariant/44208420225344
export async function createCart(quantity, merchandiseId) {
  const query = `mutation {
    cartCreate(input: {
      lines: [{ quantity: ${quantity}, merchandiseId: "${merchandiseId}" }], 
      attributes: { key: "cart_attribute", value: "This is a cart attribute" }
    }) {
      cart {
        id
        createdAt
        updatedAt
        lines(first: 10) {
          edges {
            node {
              id
              merchandise {
                ... on ProductVariant {
                  id
                }
              }
            }
          }
        }
        attributes {
          key
          value
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
          totalTaxAmount {
            amount
            currencyCode
          }
          totalDutyAmount {
            amount
            currencyCode
          }
        }
      }
    }
  }`

  const response = await ShopifyData(query)
  // console.log('cart response:', response)
  const cart = response.data.cartCreate || {}
  return cart
}
