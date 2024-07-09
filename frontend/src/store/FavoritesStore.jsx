/* eslint-disable no-undef */
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const useFavoritesStore = create(
  persist(
    (set, get) => ({
      favoriteItems: [],

      // Añadir un producto a los favoritos
      addToFavorites: (product) => {
        const favoriteItems = get().favoriteItems
        if (!favoriteItems.find(item => item.id === product.id)) {
          set({
            favoriteItems: [...favoriteItems, product]
          })
        }
      },

      // Eliminar un producto de los favoritos
      removeFromFavorites: (productId) => {
        const favoriteItems = get().favoriteItems
        set({
          favoriteItems: favoriteItems.filter(item => item.id !== productId)
        })
      },

      // Mover un producto de favoritos al carrito
      moveToCart: (product, addToCart) => {
        get().removeFromFavorites(product.id)
        addToCart(product)
      }
    }),
    {
      name: 'favorites-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
)

export function useFavorites () {
  const favoriteItems = useFavoritesStore((state) => state.favoriteItems)
  const addToFavorites = useFavoritesStore((state) => state.addToFavorites)
  const removeFromFavorites = useFavoritesStore((state) => state.removeFromFavorites)
  const moveToCart = useFavoritesStore((state) => state.moveToCart)

  return {
    favoriteItems,
    addToFavorites,
    removeFromFavorites,
    moveToCart
  }
}
