import { Button, Input, Checkbox, Link, Divider } from '@nextui-org/react'
import { Icon } from '@iconify/react'
import { AcmeIcon } from '../../../assets/Social'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authUrls } from '../../../routes/urls/authUrls'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
})

export function Login () {
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)
  const toggleVisibility = () => setIsVisible(!isVisible)

  const handleNavigate = (url) => {
    navigate(url)
  }

  const formik = useFormik({
    initialValues: { email: '', password: '', remember: false },
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission
      console.log(values)
    }
  })

  return (
    <div className='flex h-full w-full flex-col items-center justify-center'>
      <div className='flex flex-col items-center pb-6'>
        <AcmeIcon size={60} />
        <p className='text-xl font-medium'>Welcome Back</p>
        <p className='text-small text-default-500'>Log in to your account to continue</p>
      </div>
      <div className='mt-2 flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 py-6 shadow-small'>
        <form className='flex flex-col gap-3' onSubmit={formik.handleSubmit}>
          <Input
            label='Email Address'
            name='email'
            placeholder='Enter your email'
            type='email'
            variant={formik.touched.email && formik.errors.email ? 'flat' : 'bordered'}
            color={formik.touched.email && formik.errors.email ? 'danger' : 'default'}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
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
            variant={formik.touched.password && formik.errors.password ? 'flat' : 'bordered'}
            color={formik.touched.password && formik.errors.password ? 'danger' : 'default'}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className={formik.touched.password && formik.errors.password ? 'border-red-500' : ''}
          />

          <div className='flex items-center justify-between px-1 py-2'>
            <Checkbox
              name='remember'
              size='sm'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              checked={formik.values.remember}
            >
              Remember me
            </Checkbox>
            <Link
              className='text-default-500 cursor-pointer'
              size='sm'
              onPress={() => handleNavigate(authUrls.forgotPassword)}
            >
              Forgot password?
            </Link>
          </div>
          <Button color='primary' type='submit'>
            Log In
          </Button>
        </form>
        <div className='flex items-center gap-4'>
          <Divider className='flex-1' />
          <p className='shrink-0 text-tiny text-default-500'>OR</p>
          <Divider className='flex-1' />
        </div>
        <div className='flex flex-col gap-2'>
          <Button
            isDisabled
            startContent={<Icon icon='flat-color-icons:google' width={24} />}
            variant='bordered'
          >
            Continue with Google
          </Button>
        </div>
        <p className='text-center text-small'>
          Need to create an account?&nbsp;
          <Link
            size='sm'
            className='cursor-pointer'
            onPress={() => handleNavigate(authUrls.register)}
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}
