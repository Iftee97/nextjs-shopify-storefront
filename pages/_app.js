import '@/styles/globals.css'
import Layout from '@/components/Layout'
import { CartContextProvider } from '@/context/CartContext'

export default function App({ Component, pageProps }) {
  return (
    <CartContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartContextProvider>
  )
}
