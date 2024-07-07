import { useEffect } from 'react'
import { Products } from '../components/Products/Products'
import { Pagination } from '@nextui-org/react'
import { useProducts } from '../../../store/ProducstStore'

export function DefaultEcommercePage () {
  const {
    products,
    totalProducts,
    isLoading,
    currentPage,
    pageSize,
    ordering,
    selectedCategories,
    selectedSubCategories,
    setCurrentPage,
    setPageSize,
    fetchProducts
  } = useProducts()

  useEffect(() => {
    fetchProducts({ currentPage, pageSize, ordering, selectedCategories, selectedSubCategories })
  }, [currentPage, pageSize, ordering, selectedCategories, selectedSubCategories, fetchProducts])

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
