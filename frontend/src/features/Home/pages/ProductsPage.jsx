import { useEffect, useState } from 'react'
import { useProductsAPI } from '../hooks/useProductsAPI'

import { Filters } from '../components/Filters/Filters'
import { Products } from '../components/Products/Products'
import { Pagination } from '@nextui-org/react'

export function ProductsPage () {
  const { getProducts } = useProductsAPI()
  const [products, setProducts] = useState([])
  const [totalProducts, setTotalProducts] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true)
        const { products, totalProducts } = await getProducts()
        setProducts(products)
        setTotalProducts(totalProducts)
        setIsLoading(false)
      } catch (error) {
        console.error(error)
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div className='mx-12 mt-2'>
      <Filters totalProducts={totalProducts} />
      <div>
        <Products products={products} isLoading={isLoading} />
      </div>
      <div className='flex items-center justify-center mt-4'>
        <Pagination showControls total={10} initialPage={1} />
      </div>
    </div>
  )
}
