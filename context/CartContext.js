import { createContext, useState } from "react"

export const CartContext = createContext()

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    const newCart = [...cart, product]
    setCart(newCart)
  }

  const removeFromCart = (product) => {
    const newCart = cart.filter((item) => item.id !== product.id)
    setCart(newCart)
  }

  const increaseQuantity = (product) => {
    const newCart = cart.map((item) => {
      if (item.id === product.id) {
        return {
          ...item,
          quantity: item.quantity + 1,
        }
      }
      return item
    })
    setCart(newCart)
  }

  const decreaseQuantity = (product) => {
    const newCart = cart.map((item) => {
      if (item.id === product.id) {
        return {
          ...item,
          quantity: item.quantity - 1,
        }
      }
      return item
    })
    setCart(newCart)
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
