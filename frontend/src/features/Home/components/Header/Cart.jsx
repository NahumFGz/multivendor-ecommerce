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
import { useCart } from '../../../../store/CartStore'

export function Cart (props) {
  const {
    cartItems,
    totalQuantity,
    totalPrice,
    updateQuantity,
    removeFromCart,
    clearCart
  } = useCart()

  const incrementQuantity = (id) => {
    const item = cartItems.find(item => item.id === id)
    updateQuantity(id, item.quantity + 1)
  }

  const decrementQuantity = (id) => {
    const item = cartItems.find(item => item.id === id)
    if (item.quantity > 1) {
      updateQuantity(id, item.quantity - 1)
    }
  }

  return (
    <Card className='w-full max-w-[420px]' {...props}>
      <CardHeader className='flex flex-col px-0 pb-0'>
        <div className='flex w-full items-center justify-between px-5 py-2'>
          <div className='inline-flex items-center gap-1'>
            <h4 className='inline-block align-middle text-large font-medium'>Shopping Cart</h4>
            <Chip size='sm' variant='flat'>
              {totalQuantity}
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
                    image={item.imageSrc}
                    name={item.name}
                    price={item.price}
                    quantity={item.quantity}
                    onIncrement={() => incrementQuantity(item.id)}
                    onDecrement={() => decrementQuantity(item.id)}
                    onRemove={() => removeFromCart(item.id)}
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
        <p className='text-large font-medium'>Total: S/. {totalPrice.toFixed(2)}</p>
        <Button variant='flat' onPress={clearCart}>Checkout</Button>
      </CardFooter>
    </Card>
  )
}
