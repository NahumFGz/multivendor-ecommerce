import { useEffect, useState } from 'react'
import { Pagination, Skeleton } from '@nextui-org/react'
import { ProductListItem } from './ProductListItem'
import { cn } from '../../../../services/utilities/cn'
import { useProductsAPI } from '../../hooks/useProductsAPI'

export function Products ({ itemClassName, className }) {
  const { getProducts } = useProductsAPI()
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true)
        const { products, totalCount } = await getProducts()
        setProducts(products)
        setIsLoading(false)
      } catch (error) {
        console.error(error)
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <>
      <div className='block rounded-medium border-medium border-dashed border-divider m-2'>
        <div
          className={cn(
        `grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ${isLoading ? 'gap-4' : 'gap-0'}`,
        className
          )}
        >
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className={cn('w-full snap-start', itemClassName)}>
                <div className='flex flex-col gap-3'>
                  <Skeleton className='h-48 w-full rounded-lg sm:h-52 md:h-56 lg:h-60' />
                  <div className='mt-1 flex flex-col gap-2 px-1'>
                    <Skeleton className='w-3/5 rounded-lg sm:w-4/5 md:w-4/6 lg:w-5/6'>
                      <div className='h-3 w-full rounded-lg bg-default-200' />
                    </Skeleton>
                    <Skeleton className='mt-4 w-2/5 rounded-lg sm:w-3/5 md:w-4/6 lg:w-3/5'>
                      <div className='h-3 w-full rounded-lg bg-default-300' />
                    </Skeleton>
                  </div>
                </div>
              </div>
            ))
            : products.map((product) => (
              <ProductListItem
                key={product.id}
                removeWrapper
                {...product}
                className={cn('w-full snap-start', itemClassName)}
              />
            ))}
        </div>
      </div>

      <div className='flex items-center justify-center mt-4'>
        <Pagination showControls total={10} initialPage={1} />
      </div>
    </>
  )
}
