import { forwardRef } from 'react'
import { Icon } from '@iconify/react'
import { Button, Image, Link, Tooltip } from '@nextui-org/react'
import { cn } from '../../../../services/utilities/cn'

const OrderSummaryItem = forwardRef(
  ({ children, name, href, price, color, size, quantity, imageSrc, className, productSlugName, onIncrement, onDecrement, onRemove, ...props }, ref) => (
    <li
      ref={ref}
      className={cn('flex items-center gap-x-4 border-b-small border-divider py-4', className)}
      {...props}
    >
      <div className='flex h-20 w-20 flex-shrink-0 items-center justify-center'>
        <Image alt={name} src={imageSrc} />
      </div>
      <div className='flex flex-1 flex-col'>
        <h4 className='text-small'>
          <Link className='font-medium text-foreground' href={href} underline='hover'>
            {name || children}
          </Link>
        </h4>
        <div className='mt-2 flex items-center gap-2'>
          <span className='text-small font-semibold text-default-700'>S/. {price}</span>
          <span className='text-small text-default-500'>x {quantity}</span>
        </div>
      </div>
      <div className='flex items-center gap-2 ml-auto'>
        <Tooltip content='Decrement' placement='top'>
          <Button isIconOnly className='h-7 w-7 min-w-[1.5rem]' radius='full' variant='flat' onClick={onDecrement}>
            <Icon className='text-default-500' icon='solar:minus-circle-outline' width={22} />
          </Button>
        </Tooltip>
        <Tooltip content='Increment' placement='top'>
          <Button isIconOnly className='h-7 w-7 min-w-[1.5rem]' radius='full' variant='flat' onClick={onIncrement}>
            <Icon className='text-default-500' icon='carbon:add-alt' width={22} />
          </Button>
        </Tooltip>
        <Tooltip content='Remove' placement='top'>
          <Button isIconOnly className='h-7 w-7 min-w-[1.5rem]' radius='full' variant='flat' onClick={onRemove}>
            <Icon className='text-default-500' icon='solar:trash-bin-minimalistic-broken' width={22} />
          </Button>
        </Tooltip>
      </div>

    </li>
  )
)

OrderSummaryItem.displayName = 'OrderSummaryItem'

export default OrderSummaryItem
