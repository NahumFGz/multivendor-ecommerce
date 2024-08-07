import { Avatar, Button, cn } from '@nextui-org/react'
import { Icon } from '@iconify/react'
import { forwardRef } from 'react'

const CartItem = forwardRef(
  ({ image, name, price, quantity, onIncrement, onDecrement, onRemove, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex gap-3 border-b border-divider px-6 py-4',
          className
        )}
        {...props}
      >
        <div className='flex-none'>
          <Avatar src={image} />
        </div>
        <div className='flex flex-col gap-1 flex-grow'>
          <p className='text-small text-foreground'>
            <strong className='font-medium'>{name}</strong>
          </p>
          <p className='text-tiny text-default-400'>S/. {price}</p>
          <div className='flex items-center gap-2'>
            <Button isIconOnly radius='full' variant='light' onClick={onDecrement}>
              <Icon className='text-default-500' icon='solar:minus-circle-outline' width={22} />
            </Button>
            <p className='text-tiny text-default-400'>Quantity: {quantity}</p>
            <Button isIconOnly radius='full' variant='light' onClick={onIncrement}>
              <Icon className='text-default-500' icon='carbon:add-alt' width={22} />
            </Button>
          </div>
        </div>
        <Button isIconOnly radius='full' variant='light' onClick={onRemove}>
          <Icon className='text-default-500' icon='solar:trash-bin-minimalistic-broken' width={22} />
        </Button>
      </div>
    )
  }
)

CartItem.displayName = 'CartItem'

export default CartItem
