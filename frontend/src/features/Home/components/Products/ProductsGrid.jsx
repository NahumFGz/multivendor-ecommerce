import React, { forwardRef } from 'react'
import { cn, Skeleton } from '@nextui-org/react'
import products from './products'
import ProductListItem from './ProductListItem'

const ProductsGrid = forwardRef(({ itemClassName, className, isLoading, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        `grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ${isLoading ? 'gap-4' : 'gap-0'}`,
        className
      )}
      {...props}
    >
      {isLoading
        ? Array.from({ length: products.length }).map((_, index) => (
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
  )
})

ProductsGrid.displayName = 'ProductsGrid'

export default ProductsGrid
