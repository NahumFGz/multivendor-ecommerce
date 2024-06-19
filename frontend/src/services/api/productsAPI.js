import { createAxiosInstance } from './axiosInstance'

const BASE_URL = import.meta.env.VITE_BASE_API_URL

// const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))
const roundToTwoDecimals = (num) => Math.round(num * 100) / 100
// const roundToTwoDecimals = (num) => parseFloat(num.toFixed(2))

export async function getProductsApi () {
  try {
    const axiosInstance = createAxiosInstance()
    const response = await axiosInstance.get('/api/products/')
    const { data, status } = response

    if (status === 200) {
      const products = data.products.map(product => ({
        id: product.id,
        name: product.title,
        price: roundToTwoDecimals(parseFloat(product.price)),
        imageSrc: product.images.small ? `${BASE_URL}${product.images.small}` : '',
        productSlugName: product.slug,
        categoryId: product.category?.id || 0,
        categoryName: product.category?.name || '',
        kindId: product.kind_of_product?.id || 0,
        kindName: product.kind_of_product?.name || '',
        subKindId: product.sub_kind_of_product?.id || 0,
        subKindName: product.sub_kind_of_product?.name || '',
        rating: roundToTwoDecimals(parseFloat(product.rating)),
        views: parseInt(product.views, 10),
        updatedAt: product.updated_at,
        stock: product.stock,
        isPresale: product.is_presale
      }))

      return {
        products,
        totalCount: data.count
      }
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
        price: roundToTwoDecimals(parseFloat(data.price)),
        rating: roundToTwoDecimals(parseFloat(data.rating)),
        views: parseInt(data.views, 10),
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
        descriptionShort: data.short_description,
        stock: data.stock,
        isPresale: data.is_presale
      }
    } else {
      throw new Error('Get product detail failed')
    }
  } catch (error) {
    throw new Error('Get product detail failed')
  }
}
