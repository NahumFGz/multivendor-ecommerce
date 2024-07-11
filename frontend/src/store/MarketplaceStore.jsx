/* eslint-disable no-undef */
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { useProductsAPI } from '../features/Home/hooks/useProductsAPI'

const useMarketplaceStore = create(
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
        const vendorType = 2
        set({ isLoading: true })
        const response = await getProducts(params.currentPage, params.pageSize, params.ordering, params.selectedCategories, params.selectedSubCategories, vendorType)
        set({ products: response.products, totalProducts: response.totalProducts, isLoading: false })
      } catch (error) {
        console.error('Fetch products failed', error)
        set({ isLoading: false })
      }
    }
  }), {
    name: 'marketplace-storage',
    storage: createJSONStorage(() => sessionStorage)
  })
)

export function useMarketplace () {
  const products = useMarketplaceStore(state => state.products)
  const totalProducts = useMarketplaceStore(state => state.totalProducts)
  const isLoading = useMarketplaceStore(state => state.isLoading)
  const currentPage = useMarketplaceStore(state => state.currentPage)
  const pageSize = useMarketplaceStore(state => state.pageSize)
  const ordering = useMarketplaceStore(state => state.ordering)
  const selectedCategories = useMarketplaceStore(state => state.selectedCategories)
  const selectedSubCategories = useMarketplaceStore(state => state.selectedSubCategories)
  const searchQuery = useMarketplaceStore(state => state.searchQuery)
  const setProducts = useMarketplaceStore(state => state.setProducts)
  const setTotalProducts = useMarketplaceStore(state => state.setTotalProducts)
  const setLoading = useMarketplaceStore(state => state.setLoading)
  const setCurrentPage = useMarketplaceStore(state => state.setCurrentPage)
  const setPageSize = useMarketplaceStore(state => state.setPageSize)
  const setOrdering = useMarketplaceStore(state => state.setOrdering)
  const setSelectedCategories = useMarketplaceStore(state => state.setSelectedCategories)
  const setSelectedSubCategories = useMarketplaceStore(state => state.setSelectedSubCategories)
  const setSearchQuery = useMarketplaceStore(state => state.setSearchQuery)
  const fetchProducts = useMarketplaceStore(state => state.fetchProducts)

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
