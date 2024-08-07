import { createAxiosInstance } from './axiosInstance'

const BASE_URL = import.meta.env.VITE_BASE_API_URL

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))
const roundToTwoDecimals = (num) => Math.round(num * 100) / 100
// const roundToTwoDecimals = (num) => parseFloat(num.toFixed(2))

export async function getProductsApi (page, pageSize, ordering = '', categories = [], subCategories = [], searchQuery = '', vendorType = 1) {
  try {
    const axiosInstance = createAxiosInstance()
    const params = {
      page,
      page_size: pageSize,
      ordering,
      vendor_type: vendorType,
      search: searchQuery
    }

    if (categories.length > 0) {
      params.categories = categories.join(',')
    }
    if (subCategories.length > 0) {
      params.sub_categories = subCategories.join(',')
    }

    const response = await axiosInstance.get('/api/products/', { params })
    const { data, status } = response

    if (status === 200) {
      await delay(0)
      const products = data.products.results.map(product => ({
        id: product.id,
        name: product.title,
        price: roundToTwoDecimals(parseFloat(product.price)),
        imageSrc: product.images.small ? `${BASE_URL}${product.images.small}` : '',
        productSlugName: product.slug,
        rating: roundToTwoDecimals(parseFloat(product.rating)),
        views: parseInt(product.views, 10),
        updatedAt: product.updated_at,
        stock: product.stock,
        isPresale: product.is_presale
      }))

      return {
        products,
        links: data.products.links,
        totalProducts: data.products.count
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
        subCategoryId: data.sub_category?.id || 0,
        subCategoryName: data.sub_category?.name || '',
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
