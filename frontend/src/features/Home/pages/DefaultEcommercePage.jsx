import { useEffect, useState } from 'react'
import { useProductsAPI } from '../hooks/useProductsAPI'
import { useNavigate, useLocation } from 'react-router-dom'
import { Products } from '../components/Products/Products'
import { Pagination } from '@nextui-org/react'

export function DefaultEcommercePage () {
  const { getProducts } = useProductsAPI()
  const [state, setState] = useState({
    products: [],
    totalProducts: 0,
    isLoading: true,
    currentPage: 1,
    pageSize: 10,
    ordering: '',
    selectedCategories: [],
    selectedSubCategories: []
  })

  const navigate = useNavigate()
  const location = useLocation()

  const updateUrlParams = (params) => {
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
  }

  const getQueryParams = () => {
    const searchParams = new URLSearchParams(location.search)
    const currentPage = parseInt(searchParams.get('page')) || 1
    const pageSize = parseInt(searchParams.get('pageSize')) || 10
    const ordering = searchParams.get('ordering') || ''
    const selectedCategories = searchParams.get('categories') ? searchParams.get('categories').split(',').map(Number) : []
    const selectedSubCategories = searchParams.get('sub_categories') ? searchParams.get('sub_categories').split(',').map(Number) : []
    return { currentPage, pageSize, ordering, selectedCategories, selectedSubCategories }
  }

  const fetchProducts = async (params) => {
    try {
      setState((prevState) => ({ ...prevState, isLoading: true }))
      const response = await getProducts(params.currentPage, params.pageSize, params.ordering, params.selectedCategories, params.selectedSubCategories)
      setState((prevState) => ({
        ...prevState,
        products: response.products,
        totalProducts: response.totalProducts,
        isLoading: false
      }))
    } catch (error) {
      console.error(error)
      setState((prevState) => ({ ...prevState, isLoading: false }))
    }
  }

  useEffect(() => {
    const queryParams = getQueryParams()
    setState((prevState) => ({ ...prevState, ...queryParams }))
    fetchProducts(queryParams)
  }, [location.search])

  const handleParamChange = (newParams) => {
    const updatedParams = { ...state, ...newParams }
    setState(updatedParams)
    updateUrlParams(updatedParams)
  }

  return (
    <div className='mx-12 mt-2'>
      <div>
        <Products products={state.products} isLoading={state.isLoading} pageSize={state.pageSize} />
        <div className='flex items-center justify-center mt-4'>
          {state.totalProducts > 0 && state.pageSize > 0 && (
            <Pagination
              showControls
              total={Math.ceil(state.totalProducts / state.pageSize)}
              page={state.currentPage} // Utiliza el estado controlado
              onChange={(currentPage) => handleParamChange({ currentPage })}
            />
          )}
        </div>
        <div className='flex items-center justify-center mt-4'>
          <select value={state.pageSize} onChange={(e) => handleParamChange({ pageSize: parseInt(e.target.value), currentPage: 1 })}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
    </div>
  )
}
