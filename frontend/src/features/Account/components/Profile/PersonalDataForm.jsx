import { Autocomplete, AutocompleteItem, Input, Button, Select, SelectItem, Avatar } from '@nextui-org/react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import countries from '../../../../assets/Countries'

const GENDER_CHOICES = [
  { label: 'Male', value: 'M' },
  { label: 'Female', value: 'F' },
  { label: 'Other', value: 'O' }
]

const DOC_CHOICES = [
  { label: 'Passport', value: 'passport' },
  { label: 'ID Card', value: 'id_card' },
  { label: 'Driver License', value: 'driver_license' }
]

export function PersonalDataForm () {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      birthDate: '',
      gender: '',
      documentType: '',
      documentNumber: '',
      phoneCountryCode: '',
      phoneNumber: '',
      email: '',
      country: ''
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      birthDate: Yup.date().required('Birth date is required'),
      gender: Yup.string().required('Gender is required'),
      documentType: Yup.string().required('Document type is required'),
      documentNumber: Yup.string().required('Document number is required'),
      phoneCountryCode: Yup.string().required('Phone country code is required'),
      phoneNumber: Yup.string().required('Phone number is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      country: Yup.string().required('Country is required')
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        console.log(values)
        // Aquí puedes manejar el envío de datos, por ejemplo a un servidor
        resetForm()
        toast.success('Personal data submitted successfully')
      } catch (error) {
        console.log('Error submitting personal data')
        toast.error('Error submitting personal data')
      }
    }
  })

  return (
    <form className='mt-8' onSubmit={formik.handleSubmit}>
      <div className='space-y-12'>
        <div className='grid grid-cols-1 gap-x-8 gap-y-10 border-b border-default-900/10 pb-12 md:grid-cols-3'>
          <div>
            <h2 className='text-base font-semibold leading-7 text-default-900'>Personal Data</h2>
            <p className='mt-1 text-sm leading-6 text-default-500'>Update your personal data.</p>
          </div>
          <div className='grid max-w-2xl grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8 md:col-span-2'>
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
                id='birthDate'
                name='birthDate'
                isRequired
                label='Birth date'
                labelPlacement='outside'
                placeholder='Enter your birth date'
                type='date'
                variant='flat'
                value={formik.values.birthDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                color={formik.touched.birthDate && formik.errors.birthDate ? 'danger' : 'default'}
              />
              {formik.touched.birthDate && formik.errors.birthDate && (
                <p className='ml-3 text-tiny text-[#f31260]'>{formik.errors.birthDate}</p>
              )}
            </div>

            <div className='col-span-1'>
              <Select
                id='gender'
                name='gender'
                isRequired
                label='Gender'
                labelPlacement='outside'
                placeholder='Select your gender'
                variant='flat'
                value={formik.values.gender}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                color={formik.touched.gender && formik.errors.gender ? 'danger' : 'default'}
              >
                {GENDER_CHOICES.map((choice) => (
                  <SelectItem key={choice.value} value={choice.value}>
                    {choice.label}
                  </SelectItem>
                ))}
              </Select>
              {formik.touched.gender && formik.errors.gender && (
                <p className='ml-3 text-tiny text-[#f31260]'>{formik.errors.gender}</p>
              )}
            </div>

            <div className='col-span-1'>
              <Select
                id='documentType'
                name='documentType'
                isRequired
                label='Document type'
                labelPlacement='outside'
                placeholder='Select document type'
                variant='flat'
                value={formik.values.documentType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                color={formik.touched.documentType && formik.errors.documentType ? 'danger' : 'default'}
              >
                {DOC_CHOICES.map((choice) => (
                  <SelectItem key={choice.value} value={choice.value}>
                    {choice.label}
                  </SelectItem>
                ))}
              </Select>
              {formik.touched.documentType && formik.errors.documentType && (
                <p className='ml-3 text-tiny text-[#f31260]'>{formik.errors.documentType}</p>
              )}
            </div>

            <div className='col-span-1'>
              <Input
                id='documentNumber'
                name='documentNumber'
                isRequired
                label='Document number'
                labelPlacement='outside'
                placeholder='Enter your document number'
                variant='flat'
                value={formik.values.documentNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                color={formik.touched.documentNumber && formik.errors.documentNumber ? 'danger' : 'default'}
              />
              {formik.touched.documentNumber && formik.errors.documentNumber && (
                <p className='ml-3 text-tiny text-[#f31260]'>{formik.errors.documentNumber}</p>
              )}
            </div>

            <div className='col-span-1'>
              <Input
                id='phoneCountryCode'
                name='phoneCountryCode'
                isRequired
                label='Phone country code'
                labelPlacement='outside'
                placeholder='Enter phone country code'
                variant='flat'
                value={formik.values.phoneCountryCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                color={formik.touched.phoneCountryCode && formik.errors.phoneCountryCode ? 'danger' : 'default'}
              />
              {formik.touched.phoneCountryCode && formik.errors.phoneCountryCode && (
                <p className='ml-3 text-tiny text-[#f31260]'>{formik.errors.phoneCountryCode}</p>
              )}
            </div>

            <div className='col-span-1'>
              <Input
                id='phoneNumber'
                name='phoneNumber'
                isRequired
                label='Phone number'
                labelPlacement='outside'
                placeholder='Enter your phone number'
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
