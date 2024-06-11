import { useId } from 'react'
import { useForgotPasswordForm } from '../hooks/useForgotPasswordForm'
import { Button, Input } from '@nextui-org/react'

export function ForgotPasswordForm ({ onClose, getEmail }) {
  const { formik } = useForgotPasswordForm({ onClose, getEmail })
  const emailId = useId()

  return (
    <div className='p-2'>
      <h3 className='text-base font-semibold leading-6 text-gray-900 dark:text-white'>¿Olvidaste tu contraseña?</h3>
      <div className='mt-2 max-w-xl text-sm text-gray-500 dark:text-gray-400'>
        <p>Ingresa tu correo y recibirás un mensaje con el enlace de recuperación.</p>
      </div>
      <form
        className='mt-5 sm:flex sm:items-center gap-2'
        noValidate
        onSubmit={formik.handleSubmit}
      >
        <div className='w-full sm:max-w-xs'>
          <label htmlFor={emailId} className='sr-only'>
            Email
          </label>

          <Input
            id={emailId}
            name='email'
            placeholder='Enter your email'
            type='email'
            variant={formik.touched.email && formik.errors.email ? 'flat' : 'bordered'}
            color={formik.touched.email && formik.errors.email ? 'danger' : 'default'}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
        </div>
        <Button color='primary' type='submit'>
          Enviar
        </Button>
      </form>
    </div>
  )
}
