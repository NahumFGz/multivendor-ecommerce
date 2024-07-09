import {
  Button,
  Image,
  ScrollShadow
} from '@nextui-org/react'
import { Icon } from '@iconify/react'

import { cn } from '../../../../services/utilities/cn'
import RatingRadioGroup from './RatingRadioGroup'
import { forwardRef, useState } from 'react'

const ProductViewInfo = forwardRef(
  (
    {
      name,
      images,
      price,
      description,
      rating,
      ratingCount,
      className,
      ...props
    },
    ref
  ) => {
    const [isStarred, setIsStarred] = useState(false)
    const [selectedImage, setSelectedImage] = useState(images[0])

    return (
      <div
        ref={ref}
        className={cn(
          'relative flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8',
          className
        )}
        {...props}
      >
        {/* Product Gallery */}
        <div className='relative h-full w-full flex-none'>
          {/* Main Image */}
          <Image alt={name} className='h-full w-full' radius='lg' src={selectedImage} />
          {/* Image Gallery */}
          <ScrollShadow
            className='-mx-2 -mb-4 mt-4 flex w-full max-w-full gap-4 px-2 pb-4 pt-2'
            orientation='horizontal'
          >
            {images.map((image, index) => (
              <button
                key={`${image}-${index}`}
                className='relative h-24 w-24 flex-none cursor-pointer items-center justify-center rounded-medium ring-offset-background transition-shadow data-[selected=true]:outline-none data-[selected=true]:ring-2 data-[selected=true]:ring-focus data-[selected=true]:ring-offset-2'
                data-selected={image === selectedImage}
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  removeWrapper
                  alt={name}
                  classNames={{
                    img: 'h-full w-full'
                  }}
                  radius='lg'
                  src={image}
                />
              </button>
            ))}
          </ScrollShadow>
        </div>

        {/* Product Info */}
        <div className='flex flex-col'>
          <h1 className='text-2xl font-bold tracking-tight'>{name}</h1>
          <h2 className='sr-only'>Product information</h2>
          <div className='my-2 flex items-center gap-2'>
            <RatingRadioGroup hideStarsText size='sm' value={`${rating}`} />
            <p className='text-small text-default-400'>
              {ratingCount} {ratingCount === 1 ? 'review' : 'reviews'}
            </p>
          </div>
          <p className='text-xl font-medium tracking-tight'>S/. {price}</p>
          <div className='mt-4'>
            <p className='sr-only'>Product description</p>
            <p className='line-clamp-3 text-medium text-default-500'>{description}</p>
          </div>
          <div className='mt-6 flex flex-col gap-1'>
            <div className='mb-4 flex items-center gap-2 text-default-700'>
              <Icon icon='carbon:delivery' width={24} />
              <p className='text-small font-medium'>Free shipping and 30 days return</p>
            </div>
          </div>
          <div className='mt-2 flex gap-2'>
            <Button
              fullWidth
              className='text-medium font-medium'
              color='primary'
              size='lg'
              startContent={<Icon icon='solar:cart-large-2-bold' width={24} />}
            >
              Add to cart
            </Button>
            <Button
              isIconOnly
              className='text-default-600'
              size='lg'
              variant='flat'
              onPress={() => setIsStarred(!isStarred)}
            >
              {isStarred
                ? (
                  <Icon icon='solar:heart-bold' width={24} />
                  )
                : (
                  <Icon icon='solar:heart-linear' width={24} />
                  )}
            </Button>
          </div>
        </div>
      </div>
    )
  }
)

ProductViewInfo.displayName = 'ProductViewInfo'

export default ProductViewInfo
