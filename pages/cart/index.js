import { useContext } from "react"
import { CartContext } from "@/context/CartContext"

export default function Cart() {
  const { cart } = useContext(CartContext)
  console.log('cart:', cart)

  return (
    <>
      <h3 className="text-3xl text-center">Cart</h3>
    </>
  )
}
