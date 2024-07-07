import { useEffect, useState } from 'react'
import { useProductsAPI } from '../hooks/useProductsAPI'
import { Products } from '../components/Products/Products'
import { Pagination } from '@nextui-org/react'

export function DefaultEcommercePage () {
  const { getProducts } = useProductsAPI()
  const [state, setState] = useState({
    products: [],
    totalProducts: 0,
    isLoading: true,
    currentPage: 1,
    pageSize: 12,
    ordering: '',
    selectedCategories: [],
    selectedSubCategories: []
  })

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
    fetchProducts(state)
  }, [state.currentPage, state.pageSize, state.ordering, state.selectedCategories, state.selectedSubCategories])

  const handleParamChange = (newParams) => {
    setState((prevState) => ({ ...prevState, ...newParams }))
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
            <option value={12}>12</option>
            <option value={24}>24</option>
            <option value={36}>36</option>
            <option value={48}>48</option>
          </select>
        </div>
      </div>
    </div>
  )
}
