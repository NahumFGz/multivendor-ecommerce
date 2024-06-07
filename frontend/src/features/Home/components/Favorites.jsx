import React, { useState } from 'react'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  ScrollShadow,
  CardFooter
} from '@nextui-org/react'
import { Icon } from '@iconify/react'

import FavoriteItem from './FavoriteItem'

const initialFavoriteItems = [
  {
    id: '1',
    image: 'https://via.placeholder.com/150',
    name: 'Product 1',
    price: 29.99
  },
  {
    id: '2',
    image: 'https://via.placeholder.com/150',
    name: 'Product 2',
    price: 19.99
  }
  // Agrega más productos según sea necesario
]

export function Favorites (props) {
  // eslint-disable-next-line no-unused-vars
  const [favoriteItems, setFavoriteItems] = useState(initialFavoriteItems)

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
                    {...item}
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
        <Button variant='flat'>Clear Favorites</Button>
      </CardFooter>
    </Card>
  )
}
