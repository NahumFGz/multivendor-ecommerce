import React from 'react'
import { Input } from '@nextui-org/react'

export function Test () {
  const colors = [
    'default',
    'primary',
    'secondary',
    'success',
    'warning',
    'danger'
  ]

  return (
    <div className='w-full flex flex-row flex-wrap gap-4'>
      {colors.map((color) => (
        <Input
          key={color}
          type='text'
          color={color}
          label='Name'
          placeholder='Enter your email'
          className='max-w-[220px]'
          variant='flat'
        />
      ))}
    </div>
  )
}
