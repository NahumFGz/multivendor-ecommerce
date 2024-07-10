import { Button, Card, CardBody, CardHeader, Chip, ScrollShadow, CardFooter } from '@nextui-org/react'
import { Icon } from '@iconify/react'
import FavoriteItem from './FavoriteItem'
import { useFavorites } from '../../../../store/FavoritesStore'
import { useCart } from '../../../../store/CartStore'

export function Favorites ({ ...props }) {
  const { favoriteItems, removeFromFavorites, clearFavorites } = useFavorites()
  const { addToCart } = useCart()

  const handleAddToCart = (item) => {
    addToCart(item)
    removeFromFavorites(item.id)
  }

  const totalItems = favoriteItems.length

  return (
    <Card className='w-full max-w-[420px]' {...props}>
      <CardHeader className='flex flex-col px-0 pb-0'>
        <div className='flex w-full items-center justify-between px-5 py-2'>
          <div className='inline-flex items-center gap-1'>
            <h4 className='inline-block align-middle text-large font-medium'>Favorites</h4>
            <Chip size='sm' variant='flat'>
              {totalItems}
            </Chip>
          </div>
          <Button className='h-8 px-3' color='primary' radius='full' variant='light'>
            View All
          </Button>
        </div>
      </CardHeader>
      <CardBody className='w-full gap-0 p-0'>
        <ScrollShadow className='h-[500px] w-full'>
          {favoriteItems.length > 0
            ? (
                favoriteItems.map((item) => (
                  <FavoriteItem
                    key={item.id}
                    image={item.imageSrc}
                    name={item.name}
                    price={item.price}
                    onAddToCart={() => handleAddToCart(item)}
                    onRemove={() => removeFromFavorites(item.id)}
                  />
                ))
              )
            : (
              <div className='flex h-full w-full flex-col items-center justify-center gap-2'>
                <Icon className='text-default-400' icon='solar:heart-broken-linear' width={40} />
                <p className='text-small text-default-400'>No favorites yet.</p>
              </div>
              )}
        </ScrollShadow>
      </CardBody>
      <CardFooter className='flex justify-end items-center px-4'>
        <Button variant='flat' onPress={clearFavorites}>Clear Favorites</Button>
      </CardFooter>
    </Card>
  )
}
