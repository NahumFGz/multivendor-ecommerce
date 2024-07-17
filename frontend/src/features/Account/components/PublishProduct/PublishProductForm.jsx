import { useEffect, useState } from 'react'
import { Input, Textarea, Button, Select, SelectItem } from '@nextui-org/react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { Icon } from '@iconify/react'
import { useFilters } from '../../../../store/FiltersStore'
import { getCategories, getSubCategoryByCategoryId } from '../../../Home/hooks/useInfoAPI'

export function PublishProductForm () {
  const { filters } = useFilters()
  const [selectedImage, setSelectedImage] = useState(null)
  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])

  useEffect(() => {
    console.log('filters... ', filters)
    console.log('categories... ', getCategories(filters))
    console.log('subCategories... ', getSubCategoryByCategoryId(filters))
    setCategories(getCategories(filters))
    setSubCategories(getSubCategoryByCategoryId(filters))
  }, [filters])

  const formik = useFormik({
    initialValues: {
      category: '',
      subCategory: '',
      title: '',
      shortDescription: '',
      price: '',
      stock: ''
    },
    validationSchema: Yup.object({
      category: Yup.string().required('Category is required'),
      subCategory: Yup.string().required('SubCategory is required'),
      title: Yup.string().required('Title is required'),
      shortDescription: Yup.string(),
      price: Yup.number().required('Price is required').positive('Price must be positive'),
      stock: Yup.number().required('Stock is required').integer('Stock must be an integer')
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        console.log(values)
        // Aquí puedes manejar el envío de datos, por ejemplo a un servidor
        resetForm()
        toast.success('Product information submitted successfully')
      } catch (error) {
        console.log('Error submitting product information')
        toast.error('Error submitting product information')
      }
    }
  })

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new window.FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='space-y-12'>
        <div className='grid grid-cols-1 gap-x-8 gap-y-10 border-b border-default-900/10 pb-12 md:grid-cols-3'>
          <div>
            <h2 className='text-base font-semibold leading-7 text-default-900'>Product Details</h2>
            <p className='mt-1 text-sm leading-6 text-default-500'>
              Fill out the information about the product.
            </p>
          </div>

          <div className='grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2'>
            <div className='sm:col-span-3'>
              <Select
                id='category'
                name='category'
                label='Category'
                placeholder='Select a category'
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                color={formik.touched.category && formik.errors.category ? 'danger' : 'default'}
              >
                {categories.map((category) => (
                  <SelectItem key={category.categoryId} value={category.categoryId} textValue={category.categoryName}>
                    {category.categoryName}
                  </SelectItem>
                ))}
              </Select>
              {formik.touched.category && formik.errors.category && (
                <p className='ml-3 text-tiny text-[#f31260]'>{formik.errors.category}</p>
              )}
            </div>

            <div className='sm:col-span-3'>
              <Select
                id='subCategory'
                name='subCategory'
                label='SubCategory'
                placeholder='Select a sub-category'
                value={formik.values.subCategory}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                color={formik.touched.subCategory && formik.errors.subCategory ? 'danger' : 'default'}
              >
                {subCategories.map((subCategory) => (
                  <SelectItem key={subCategory.subCategoryId} value={subCategory.subCategoryId} textValue={subCategory.subCategoryName}>
                    {subCategory.subCategoryName}
                  </SelectItem>
                ))}
              </Select>
              {formik.touched.subCategory && formik.errors.subCategory && (
                <p className='ml-3 text-tiny text-[#f31260]'>{formik.errors.subCategory}</p>
              )}
            </div>

            <div className='col-span-full'>
              <Input
                id='title'
                name='title'
                label='Title'
                labelPlacement='outside'
                placeholder='Enter product title'
                variant='flat'
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                color={formik.touched.title && formik.errors.title ? 'danger' : 'default'}
              />
              {formik.touched.title && formik.errors.title && (
                <p className='ml-3 text-tiny text-[#f31260]'>{formik.errors.title}</p>
              )}
            </div>

            <div className='col-span-full'>
              <Textarea
                id='shortDescription'
                name='shortDescription'
                label='Short Description'
                labelPlacement='outside'
                placeholder='Enter a short description of the product'
                rows={3}
                value={formik.values.shortDescription}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                color={formik.touched.shortDescription && formik.errors.shortDescription ? 'danger' : 'default'}
              />
              {formik.touched.shortDescription && formik.errors.shortDescription && (
                <p className='ml-3 text-tiny text-[#f31260]'>{formik.errors.shortDescription}</p>
              )}
            </div>

            <div className='col-span-full'>
              <label htmlFor='image_principal' className='block text-sm font-medium leading-6 text-default-900'>
                Product image
              </label>
              <div className='mt-2 flex items-center gap-x-3'>
                {selectedImage
                  ? (
                    <img src={selectedImage} alt='Selected' className='h-36 w-36 rounded' />
                    )
                  : (
                    <img src='https://via.placeholder.com/150' alt='Default' className='h-36 w-36 rounded' />
                    )}
                <input
                  id='image_principal'
                  name='image_principal'
                  type='file'
                  accept='image/*'
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
                <label htmlFor='image_principal'>
                  <Button
                    size='sm'
                    startContent={
                      <Icon className='text-default-500' icon='solar:paperclip-linear' width={18} />
                    }
                    variant='flat'
                    as='span'
                  >
                    Attach
                  </Button>
                </label>
              </div>
            </div>

            <div className='sm:col-span-3'>
              <Input
                id='price'
                name='price'
                label='Price'
                labelPlacement='outside'
                placeholder='Enter product price'
                type='number'
                step='0.01'
                variant='flat'
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                color={formik.touched.price && formik.errors.price ? 'danger' : 'default'}
              />
              {formik.touched.price && formik.errors.price && (
                <p className='ml-3 text-tiny text-[#f31260]'>{formik.errors.price}</p>
              )}
            </div>

            <div className='sm:col-span-3'>
              <Input
                id='stock'
                name='stock'
                label='Stock'
                labelPlacement='outside'
                placeholder='Enter product stock'
                type='number'
                variant='flat'
                value={formik.values.stock}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                color={formik.touched.stock && formik.errors.stock ? 'danger' : 'default'}
              />
              {formik.touched.stock && formik.errors.stock && (
                <p className='ml-3 text-tiny text-[#f31260]'>{formik.errors.stock}</p>
              )}
            </div>

            <div className='col-span-full'>
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
