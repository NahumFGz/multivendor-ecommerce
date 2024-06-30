import { Footer } from '../components/Footer/Footer'
import { Header } from '../components/Header/Header'
import { useLocation } from 'react-router-dom'
import { homeUrls } from '../../../routes/urls/homeUrls'
import { Filters } from '../components/Filters/Filters'
import { useState, useEffect } from 'react'

export function HomeLayout ({ children }) {
  const location = useLocation()
  const [filterParams, setFilterParams] = useState({
    ordering: '',
    selectedCategories: [],
    selectedSubCategories: [],
    filterTitle: ''
  })

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

  useEffect(() => {
    const queryParams = getQueryParams()
    setFilterParams((prevParams) => ({ ...prevParams, ...queryParams }))
  }, [location.search])

  useEffect(() => {
    const filterTitle = getFilterTitle(location.pathname)
    setFilterParams((prevParams) => ({ ...prevParams, filterTitle }))
  }, [location.pathname])

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
            totalProducts={0} // Esto debe ser eliminado si ya no es necesario
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
