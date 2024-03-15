import { createContext, useReducer } from 'react'
import { cartInitialState, cartReducer } from '../reducers/cart.js'

export const CartContext = createContext()

function useCartReducer () {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState)

  const addToCart = (product) => dispatch({
    type: 'ADD_TO_CART',
    payload: product
  })

  const removeFromCart = (product) => dispatch({
    type: 'REMOVE_FROM_CART',
    payload: product
  })

  const clearCart = () => dispatch({
    type: 'CLEAR_CART'
  })

  return {
    state,
    addToCart,
    removeFromCart,
    clearCart
  }
}

export function CartProvider ({ children }) {
  /* antes de usar un reducer

    const [cart, setCart] = useState([])

    const addToCart = product => {
      const productInCartIndex = cart.findIndex(item => item.id === product.id)

      if (productInCartIndex >= 0) {
        const newCart = structuredClone(cart)
        newCart[productInCartIndex].quantity++
        return setCart(newCart)
      }

      setCart(prevState => (
        [
          ...prevState,
          {
            ...product,
            quantity: 1
          }
        ]
      ))
    }

    const clearCart = () => {
      setCart([])
    }

    const removeFromCart = product => {
      setCart(prevState => prevState.filter(item => item.id !== product.id))
    }

  */

  const { state, addToCart, removeFromCart, clearCart } = useCartReducer()

  return (
    <CartContext.Provider value={{ cart: state, addToCart, clearCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  )
}
