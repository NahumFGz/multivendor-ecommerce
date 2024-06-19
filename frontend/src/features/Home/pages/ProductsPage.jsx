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
  const [pageSize] = useState(10)

  const navigate = useNavigate()
  const location = useLocation()

  // Función para actualizar la URL
  const updateUrlParams = (page) => {
    const searchParams = new URLSearchParams(location.search)
    searchParams.set('page', page)
    searchParams.set('pageSize', pageSize)
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
    return { page, size }
  }

  const fetchProducts = async (page = 1) => {
    try {
      setIsLoading(true)
      const { products, totalProducts } = await getProducts(page, pageSize)
      setProducts(products)
      setTotalProducts(totalProducts)
      setIsLoading(false)
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const { page } = getQueryParams()
    setCurrentPage(page)
    fetchProducts(page)
  }, [location.search])

  const handlePageChange = (page) => {
    setCurrentPage(page)
    updateUrlParams(page)
  }

  return (
    <div className='mx-12 mt-2'>
      <Filters totalProducts={totalProducts} />
      <div>
        <Products products={products} isLoading={isLoading} pageSize={pageSize} />
        <div className='flex items-center justify-center mt-4'>
          <Pagination
            showControls
            total={Math.ceil(totalProducts / pageSize)}
            page={currentPage} // Utiliza el estado controlado
            onChange={(page) => handlePageChange(page)}
          />
        </div>
      </div>
    </div>
  )
}
