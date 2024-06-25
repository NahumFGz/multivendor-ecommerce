import { Skeleton } from '@nextui-org/react'
import { ProductListItem } from './ProductListItem'
import { cn } from '../../../../services/utilities/cn'
import { useEffect, useState } from 'react'

export function Products ({ itemClassName, className, isLoading, products, pageSize }) {
  const [loading, setLoading] = useState(isLoading)

  useEffect(() => {
    if (!isLoading) {
      const timeout = setTimeout(() => setLoading(false), 170) // Duración de la transición
      return () => clearTimeout(timeout)
    } else {
      setLoading(true)
    }
  }, [isLoading])

  return (
    <>
      <div className='block rounded-medium border-medium border-dashed border-divider m-2'>
        <div
          className={cn(
            `grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ${loading ? 'gap-4' : 'gap-0'}`,
            className
          )}
        >
          {loading
            ? Array.from({ length: pageSize }).map((_, index) => (
              <div key={index} className={cn('w-full snap-start', itemClassName)}>
                <div className='flex flex-col gap-3 m-2'>
                  <Skeleton className='h-[310px] w-full rounded-xl' />
                  <div className='mt-1 flex flex-col gap-2 px-1'>
                    <Skeleton className='w-3/5 rounded-lg sm:w-4/5 md:w-4/6 lg:w-5/6'>
                      <div className='h-3 w-full rounded-lg bg-default-200' />
                    </Skeleton>
                    <Skeleton className='mt-4 w-2/5 rounded-lg sm:w-3/5 md:w-4/6 lg:w-3/5'>
                      <div className='h-3 w-full rounded-lg bg-default-300' />
                    </Skeleton>
                    <Skeleton className='mt-4 w-2/5 rounded-lg sm:w-3/5 md:w-4/6 lg:w-3/5'>
                      <div className='h-3 w-full rounded-lg bg-default-300 flex items-center justify-center' />
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
    </>
  )
}
