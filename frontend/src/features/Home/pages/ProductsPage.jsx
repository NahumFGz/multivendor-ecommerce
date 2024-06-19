import { useEffect, useState } from 'react'
import { useProductsAPI } from '../hooks/useProductsAPI'

import { Pagination } from '@nextui-org/react'
import { Filters } from '../components/Filters/Filters'
import { Products } from '../components/Products/Products'

export function ProductsPage () {
  const { getProducts } = useProductsAPI()
  const [products, setProducts] = useState([])
  const [totalProducts, setTotalProducts] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(10)

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
    fetchProducts(currentPage)
  }, [currentPage])

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  return (
    <div className='mx-12 mt-2'>
      <Filters totalProducts={totalProducts} />
      <div>
        <Products products={products} isLoading={isLoading} pageSize={pageSize} />
        {
          isLoading || (
            <div className='flex items-center justify-center mt-4'>
              <Pagination
                total={Math.ceil(totalProducts / pageSize)}
                initialPage={currentPage}
                onChange={(page) => handlePageChange(page)}
              />
            </div>
          )
        }
      </div>
    </div>
  )
}
