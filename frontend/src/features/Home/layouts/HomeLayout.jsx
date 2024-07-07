import { Footer } from '../components/Footer/Footer'
import { Header } from '../components/Header/Header'
import { useLocation } from 'react-router-dom'
import { homeUrls } from '../../../routes/urls/homeUrls'
import { Filters } from '../components/Filters/Filters'
import { useState, useEffect } from 'react'
import { useProducts } from '../../../store/ProducstStore'

export function HomeLayout ({ children }) {
  const location = useLocation()
  const [filterTitle, setFilterTitle] = useState('')
  const {
    totalProducts,
    ordering,
    setOrdering,
    selectedCategories,
    setSelectedCategories,
    selectedSubCategories,
    setSelectedSubCategories
  } = useProducts()

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
    const newFilterTitle = getFilterTitle(location.pathname)
    setFilterTitle(newFilterTitle)
  }, [location.pathname])

  return (
    <div className='flex flex-col'>
      <div>
        <Header />
      </div>
      {location.pathname !== homeUrls.home && (
        <div className='mx-12 mt-2'>
          <Filters
            totalProducts={totalProducts}
            ordering={ordering}
            onOrderingChange={setOrdering}
            selectedCategories={selectedCategories}
            selectedSubCategories={selectedSubCategories}
            onCategoriesChange={setSelectedCategories}
            onSubCategoriesChange={setSelectedSubCategories}
            filterTitle={filterTitle}
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
