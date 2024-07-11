import { forwardRef } from 'react'
import { Button, Divider, Input } from '@nextui-org/react'
import OrderSummaryItem from './OrderSummaryItem'
import { useCart } from '../../../../store/CartStore'

const OrderSummary = forwardRef(({ hideTitle, ...props }, ref) => {
  const { cartItems, totalPrice, updateQuantity, removeFromCart } = useCart()

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
    <div ref={ref} {...props}>
      {!hideTitle && (
        <>
          <h2 className='font-medium text-default-500'>Your Order</h2>
          <Divider className='mt-4' />
        </>
      )}

      <h3 className='sr-only'>Items in your cart</h3>
      <ul>
        {cartItems?.map((item) => (
          <OrderSummaryItem
            key={item.id}
            {...item}
            onIncrement={() => incrementQuantity(item.id)}
            onDecrement={() => decrementQuantity(item.id)}
            onRemove={() => removeFromCart(item.id)}
          />
        ))}
      </ul>
      <div>
        <form className='mb-4 mt-6 flex items-end gap-2' onSubmit={(e) => e.preventDefault()}>
          <Input
            classNames={{
              label: 'text-default-700',
              inputWrapper: 'bg-background'
            }}
            color='primary'
            label='Coupon code'
            labelPlacement='outside'
            placeholder='Enter coupon code'
            variant='bordered'
            aria-label='Coupon code'
          />

          <Button type='submit'>Apply</Button>
        </form>

        <dl className='flex flex-col gap-4 py-4'>
          <div className='flex justify-between'>
            <dt className='text-small text-default-500'>Subtotal</dt>
            <dd className='text-small font-semibold text-default-700'>S/. {totalPrice.toFixed(2)}</dd>
          </div>
          <div className='flex justify-between'>
            <dt className='text-small text-default-500'>Delivery</dt>
            <dd className='text-small font-semibold text-default-700'>S/. 0.00</dd>
          </div>
          {/* <div className='flex justify-between'>
            <dt className='text-small text-default-500'>Tax</dt>
            <dd className='text-small font-semibold text-default-700'>S/. 0.00</dd>
          </div> */}
          <div className='flex justify-between'>
            <dt className='text-small text-default-500'>Discount</dt>
            <dd className='text-small font-semibold text-success'>- S/. 0.00</dd>
          </div>
          <Divider />
          <div className='flex justify-between'>
            <dt className='text-small font-semibold text-default-500'>Total</dt>
            <dd className='text-small font-semibold text-default-700'>S/. {totalPrice.toFixed(2)}</dd>
          </div>
        </dl>
      </div>
    </div>
  )
})

OrderSummary.displayName = 'OrderSummary'

export default OrderSummary
