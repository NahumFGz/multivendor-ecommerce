/* eslint-disable no-undef */
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { useProductsAPI } from '../features/Home/hooks/useProductsAPI'

const usePromosStore = create(
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
      try {
        const { getProducts } = useProductsAPI()
        set({ isLoading: true })
        const response = await getProducts(params.currentPage, params.pageSize, params.ordering, params.selectedCategories, params.selectedSubCategories)
        set({ products: response.products, totalProducts: response.totalProducts, isLoading: false })
      } catch (error) {
        console.error('Fetch products failed', error)
        set({ isLoading: false })
      }
    }
  }), {
    name: 'promos-storage',
    storage: createJSONStorage(() => sessionStorage)
  })
)

export function usePromos () {
  const products = usePromosStore(state => state.products)
  const totalProducts = usePromosStore(state => state.totalProducts)
  const isLoading = usePromosStore(state => state.isLoading)
  const currentPage = usePromosStore(state => state.currentPage)
  const pageSize = usePromosStore(state => state.pageSize)
  const ordering = usePromosStore(state => state.ordering)
  const selectedCategories = usePromosStore(state => state.selectedCategories)
  const selectedSubCategories = usePromosStore(state => state.selectedSubCategories)
  const searchQuery = usePromosStore(state => state.searchQuery)
  const setProducts = usePromosStore(state => state.setProducts)
  const setTotalProducts = usePromosStore(state => state.setTotalProducts)
  const setLoading = usePromosStore(state => state.setLoading)
  const setCurrentPage = usePromosStore(state => state.setCurrentPage)
  const setPageSize = usePromosStore(state => state.setPageSize)
  const setOrdering = usePromosStore(state => state.setOrdering)
  const setSelectedCategories = usePromosStore(state => state.setSelectedCategories)
  const setSelectedSubCategories = usePromosStore(state => state.setSelectedSubCategories)
  const setSearchQuery = usePromosStore(state => state.setSearchQuery)
  const fetchProducts = usePromosStore(state => state.fetchProducts)

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
