import { Button, Input, Checkbox, Link } from '@nextui-org/react'
import { Icon } from '@iconify/react'

import { AcmeIcon } from '../../../assets/Social'
import { useState } from 'react'

export function Login () {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => setIsVisible(!isVisible)

  return (
    <div className='flex h-full  w-full flex-col items-center justify-center'>
      <div className='flex flex-col items-center pb-6'>
        <AcmeIcon size={60} />
        <p className='text-xl font-medium'>Welcome Back</p>
        <p className='text-small text-default-500'>Log in to your account to continue</p>
      </div>
      <div className='mt-2 flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 py-6 shadow-small'>
        <form className='flex flex-col gap-3' onSubmit={(e) => e.preventDefault()}>
          <Input
            label='Email Address'
            name='email'
            placeholder='Enter your email'
            type='email'
            variant='bordered'
          />

          <Input
            endContent={
              <button type='button' onClick={toggleVisibility}>
                {isVisible
                  ? (
                    <Icon
                      className='pointer-events-none text-2xl text-default-400'
                      icon='solar:eye-closed-linear'
                    />
                    )
                  : (
                    <Icon
                      className='pointer-events-none text-2xl text-default-400'
                      icon='solar:eye-bold'
                    />
                    )}
              </button>
            }
            label='Password'
            name='password'
            placeholder='Enter your password'
            type={isVisible ? 'text' : 'password'}
            variant='bordered'
          />

          <div className='flex items-center justify-between px-1 py-2'>
            <Checkbox name='remember' size='sm'>
              Remember me
            </Checkbox>
            <Link className='text-default-500' href='#' size='sm'>
              Forgot password?
            </Link>
          </div>
          <Button color='primary' type='submit'>
            Log In
          </Button>
        </form>
        <p className='text-center text-small'>
          Need to create an account?&nbsp;
          <Link href='#' size='sm'>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}
