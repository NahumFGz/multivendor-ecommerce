import React from 'react'
import { Avatar, Button, cn } from '@nextui-org/react'
import { Icon } from '@iconify/react'

const FavoriteItem = React.forwardRef(
  ({ image, name, price, className, ...props }, ref) => {
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
          <p className='text-tiny text-default-400'>${price}</p>
        </div>
        <Button isIconOnly radius='full' variant='light'>
          <Icon className='text-default-500' icon='solar:trash-bin-minimalistic-broken' width={22} />
        </Button>
      </div>
    )
  }
)

FavoriteItem.displayName = 'FavoriteItem'

export default FavoriteItem
