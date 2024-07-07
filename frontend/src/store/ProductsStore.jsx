/* eslint-disable no-undef */
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { useProductsAPI } from '../features/Home/hooks/useProductsAPI'

const useProductsStore = create(
  persist((set) => ({
    products: [],
    totalProducts: 0,
    isLoading: true,
    currentPage: 1,
    pageSize: 12,
    ordering: '',
    selectedCategories: [],
    selectedSubCategories: [],
    searchQuery: '',
    setProducts: (products) => set({ products }),
    setTotalProducts: (totalProducts) => set({ totalProducts }),
    setLoading: (isLoading) => set({ isLoading }),
    setCurrentPage: (currentPage) => set({ currentPage }),
    setPageSize: (pageSize) => set({ pageSize }),
    setOrdering: (ordering) => set({ ordering }),
    setSelectedCategories: (selectedCategories) => set({ selectedCategories }),
    setSelectedSubCategories: (selectedSubCategories) => set({ selectedSubCategories }),
    setSearchQuery: (searchQuery) => set({ searchQuery }),
    fetchProducts: async (params) => {
      console.log('fetchProducts', params)
      try {
        const { getProducts } = useProductsAPI()
        set({ isLoading: true })
        const response = await getProducts(
          params.currentPage,
          params.pageSize,
          params.ordering,
          params.selectedCategories,
          params.selectedSubCategories,
          params.searchQuery
        )
        set({ products: response.products, totalProducts: response.totalProducts, isLoading: false })
      } catch (error) {
        console.error('Fetch products failed', error)
        set({ isLoading: false })
      }
    }
  }), {
    name: 'products-storage',
    storage: createJSONStorage(() => sessionStorage)
  })
)

export function useProducts () {
  const products = useProductsStore(state => state.products)
  const totalProducts = useProductsStore(state => state.totalProducts)
  const isLoading = useProductsStore(state => state.isLoading)
  const currentPage = useProductsStore(state => state.currentPage)
  const pageSize = useProductsStore(state => state.pageSize)
  const ordering = useProductsStore(state => state.ordering)
  const selectedCategories = useProductsStore(state => state.selectedCategories)
  const selectedSubCategories = useProductsStore(state => state.selectedSubCategories)
  const searchQuery = useProductsStore(state => state.searchQuery)
  const setProducts = useProductsStore(state => state.setProducts)
  const setTotalProducts = useProductsStore(state => state.setTotalProducts)
  const setLoading = useProductsStore(state => state.setLoading)
  const setCurrentPage = useProductsStore(state => state.setCurrentPage)
  const setPageSize = useProductsStore(state => state.setPageSize)
  const setOrdering = useProductsStore(state => state.setOrdering)
  const setSelectedCategories = useProductsStore(state => state.setSelectedCategories)
  const setSelectedSubCategories = useProductsStore(state => state.setSelectedSubCategories)
  const setSearchQuery = useProductsStore(state => state.setSearchQuery)
  const fetchProducts = useProductsStore(state => state.fetchProducts)

  return {
    products,
    totalProducts,
    isLoading,
    currentPage,
    pageSize,
    ordering,
    selectedCategories,
    selectedSubCategories,
    searchQuery,
    setProducts,
    setTotalProducts,
    setLoading,
    setCurrentPage,
    setPageSize,
    setOrdering,
    setSelectedCategories,
    setSelectedSubCategories,
    setSearchQuery,
    fetchProducts
  }
}
