/* eslint-disable no-undef */
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      totalQuantity: 0,
      totalPrice: 0,

      // Añadir un producto al carrito
      addToCart: (product) => {
        const cartItems = get().cartItems
        const existingProduct = cartItems.find(item => item.id === product.id)

        if (existingProduct) {
          set({
            cartItems: cartItems.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
            totalQuantity: get().totalQuantity + 1,
            totalPrice: get().totalPrice + product.price
          })
        } else {
          set({
            cartItems: [...cartItems, { ...product, quantity: 1 }],
            totalQuantity: get().totalQuantity + 1,
            totalPrice: get().totalPrice + product.price
          })
        }

        console.log('Cart items:', get().cartItems)
      },

      // Eliminar un producto del carrito
      removeFromCart: (productId) => {
        const cartItems = get().cartItems
        const product = cartItems.find(item => item.id === productId)

        if (product) {
          set({
            cartItems: cartItems.filter(item => item.id !== productId),
            totalQuantity: get().totalQuantity - product.quantity,
            totalPrice: get().totalPrice - (product.price * product.quantity)
          })
        }
      },

      // Actualizar la cantidad de un producto en el carrito
      updateQuantity: (productId, quantity) => {
        const cartItems = get().cartItems
        const product = cartItems.find(item => item.id === productId)

        if (product) {
          const difference = quantity - product.quantity
          set({
            cartItems: cartItems.map(item =>
              item.id === productId ? { ...item, quantity } : item
            ),
            totalQuantity: get().totalQuantity + difference,
            totalPrice: get().totalPrice + (difference * product.price)
          })
        }
      },

      // Limpiar el carrito
      clearCart: () => {
        set({
          cartItems: [],
          totalQuantity: 0,
          totalPrice: 0
        })
      },

      // Mover un producto del carrito a los favoritos
      moveToFavorites: (product, addToFavorites) => {
        get().removeFromCart(product.id)
        addToFavorites(product)
      }
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)

export function useCart () {
  const cartItems = useCartStore((state) => state.cartItems)
  const totalQuantity = useCartStore((state) => state.totalQuantity)
  const totalPrice = useCartStore((state) => state.totalPrice)
  const addToCart = useCartStore((state) => state.addToCart)
  const removeFromCart = useCartStore((state) => state.removeFromCart)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const clearCart = useCartStore((state) => state.clearCart)
  const moveToFavorites = useCartStore((state) => state.moveToFavorites)

  return {
    cartItems,
    totalQuantity,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    moveToFavorites
  }
}
