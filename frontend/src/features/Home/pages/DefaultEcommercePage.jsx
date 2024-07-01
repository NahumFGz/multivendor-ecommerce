import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Products } from '../components/Products/Products'
import { Pagination } from '@nextui-org/react'
import { useProducts } from '../../../store/ProductStore'

export function DefaultEcommercePage () {
  const {
    products, totalProducts, isLoading, currentPage, pageSize,
    ordering, selectedCategories, selectedSubCategories,
    setCurrentPage, setPageSize, setOrdering, setSelectedCategories, setSelectedSubCategories,
    fetchProducts, updateUrlParams, getQueryParams
  } = useProducts()

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const queryParams = getQueryParams(location)
    setCurrentPage(queryParams.currentPage)
    setPageSize(queryParams.pageSize)
    setOrdering(queryParams.ordering)
    setSelectedCategories(queryParams.selectedCategories)
    setSelectedSubCategories(queryParams.selectedSubCategories)
    fetchProducts(queryParams)
  }, [location.search])

  const handleParamChange = (newParams) => {
    const updatedParams = {
      currentPage,
      pageSize,
      ordering,
      selectedCategories,
      selectedSubCategories,
      ...newParams
    }
    setCurrentPage(updatedParams.currentPage)
    setPageSize(updatedParams.pageSize)
    setOrdering(updatedParams.ordering)
    setSelectedCategories(updatedParams.selectedCategories)
    setSelectedSubCategories(updatedParams.selectedSubCategories)
    updateUrlParams(updatedParams, navigate, location)
    fetchProducts(updatedParams)
  }

  return (
    <div className='mx-12 mt-2'>
      <div>
        <Products products={products} isLoading={isLoading} pageSize={pageSize} />
        <div className='flex items-center justify-center mt-4'>
          {totalProducts > 0 && pageSize > 0 && (
            <Pagination
              showControls
              total={Math.ceil(totalProducts / pageSize)}
              page={currentPage}
              onChange={(currentPage) => handleParamChange({ currentPage })}
            />
          )}
        </div>
        <div className='flex items-center justify-center mt-4'>
          <select value={pageSize} onChange={(e) => handleParamChange({ pageSize: parseInt(e.target.value), currentPage: 1 })}>
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
