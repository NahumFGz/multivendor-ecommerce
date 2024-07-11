import { Button, Image, cn } from '@nextui-org/react'
import { Icon } from '@iconify/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { homeUrls } from '../../../../routes/urls/homeUrls'
import { useCart } from '../../../../store/CartStore'
import { useFavorites } from '../../../../store/FavoritesStore'

export function ProductListItem ({
  id,
  name,
  productSlugName,
  price,
  rating,
  ratingCount,
  description,
  imageSrc,
  isNew,
  isPopular,
  availableColors,
  removeWrapper,
  className,
  stock
}) {
  const navigate = useNavigate()
  const [isStarred, setIsStarred] = useState(false)
  const hasColors = availableColors && availableColors?.length > 0

  const { addToCart } = useCart()
  const { addToFavorites, removeFromFavorites, favoriteItems } = useFavorites()

  const handleProductClick = () => {
    navigate(homeUrls.productInfo.replace(':product-slug', productSlugName))
  }

  const handleAddToCart = () => {
    const product = { id, name, price, imageSrc, productSlugName, stock }
    addToCart(product)
  }

  const handleAddOrRemoveFromFavorites = () => {
    const product = { id, name, price, imageSrc, productSlugName, stock }
    if (isStarred) {
      removeFromFavorites(product.id)
    } else {
      addToFavorites(product)
    }
    setIsStarred(!isStarred)
  }

  // Update the starred state based on the favorite items
  useState(() => {
    setIsStarred(favoriteItems.some(item => item.id === id))
  }, [favoriteItems])

  return (
    <div
      className={cn(
        'relative flex w-64 max-w-full flex-none scroll-ml-6 flex-col gap-3 rounded-large bg-content1 p-4 shadow-medium',
        {
          'rounded-none bg-transparent shadow-none': removeWrapper
        },
        className
      )}
    >
      {isNew && isPopular
        ? (
          <span className='absolute right-7 top-7 z-20 text-tiny font-semibold text-default-400'>
            NEW
          </span>
          )
        : null}
      {/* Stock info */}
      <span
        className={`absolute left-7 top-7 z-20 text-tiny font-semibold ${
          stock > 0 ? 'text-default-700' : 'text-default-400'
        }`}
      >
        {stock > 20 ? '+20 en stock' : stock > 0 ? `${stock} en stock` : 'Agotado'}
      </span>

      <Button
        isIconOnly
        className={cn('absolute right-6 top-6 z-20', {
          hidden: isPopular
        })}
        radius='full'
        size='sm'
        variant='flat'
        onPress={handleAddOrRemoveFromFavorites}
      >
        <Icon
          className={cn('text-default-500', {
            'text-warning': isStarred
          })}
          icon='solar:heart-bold'
          width={16}
        />
      </Button>
      <div
        className={cn(
          'relative flex h-[300px] max-h-full w-full flex-col items-center justify-center overflow-visible rounded-medium bg-content2',
          {
            'h-full justify-between': isPopular
          }
        )}
        onClick={() => handleProductClick()}
      >
        <div
          className={cn('flex flex-col gap-2 px-4 pt-6', {
            hidden: !isPopular
          })}
        >
          <h3 className='text-xl font-semibold tracking-tight text-default-800'>{name}</h3>
          <p className='text-small text-default-500'>{description}</p>
        </div>
        <Image
          removeWrapper
          alt={name}
          className={cn(
            'z-0 h-full w-full max-h-[50%] overflow-visible object-contain object-center hover:scale-110',
            {
              'flex h-56 w-56 items-center': isPopular,
              'mb-2': hasColors
            }
          )}
          src={imageSrc}
        />

        {hasColors
          ? (
            <div className='absolute bottom-3'>
              <h4 className='sr-only'>Available colors</h4>
              <ul className='mt-auto flex items-center justify-center space-x-3 pt-6'>
                {availableColors.map((color) => (
                  <li
                    key={color.name}
                    className='h-2 w-2 rounded-full border border-default-300 border-opacity-10'
                    style={{ backgroundColor: color.hex }}
                  >
                    <span className='sr-only'>{color.name}</span>
                  </li>
                ))}
              </ul>
            </div>
            )
          : null}
      </div>
      <div className='flex flex-col gap-3 px-1'>
        <div
          className={cn('flex items-center justify-between', {
            hidden: isPopular
          })}
        >
          <div>
            <h3 className='text-medium font-medium text-default-700'>{name}</h3>
            <p className='text-medium font-medium text-default-500'>S/ {price}</p>
          </div>
        </div>
        {description && !isPopular
          ? (
            <p className='text-small text-default-500'>{description}</p>
            )
          : null}
        <div className='flex gap-2'>
          {isPopular
            ? (
              <Button
                fullWidth
                className='bg-default-300/20 font-medium text-default-700'
                radius='lg'
                variant='flat'
              >
                Save
              </Button>
              )
            : null}
          <Button
            fullWidth
            className='font-medium'
            color='primary'
            radius='lg'
            variant={isPopular ? 'flat' : 'solid'}
            onPress={handleAddToCart}
            isDisabled={stock === 0}
          >
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  )
}
