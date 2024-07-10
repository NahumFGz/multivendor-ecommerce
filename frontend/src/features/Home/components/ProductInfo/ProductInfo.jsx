import ProductViewInfo from './ProductViewInfo'
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { useProductsAPI } from '../../hooks/useProductsAPI'
import { useParams } from 'react-router-dom'

export function ProductInfo () {
  const { 'product-slug': productSlug } = useParams()
  const { getProductDetail } = useProductsAPI()
  const [catSubCat, setCatSubCat] = useState({
    categories: '',
    subCategories: ''
  })
  const [item, setItem] = useState({
    id: 0,
    name: '',
    description: '',
    images: [],
    price: 0,
    rating: 0,
    ratingCount: 0
  })

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await getProductDetail(productSlug)
        setCatSubCat({
          categories: response.categoryName,
          subCategories: response.subCategoryName
        })
        setItem({
          id: response.id,
          name: response.productName,
          description: response.descriptionShort,
          images: [
            response.images.principal
          ],
          price: response.price,
          rating: response.rating,
          ratingCount: 0
        })
        console.log(response)
      } catch (error) {
        console.error(error)
      }
    }

    fetchProductDetail()
  }, [])

  return (
    <div className='max-w-8xl h-full w-full px-2 lg:px-24'>
      <nav className='my-4 py-2'>
        <Breadcrumbs>
          <BreadcrumbItem>Productos</BreadcrumbItem>
          <BreadcrumbItem>{catSubCat?.categories}</BreadcrumbItem>
          <BreadcrumbItem>{catSubCat?.subCategories}</BreadcrumbItem>
        </Breadcrumbs>
      </nav>
      <ProductViewInfo {...item} />
    </div>
  )
}
