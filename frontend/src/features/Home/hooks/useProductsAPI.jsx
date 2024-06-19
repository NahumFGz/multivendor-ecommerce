import { getProductDetailApi, getProductsApi } from '../../../services/api/productsAPI'
const BASE_URL = import.meta.env.VITE_BASE_API_URL

export function useProductsAPI () {
  const getProducts = async () => {
    try {
      const response = await getProductsApi()
      return response?.map((product) => ({
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
    } catch (error) {
      throw new Error('Get products failed')
    }
  }

  const getProductDetail = async (slugProduct) => {
    try {
      const product = await getProductDetailApi(slugProduct)
      return {
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
        updatedAt: product.updated_at,
        description: product.description,
        descriptionShort: product.short_description
      }
    } catch (error) {
      throw new Error('Get product detail failed')
    }
  }

  return { getProducts, getProductDetail }
}
