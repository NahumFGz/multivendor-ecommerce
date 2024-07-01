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
    setProducts: (products) => set({ products }),
    setTotalProducts: (totalProducts) => set({ totalProducts }),
    setLoading: (isLoading) => set({ isLoading }),
    setCurrentPage: (currentPage) => set({ currentPage }),
    setPageSize: (pageSize) => set({ pageSize }),
    setOrdering: (ordering) => set({ ordering }),
    setSelectedCategories: (selectedCategories) => set({ selectedCategories }),
    setSelectedSubCategories: (selectedSubCategories) => set({ selectedSubCategories }),
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
    },
    updateUrlParams: (params, navigate, location) => {
      const searchParams = new URLSearchParams(location.search)
      searchParams.set('page', params.currentPage)
      searchParams.set('pageSize', params.pageSize)
      if (params.ordering) {
        searchParams.set('ordering', params.ordering)
      } else {
        searchParams.delete('ordering')
      }
      if (params.selectedCategories.length > 0) {
        searchParams.set('categories', params.selectedCategories.join(','))
      } else {
        searchParams.delete('categories')
      }
      if (params.selectedSubCategories.length > 0) {
        searchParams.set('sub_categories', params.selectedSubCategories.join(','))
      } else {
        searchParams.delete('sub_categories')
      }
      navigate({
        pathname: location.pathname,
        search: searchParams.toString()
      })
    },
    getQueryParams: (location) => {
      const searchParams = new URLSearchParams(location.search)
      const currentPage = parseInt(searchParams.get('page')) || 1
      const pageSize = parseInt(searchParams.get('pageSize')) || 12
      const ordering = searchParams.get('ordering') || ''
      const selectedCategories = searchParams.get('categories') ? searchParams.get('categories').split(',').map(Number) : []
      const selectedSubCategories = searchParams.get('sub_categories') ? searchParams.get('sub_categories').split(',').map(Number) : []
      return { currentPage, pageSize, ordering, selectedCategories, selectedSubCategories }
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
  const setProducts = useProductsStore(state => state.setProducts)
  const setTotalProducts = useProductsStore(state => state.setTotalProducts)
  const setLoading = useProductsStore(state => state.setLoading)
  const setCurrentPage = useProductsStore(state => state.setCurrentPage)
  const setPageSize = useProductsStore(state => state.setPageSize)
  const setOrdering = useProductsStore(state => state.setOrdering)
  const setSelectedCategories = useProductsStore(state => state.setSelectedCategories)
  const setSelectedSubCategories = useProductsStore(state => state.setSelectedSubCategories)
  const fetchProducts = useProductsStore(state => state.fetchProducts)
  const updateUrlParams = useProductsStore(state => state.updateUrlParams)
  const getQueryParams = useProductsStore(state => state.getQueryParams)

  return {
    products,
    totalProducts,
    isLoading,
    currentPage,
    pageSize,
    ordering,
    selectedCategories,
    selectedSubCategories,
    setProducts,
    setTotalProducts,
    setLoading,
    setCurrentPage,
    setPageSize,
    setOrdering,
    setSelectedCategories,
    setSelectedSubCategories,
    fetchProducts,
    updateUrlParams,
    getQueryParams
  }
}
