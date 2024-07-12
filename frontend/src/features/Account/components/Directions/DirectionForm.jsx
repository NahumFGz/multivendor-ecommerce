import { Autocomplete, AutocompleteItem, Avatar, Input, Button } from '@nextui-org/react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import countries from '../../../../assets/Countries'

export function DirectionForm () {
  const formik = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      address: '',
      apt: '',
      city: '',
      country: '',
      postalCode: '',
      phoneNumber: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      address: Yup.string().required('Address is required'),
      city: Yup.string().required('City is required'),
      country: Yup.string().required('Country is required'),
      postalCode: Yup.string().required('Postal code is required'),
      phoneNumber: Yup.string().required('Phone number is required')
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        console.log(values)
        // Aquí puedes manejar el envío de datos, por ejemplo a un servidor
        resetForm()
        toast.success('Shipping information submitted successfully')
      } catch (error) {
        console.log('Error submitting shipping information')
        toast.error('Error submitting shipping information')
      }
    }
  })

  return (
    <form className='mt-8' onSubmit={formik.handleSubmit}>
      <div className='space-y-12'>
        <div className='grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-3'>
          <div>
            <h2 className='text-base font-semibold leading-7 text-default-900'>Shipping Information</h2>
            <p className='mt-1 text-sm leading-6 text-default-500'>Please provide your shipping details to complete your purchase.</p>
          </div>
          <div className='grid max-w-2xl grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8 md:col-span-2'>
            <div className='col-span-1 sm:col-span-2'>
              <Input
                id='email'
                name='email'
                isRequired
                label='Email address'
                labelPlacement='outside'
                placeholder='Enter your email'
                type='email'
                variant='flat'
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                color={formik.touched.email && formik.errors.email ? 'danger' : 'default'}
              />
              {formik.touched.email && formik.errors.email && (
                <p className='ml-3 text-tiny text-[#f31260]'>{formik.errors.email}</p>
              )}
            </div>

            <div className='col-span-1'>
              <Input
                id='firstName'
                name='firstName'
                isRequired
                label='First name'
                labelPlacement='outside'
                placeholder='Enter your first name'
                variant='flat'
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                color={formik.touched.firstName && formik.errors.firstName ? 'danger' : 'default'}
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <p className='ml-3 text-tiny text-[#f31260]'>{formik.errors.firstName}</p>
              )}
            </div>

            <div className='col-span-1'>
              <Input
                id='lastName'
                name='lastName'
                isRequired
                label='Last name'
                labelPlacement='outside'
                placeholder='Enter your last name'
                variant='flat'
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                color={formik.touched.lastName && formik.errors.lastName ? 'danger' : 'default'}
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <p className='ml-3 text-tiny text-[#f31260]'>{formik.errors.lastName}</p>
              )}
            </div>

            <div className='col-span-1'>
              <Input
                id='address'
                name='address'
                isRequired
                label='Address'
                labelPlacement='outside'
                placeholder='Lane 1, Street 1'
                variant='flat'
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                color={formik.touched.address && formik.errors.address ? 'danger' : 'default'}
              />
              {formik.touched.address && formik.errors.address && (
                <p className='ml-3 text-tiny text-[#f31260]'>{formik.errors.address}</p>
              )}
            </div>

            <div className='col-span-1'>
              <Input
                id='apt'
                name='apt'
                label='Apt, suite, etc.'
                labelPlacement='outside'
                placeholder='Apartment, studio, or floor'
                variant='flat'
                value={formik.values.apt}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            <div className='col-span-1'>
              <Input
                id='city'
                name='city'
                isRequired
                label='City'
                labelPlacement='outside'
                placeholder='Enter your city'
                variant='flat'
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                color={formik.touched.city && formik.errors.city ? 'danger' : 'default'}
              />
              {formik.touched.city && formik.errors.city && (
                <p className='ml-3 text-tiny text-[#f31260]'>{formik.errors.city}</p>
              )}
            </div>

            <div className='col-span-1'>
              <Autocomplete
                id='country'
                name='country'
                isRequired
                defaultItems={countries}
                label='Country'
                labelPlacement='outside'
                placeholder='Select country'
                showScrollIndicators={false}
                variant='flat'
                value={formik.values.country}
                onSelectionChange={(key) => formik.setFieldValue('country', key.anchorKey)}
                onBlur={formik.handleBlur}
                color={formik.touched.country && formik.errors.country ? 'danger' : 'default'}
              >
                {(item) => (
                  <AutocompleteItem
                    key={item.code}
                    startContent={
                      <Avatar
                        alt='Country Flag'
                        className='h-6 w-6'
                        src={`https://flagcdn.com/${item.code.toLowerCase()}.svg`}
                      />
                    }
                    value={item.code}
                  >
                    {item.name}
                  </AutocompleteItem>
                )}
              </Autocomplete>
              {formik.touched.country && formik.errors.country && (
                <p className='ml-3 text-tiny text-[#f31260]'>{formik.errors.country}</p>
              )}
            </div>

            <div className='col-span-1'>
              <Input
                id='postalCode'
                name='postalCode'
                isRequired
                label='Postal code'
                labelPlacement='outside'
                placeholder='12345'
                variant='flat'
                value={formik.values.postalCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                color={formik.touched.postalCode && formik.errors.postalCode ? 'danger' : 'default'}
              />
              {formik.touched.postalCode && formik.errors.postalCode && (
                <p className='ml-3 text-tiny text-[#f31260]'>{formik.errors.postalCode}</p>
              )}
            </div>

            <div className='col-span-1'>
              <Input
                id='phoneNumber'
                name='phoneNumber'
                isRequired
                label='Phone number'
                labelPlacement='outside'
                placeholder='+1 (555) 555-5555'
                variant='flat'
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                color={formik.touched.phoneNumber && formik.errors.phoneNumber ? 'danger' : 'default'}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <p className='ml-3 text-tiny text-[#f31260]'>{formik.errors.phoneNumber}</p>
              )}
            </div>

            <div className='col-span-2'>
              <Button
                type='submit'
                color='primary'
                isDisabled={!formik.isValid}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
