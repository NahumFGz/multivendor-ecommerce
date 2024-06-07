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

import CartItem from './CartItem'

const initialCartItems = [
  {
    id: '1',
    image: 'https://via.placeholder.com/150',
    name: 'Product 1',
    price: 29.99,
    quantity: 1
  },
  {
    id: '2',
    image: 'https://via.placeholder.com/150',
    name: 'Product 2',
    price: 19.99,
    quantity: 2
  }
  // Agrega más productos según sea necesario
]

export function Cart (props) {
  const [cartItems, setCartItems] = useState(initialCartItems)

  const incrementQuantity = (id) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    )
  }

  const decrementQuantity = (id) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    )
  }

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <Card className='w-full max-w-[420px]' {...props}>
      <CardHeader className='flex flex-col px-0 pb-0'>
        <div className='flex w-full items-center justify-between px-5 py-2'>
          <div className='inline-flex items-center gap-1'>
            <h4 className='inline-block align-middle text-large font-medium'>Shopping Cart</h4>
            <Chip size='sm' variant='flat'>
              {totalItems}
            </Chip>
          </div>
          <Button className='h-8 px-3' color='primary' radius='full' variant='light'>
            Checkout
          </Button>
        </div>
      </CardHeader>
      <CardBody className='w-full gap-0 p-0'>
        <ScrollShadow className='h-[500px] w-full'>
          {cartItems.length > 0
            ? (
                cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    {...item}
                    onIncrement={() => incrementQuantity(item.id)}
                    onDecrement={() => decrementQuantity(item.id)}
                  />
                ))
              )
            : (
              <div className='flex h-full w-full flex-col items-center justify-center gap-2'>
                <Icon className='text-default-400' icon='solar:cart-linear' width={40} />
                <p className='text-small text-default-400'>Your cart is empty.</p>
              </div>
              )}
        </ScrollShadow>
      </CardBody>
      <CardFooter className='flex justify-between items-center px-4'>
        <p className='text-large font-medium'>Total: ${totalAmount}</p>
        <Button variant='flat'>Checkout</Button>
      </CardFooter>
    </Card>
  )
}
