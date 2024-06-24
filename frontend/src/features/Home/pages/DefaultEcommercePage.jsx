import { useEffect, useState } from 'react'
import { useProductsAPI } from '../hooks/useProductsAPI'
import { useNavigate, useLocation } from 'react-router-dom'
import { Filters } from '../components/Filters/Filters'
import { Products } from '../components/Products/Products'
import { Pagination } from '@nextui-org/react'

export function DefaultEcommercePage () {
  const { getProducts } = useProductsAPI()
  const [products, setProducts] = useState([])
  const [totalProducts, setTotalProducts] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [ordering, setOrdering] = useState('')
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedSubCategories, setSelectedSubCategories] = useState([])

  const navigate = useNavigate()
  const location = useLocation()

  // Función para actualizar la URL
  const updateUrlParams = (page, size, order, categories, subCategories) => {
    const searchParams = new URLSearchParams(location.search)
    searchParams.set('page', page)
    searchParams.set('pageSize', size)
    if (order) {
      searchParams.set('ordering', order)
    } else {
      searchParams.delete('ordering')
    }
    if (categories.length > 0) {
      searchParams.set('categories', categories.join(','))
    } else {
      searchParams.delete('categories')
    }
    if (subCategories.length > 0) {
      searchParams.set('sub_categories', subCategories.join(','))
    } else {
      searchParams.delete('sub_categories')
    }
    navigate({
      pathname: location.pathname,
      search: searchParams.toString()
    })
  }

  // Función para leer parámetros de la URL
  const getQueryParams = () => {
    const searchParams = new URLSearchParams(location.search)
    const page = parseInt(searchParams.get('page')) || 1
    const size = parseInt(searchParams.get('pageSize')) || 10
    const order = searchParams.get('ordering') || ''
    const categories = searchParams.get('categories') ? searchParams.get('categories').split(',').map(Number) : []
    const subCategories = searchParams.get('sub_categories') ? searchParams.get('sub_categories').split(',').map(Number) : []
    return { page, size, order, categories, subCategories }
  }

  const fetchProducts = async (page = 1, size = 10, order = '', selectedCategories = [], selectedSubCategories = []) => {
    try {
      setIsLoading(true)
      const response = await getProducts(page, size, order, selectedCategories, selectedSubCategories)
      setProducts(response.products)
      setTotalProducts(response.totalProducts)
      setIsLoading(false)
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const { page, size, order, categories, subCategories } = getQueryParams()
    setCurrentPage(page)
    setPageSize(size)
    setOrdering(order)
    setSelectedCategories(categories)
    setSelectedSubCategories(subCategories)
    fetchProducts(page, size, order, categories, subCategories)
  }, [location.search])

  const handlePageChange = (page) => {
    setCurrentPage(page)
    updateUrlParams(page, pageSize, ordering, selectedCategories, selectedSubCategories)
  }

  const handlePageSizeChange = (size) => {
    setPageSize(size)
    updateUrlParams(1, size, ordering, selectedCategories, selectedSubCategories) // Reinicia la paginación a la primera página
  }

  const handleOrderingChange = (order) => {
    setOrdering(order)
    updateUrlParams(1, pageSize, order, selectedCategories, selectedSubCategories) // Reinicia la paginación a la primera página
  }

  const handleCategoriesChange = (categories) => {
    setSelectedCategories(categories)
    updateUrlParams(1, pageSize, ordering, categories, selectedSubCategories)
  }

  const handleSubCategoriesChange = (subCategories) => {
    setSelectedSubCategories(subCategories)
    updateUrlParams(1, pageSize, ordering, selectedCategories, subCategories)
  }

  return (
    <div className='mx-12 mt-2'>
      <Filters
        totalProducts={totalProducts}
        ordering={ordering}
        onOrderingChange={handleOrderingChange}
        selectedCategories={selectedCategories}
        selectedSubCategories={selectedSubCategories}
        onCategoriesChange={handleCategoriesChange}
        onSubCategoriesChange={handleSubCategoriesChange}
      />
      <div>
        <Products products={products} isLoading={isLoading} pageSize={pageSize} />
        <div className='flex items-center justify-center mt-4'>
          {totalProducts > 0 && pageSize > 0 && (
            <Pagination
              showControls
              total={Math.ceil(totalProducts / pageSize)}
              page={currentPage} // Utiliza el estado controlado
              onChange={(page) => handlePageChange(page)}
            />
          )}
        </div>
        {/* Ejemplo de un selector para cambiar el pageSize */}
        <div className='flex items-center justify-center mt-4'>
          <select value={pageSize} onChange={(e) => handlePageSizeChange(parseInt(e.target.value))}>
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
