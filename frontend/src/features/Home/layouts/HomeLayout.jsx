import { Footer } from '../components/Footer/Footer'
import { Header } from '../components/Header/Header'
import { useLocation, useNavigate } from 'react-router-dom'
import { homeUrls } from '../../../routes/urls/homeUrls'
import { Filters } from '../components/Filters/Filters'
import { useState, useEffect } from 'react'
import { useProductsAPI } from '../hooks/useProductsAPI'

export function HomeLayout ({ children }) {
  const location = useLocation()
  const { getProducts } = useProductsAPI()
  const [filterParams, setFilterParams] = useState({
    ordering: '',
    selectedCategories: [],
    selectedSubCategories: [],
    filterTitle: ''
  })
  const [totalProducts, setTotalProducts] = useState(0)

  const navigate = useNavigate()

  const updateUrlParams = (params) => {
    const searchParams = new URLSearchParams(location.search)
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
    const ordering = searchParams.get('ordering') || ''
    const selectedCategories = searchParams.get('categories') ? searchParams.get('categories').split(',').map(Number) : []
    const selectedSubCategories = searchParams.get('sub_categories') ? searchParams.get('sub_categories').split(',').map(Number) : []
    return { ordering, selectedCategories, selectedSubCategories }
  }

  const getFilterTitle = (pathname) => {
    if (pathname === homeUrls.products) {
      return 'Productos'
    } else if (pathname === homeUrls.boardGames) {
      return 'Juegos de mesa'
    } else if (pathname === homeUrls.marketplace) {
      return 'Productos publicados'
    } else if (pathname === homeUrls.promos) {
      return 'Promociones'
    }
  }

  const fetchProducts = async (params) => {
    try {
      const response = await getProducts(1, 10, params.ordering, params.selectedCategories, params.selectedSubCategories)
      setTotalProducts(response.totalProducts)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const queryParams = getQueryParams()
    setFilterParams((prevParams) => ({ ...prevParams, ...queryParams }))
    fetchProducts(queryParams)
  }, [location.search])

  useEffect(() => {
    const filterTitle = getFilterTitle(location.pathname)
    setFilterParams((prevParams) => ({ ...prevParams, filterTitle }))
  }, [location.pathname])

  const handleParamChange = (newParams) => {
    setFilterParams((prevParams) => ({ ...prevParams, ...newParams }))
    updateUrlParams({ ...filterParams, ...newParams })
  }

  return (
    <div className='flex flex-col'>
      <div>
        <Header />
      </div>
      {location.pathname !== homeUrls.home && (
        <div className='mx-12 mt-2'>
          <Filters
            totalProducts={totalProducts}
            ordering={filterParams.ordering}
            onOrderingChange={(ordering) => handleParamChange({ ordering })}
            selectedCategories={filterParams.selectedCategories}
            selectedSubCategories={filterParams.selectedSubCategories}
            onCategoriesChange={(selectedCategories) => handleParamChange({ selectedCategories })}
            onSubCategoriesChange={(selectedSubCategories) => handleParamChange({ selectedSubCategories })}
            filterTitle={filterParams.filterTitle}
            showCategories={location.pathname !== homeUrls.boardGames}
          />
        </div>
      )}
      <div>
        {children}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}
