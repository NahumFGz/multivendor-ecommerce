import { useEffect, useState } from 'react'
import { useProductsAPI } from '../hooks/useProductsAPI'
import { useNavigate, useLocation } from 'react-router-dom'
import { Filters } from '../components/Filters/Filters'
import { Products } from '../components/Products/Products'
import { Pagination } from '@nextui-org/react'

export function ProductsPage () {
  const { getProducts } = useProductsAPI()
  const [products, setProducts] = useState([])
  const [totalProducts, setTotalProducts] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [ordering, setOrdering] = useState('')
  const [categories, setCategories] = useState([])
  const [kinds, setKinds] = useState([])
  const [subKinds, setSubKinds] = useState([])

  const navigate = useNavigate()
  const location = useLocation()

  // Función para actualizar la URL
  const updateUrlParams = (page, size, order) => {
    const searchParams = new URLSearchParams(location.search)
    searchParams.set('page', page)
    searchParams.set('pageSize', size)
    if (order) {
      searchParams.set('ordering', order)
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
    return { page, size, order }
  }

  const fetchProducts = async (page = 1, size = 10, order = '') => {
    try {
      setIsLoading(true)
      const { products, totalProducts, categories, kinds, subKinds } = await getProducts(page, size, order)
      setProducts(products)
      setTotalProducts(totalProducts)
      setCategories(categories)
      setKinds(kinds)
      setSubKinds(subKinds)
      setIsLoading(false)
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const { page, size, order } = getQueryParams()
    setCurrentPage(page)
    setPageSize(size)
    setOrdering(order)
    fetchProducts(page, size, order)
  }, [location.search])

  const handlePageChange = (page) => {
    setCurrentPage(page)
    updateUrlParams(page, pageSize, ordering)
  }

  const handlePageSizeChange = (size) => {
    setPageSize(size)
    updateUrlParams(1, size, ordering) // Reinicia la paginación a la primera página
  }

  const handleOrderingChange = (order) => {
    setOrdering(order)
    updateUrlParams(1, pageSize, order) // Reinicia la paginación a la primera página
  }

  return (
    <div className='mx-12 mt-2'>
      <Filters
        totalProducts={totalProducts}
        ordering={ordering}
        onOrderingChange={handleOrderingChange}
        categories={categories}
        kinds={kinds}
        subKinds={subKinds}
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
