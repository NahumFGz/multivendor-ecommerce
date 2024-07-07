import { useEffect, useState } from 'react'
import { Products } from '../components/Products/Products'
import { Pagination } from '@nextui-org/react'
import { Filters } from '../components/Filters/Filters'
import { useLocation } from 'react-router-dom'
import { homeUrls } from '../../../routes/urls/homeUrls'

export function DefaultEcommercePage ({ useStore }) {
  const location = useLocation()
  const {
    products,
    totalProducts,
    isLoading,
    currentPage,
    pageSize,
    ordering,
    selectedCategories,
    selectedSubCategories,
    searchQuery,
    setCurrentPage,
    setPageSize,
    setOrdering,
    setSelectedCategories,
    setSelectedSubCategories,
    fetchProducts
  } = useStore()

  const [filterTitle, setFilterTitle] = useState('')

  useEffect(() => {
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

    const newFilterTitle = getFilterTitle(location.pathname)
    setFilterTitle(newFilterTitle)
  }, [location.pathname])

  useEffect(() => {
    fetchProducts({ currentPage, pageSize, ordering, selectedCategories, selectedSubCategories, searchQuery })
  }, [currentPage, pageSize, ordering, selectedCategories, selectedSubCategories, searchQuery])

  return (
    <div className='mx-12 mt-2'>
      {location.pathname !== homeUrls.home && (
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
      )}

      <div>
        <Products products={products} isLoading={isLoading} pageSize={pageSize} />
        <div className='flex items-center justify-center mt-4'>
          {totalProducts > 0 && pageSize > 0 && (
            <Pagination
              showControls
              total={Math.ceil(totalProducts / pageSize)}
              page={currentPage}
              onChange={(currentPage) => setCurrentPage(currentPage)}
            />
          )}
        </div>

        <div className='flex items-center justify-center mt-4'>
          <select value={pageSize} onChange={(e) => setPageSize(parseInt(e.target.value), setCurrentPage(1))}>
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
