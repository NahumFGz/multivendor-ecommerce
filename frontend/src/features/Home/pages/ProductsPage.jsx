import { useEffect, useState } from 'react'
import { useProductsAPI } from '../hooks/useProductsAPI'
import { useNavigate, useLocation } from 'react-router-dom'
import { Filters } from '../components/Filters/Filters'
import { Products } from '../components/Products/Products'
import { Pagination } from '@nextui-org/react'
import { useInfoAPI, getCategories, getKindsAndSubkindsByCategoryId, getSubkindsByKindId } from '../hooks/useInfoAPI'

export function ProductsPage () {
  const { getProducts } = useProductsAPI()
  const [products, setProducts] = useState([])
  const [totalProducts, setTotalProducts] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [ordering, setOrdering] = useState('')
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedKinds, setSelectedKinds] = useState([])
  const [selectedSubKinds, setSelectedSubKinds] = useState([])

  //! Test useInfoAPI **************
  const { getAllFilters } = useInfoAPI()
  const [filtersInfo, setFiltersInfo] = useState([])
  const [categoriesInfo, setCategoriesInfo] = useState([])
  const [kindsInfo, setKindsInfo] = useState([])
  const [subKindsInfo, setSubKindsInfo] = useState([])

  const fetchInfo = async () => {
    try {
      const response = await getAllFilters()
      setFiltersInfo(response)
    } catch (error) {
      throw new Error('Get all filters failed')
    }
  }

  useEffect(() => {
    fetchInfo()
    console.log('filtersInfo... ', filtersInfo)
  }, [])

  //! ******************************
  const [categories, setCategories] = useState([])
  const [kinds, setKinds] = useState([])
  const [subKinds, setSubKinds] = useState([])

  const navigate = useNavigate()
  const location = useLocation()

  // Función para actualizar la URL
  const updateUrlParams = (page, size, order, categories, kinds, subKinds) => {
    const searchParams = new URLSearchParams(location.search)
    searchParams.set('page', page)
    searchParams.set('pageSize', size)
    if (order) {
      searchParams.set('ordering', order)
    }
    if (categories.length > 0) {
      searchParams.set('categories', categories.join(','))
    }
    if (kinds.length > 0) {
      searchParams.set('kind_of_product', kinds.join(','))
    }
    if (subKinds.length > 0) {
      searchParams.set('sub_kind_of_product', subKinds.join(','))
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
    const kinds = searchParams.get('kind_of_product') ? searchParams.get('kind_of_product').split(',').map(Number) : []
    const subKinds = searchParams.get('sub_kind_of_product') ? searchParams.get('sub_kind_of_product').split(',').map(Number) : []
    return { page, size, order, categories, kinds, subKinds }
  }

  const fetchProducts = async (page = 1, size = 10, order = '', selectedCategories = [], selectedKinds = [], selectedSubKinds = []) => {
    try {
      setIsLoading(true)
      const response = await getProducts(page, size, order, selectedCategories, selectedKinds, selectedSubKinds)
      setProducts(response.products)
      setTotalProducts(response.totalProducts)
      setCategories(response.categories)
      setKinds(response.kinds)
      setSubKinds(response.subKinds)
      setIsLoading(false)
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const { page, size, order, categories, kinds, subKinds } = getQueryParams()
    setCurrentPage(page)
    setPageSize(size)
    setOrdering(order)
    setSelectedCategories(categories)
    setSelectedKinds(kinds)
    setSelectedSubKinds(subKinds)
    fetchProducts(page, size, order, categories, kinds, subKinds)
  }, [location.search])

  const handlePageChange = (page) => {
    setCurrentPage(page)
    updateUrlParams(page, pageSize, ordering, selectedCategories, selectedKinds, selectedSubKinds)
  }

  const handlePageSizeChange = (size) => {
    setPageSize(size)
    updateUrlParams(1, size, ordering, selectedCategories, selectedKinds, selectedSubKinds) // Reinicia la paginación a la primera página
  }

  const handleOrderingChange = (order) => {
    setOrdering(order)
    updateUrlParams(1, pageSize, order, selectedCategories, selectedKinds, selectedSubKinds) // Reinicia la paginación a la primera página
  }

  const handleCategoriesChange = (categories) => {
    setSelectedCategories(categories)
    updateUrlParams(1, pageSize, ordering, categories, selectedKinds, selectedSubKinds)
  }

  const handleKindsChange = (kinds) => {
    setSelectedKinds(kinds)
    updateUrlParams(1, pageSize, ordering, selectedCategories, kinds, selectedSubKinds)
  }

  const handleSubKindsChange = (subKinds) => {
    setSelectedSubKinds(subKinds)
    updateUrlParams(1, pageSize, ordering, selectedCategories, selectedKinds, subKinds)
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
        selectedCategories={selectedCategories}
        selectedKinds={selectedKinds}
        selectedSubKinds={selectedSubKinds}
        onCategoriesChange={handleCategoriesChange}
        onKindsChange={handleKindsChange}
        onSubKindsChange={handleSubKindsChange}
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
