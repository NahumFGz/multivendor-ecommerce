import React from 'react'
import { Button, Input, Checkbox, Link, Divider } from '@nextui-org/react'
import { Icon } from '@iconify/react'

import { AcmeIcon } from '../../../assets/Social'
import { useNavigate } from 'react-router-dom'
import { authUrls } from '../../../routes/urls/authUrls'

export function Register () {
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = React.useState(false)
  const [isConfirmVisible, setIsConfirmVisible] = React.useState(false)

  const toggleVisibility = () => setIsVisible(!isVisible)
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible)

  const handleNavigate = (url) => {
    navigate(url)
  }

  return (
    <div className='flex h-full w-full flex-col items-center justify-center'>
      <div className='flex flex-col items-center pb-2'>
        <AcmeIcon size={60} />
        <p className='text-xl font-medium'>Welcome</p>
        <p className='text-small text-default-500'>Create your account to get started</p>
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

          <Input
            endContent={
              <button type='button' onClick={toggleConfirmVisibility}>
                {isConfirmVisible
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
            label='Confirm Password'
            name='confirmPassword'
            placeholder='Confirm your password'
            type={isConfirmVisible ? 'text' : 'password'}
            variant='bordered'
          />

          <Checkbox className='py-4' size='sm'>
            I agree with the&nbsp;
            <Link
              size='sm'
              onPress={() => handleNavigate(authUrls.termsOfService)}
            >
              Terms
            </Link>
            &nbsp; and&nbsp;
            <Link
              size='sm'
              onPress={() => handleNavigate(authUrls.privacyPolicy)}
            >
              Privacy Policy
            </Link>
          </Checkbox>
          <Button color='primary' type='submit'>
            Sign Up
          </Button>
        </form>
        <div className='flex items-center gap-4'>
          <Divider className='flex-1' />
          <p className='shrink-0 text-tiny text-default-500'>OR</p>
          <Divider className='flex-1' />
        </div>
        <p className='text-center text-small'>
          Already have an account?&nbsp;
          <Link
            size='sm'
            onPress={() => handleNavigate(authUrls.login)}
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  )
}
