import { Footer } from '../components/Footer/Footer'
import { Header } from '../components/Header/Header'
import { useLocation } from 'react-router-dom'
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

  const fetchProducts = async (params) => {
    try {
      const response = await getProducts(1, 10, params.ordering, params.selectedCategories, params.selectedSubCategories)
      setTotalProducts(response.totalProducts)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchProducts(filterParams)
  }, [filterParams])

  useEffect(() => {
    const filterTitle = getFilterTitle(location.pathname)
    setFilterParams((prevParams) => ({ ...prevParams, filterTitle }))
  }, [location.pathname])

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

  const handleParamChange = (newParams) => {
    setFilterParams((prevParams) => ({ ...prevParams, ...newParams }))
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
