import { createAxiosInstance } from './axiosInstance'

const BASE_URL = import.meta.env.VITE_BASE_API_URL

export async function getProductsApi () {
  try {
    const axiosInstance = createAxiosInstance()
    const response = await axiosInstance.get('/api/products/')
    const { data, status } = response

    if (status === 200) {
      return data.map(product => ({
        id: product.id,
        categoryId: product.category?.id || 0,
        categoryName: product.category?.name || '',
        kindId: product.kind_of_product?.id || 0,
        kindName: product.kind_of_product?.name || '',
        subKindId: product.sub_kind_of_product?.id || 0,
        subKindName: product.sub_kind_of_product?.name || '',
        price: product.price,
        rating: product.rating,
        views: product.views,
        productName: product.title,
        productSlugName: product.slug,
        images: {
          principal: product.images.principal ? `${BASE_URL}${product.images.principal}` : '',
          small: product.images.small ? `${BASE_URL}${product.images.small}` : '',
          medium: product.images.medium ? `${BASE_URL}${product.images.medium}` : '',
          large: product.images.large ? `${BASE_URL}${product.images.large}` : ''
        },
        updatedAt: product.updated_at
      }))
    } else {
      throw new Error('Get products failed')
    }
  } catch (error) {
    throw new Error('Get products failed')
  }
}

export async function getProductDetailApi (slugProduct) {
  try {
    const axiosInstance = createAxiosInstance()
    const response = await axiosInstance.get(`/api/products/${slugProduct}/`)
    const { data, status } = response

    if (status === 200) {
      return {
        id: data.id,
        categoryId: data.category?.id || 0,
        categoryName: data.category?.name || '',
        kindId: data.kind_of_product?.id || 0,
        kindName: data.kind_of_product?.name || '',
        subKindId: data.sub_kind_of_product?.id || 0,
        subKindName: data.sub_kind_of_product?.name || '',
        price: data.price,
        rating: data.rating,
        views: data.views,
        productName: data.title,
        productSlugName: data.slug,
        images: {
          principal: data.images.principal ? `${BASE_URL}${data.images.principal}` : '',
          small: data.images.small ? `${BASE_URL}${data.images.small}` : '',
          medium: data.images.medium ? `${BASE_URL}${data.images.medium}` : '',
          large: data.images.large ? `${BASE_URL}${data.images.large}` : ''
        },
        updatedAt: data.updated_at,
        description: data.description,
        descriptionShort: data.short_description
      }
    } else {
      throw new Error('Get product detail failed')
    }
  } catch (error) {
    throw new Error('Get product detail failed')
  }
}
