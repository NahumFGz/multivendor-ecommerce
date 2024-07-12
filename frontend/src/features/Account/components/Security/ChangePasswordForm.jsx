import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { Button, Input } from '@nextui-org/react'
import { Icon } from '@iconify/react'
import { useState } from 'react'

export function ChangePasswordForm () {
  const [isCurrentVisible, setIsCurrentVisible] = useState(false)
  const [isNewVisible, setIsNewVisible] = useState(false)
  const [isConfirmVisible, setIsConfirmVisible] = useState(false)

  const toggleCurrentVisibility = () => setIsCurrentVisible(!isCurrentVisible)
  const toggleNewVisibility = () => setIsNewVisible(!isNewVisible)
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible)

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required('Current Password is required'),
      newPassword: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
        .required('New Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required('Confirm Password is required')
    }),
    onSubmit: async (values, { resetForm }) => {
      const changePasswordData = {
        old_password: values.currentPassword,
        new_password: values.newPassword,
        new_password2: values.confirmPassword
      }
      try {
        console.log(changePasswordData)
        // await changePassword(changePasswordData)
        resetForm()
        toast.success('Password changed successfully')
      } catch (error) {
        console.log('Error changing')
        toast.error('Error changing password')
      }
    }
  })

  return (
    <form className='mt-8' onSubmit={formik.handleSubmit}>
      <div className='space-y-12'>
        <div className='grid grid-cols-1 gap-x-8 gap-y-10 border-b border-default-900/10 pb-12 md:grid-cols-3'>
          <div>
            <h2 className='text-base font-semibold leading-7 text-default-900'>Change Password</h2>
            <p className='mt-1 text-sm leading-6 text-default-500'>Enter your current password and a new password to change your password.</p>
          </div>
          <div className='grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2'>
            <div className='sm:col-span-4'>
              <Input
                id='currentPassword'
                name='currentPassword'
                label='Current Password'
                placeholder='Enter your current password'
                type={isCurrentVisible ? 'text' : 'password'}
                variant={formik.touched.currentPassword && formik.errors.currentPassword ? 'flat' : 'bordered'}
                color={formik.touched.currentPassword && formik.errors.currentPassword ? 'danger' : 'default'}
                autocomplete='current-password'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.currentPassword}
                endContent={
                  <button type='button' onClick={toggleCurrentVisibility}>
                    {isCurrentVisible
                      ? <Icon className='pointer-events-none text-2xl text-default-400' icon='solar:eye-closed-linear' />
                      : <Icon className='pointer-events-none text-2xl text-default-400' icon='solar:eye-bold' />}
                  </button>
                }
              />
            </div>

            <div className='sm:col-span-4'>
              <Input
                id='newPassword'
                name='newPassword'
                label='New Password'
                placeholder='Enter your new password'
                type={isNewVisible ? 'text' : 'password'}
                variant={formik.touched.newPassword && formik.errors.newPassword ? 'flat' : 'bordered'}
                color={formik.touched.newPassword && formik.errors.newPassword ? 'danger' : 'default'}
                autocomplete='new-password'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.newPassword}
                endContent={
                  <button type='button' onClick={toggleNewVisibility}>
                    {isNewVisible
                      ? <Icon className='pointer-events-none text-2xl text-default-400' icon='solar:eye-closed-linear' />
                      : <Icon className='pointer-events-none text-2xl text-default-400' icon='solar:eye-bold' />}
                  </button>
                }
              />
            </div>

            <div className='sm:col-span-4'>
              <Input
                id='confirmPassword'
                name='confirmPassword'
                label='Confirm New Password'
                placeholder='Confirm your new password'
                type={isConfirmVisible ? 'text' : 'password'}
                variant={formik.touched.confirmPassword && formik.errors.confirmPassword ? 'flat' : 'bordered'}
                color={formik.touched.confirmPassword && formik.errors.confirmPassword ? 'danger' : 'default'}
                autocomplete='new-password'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                endContent={
                  <button type='button' onClick={toggleConfirmVisibility}>
                    {isConfirmVisible
                      ? <Icon className='pointer-events-none text-2xl text-default-400' icon='solar:eye-closed-linear' />
                      : <Icon className='pointer-events-none text-2xl text-default-400' icon='solar:eye-bold' />}
                  </button>
                }
              />
            </div>

            <div className='sm:col-span-4'>
              <Button
                type='submit'
                color='primary'
                isDisabled={!formik.isValid}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
