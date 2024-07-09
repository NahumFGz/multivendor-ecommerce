import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react'

import ProductViewInfo from './ProductViewInfo'

const item = {
  id: '942837-003',
  name: 'Nike Air Max 270',
  description:
    'The Nike Air Max 270 delivers an even more adaptive fit than before. Stretch material in the upper moves with your foot, while the tri-star outsole pattern adjusts to your every step for a ride that delivers support and flexibility where you need it.',
  images: [
    'https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/shoes/product-view/1.jpeg',
    'https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/shoes/product-view/2.jpeg',
    'https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/shoes/product-view/3.jpeg',
    'https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/shoes/product-view/4.jpeg',
    'https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/shoes/product-view/5.jpeg',
    'https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/shoes/product-view/6.jpeg'
  ],

  price: 80.97,
  rating: 4.8,
  ratingCount: 669
}

export function ProductInfo () {
  return (
    <div className='max-w-8xl h-full w-full px-2 lg:px-24'>
      <nav className='my-4 py-2'>
        <Breadcrumbs>
          <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbItem>Shoes Category</BreadcrumbItem>
          <BreadcrumbItem>Training Shoes</BreadcrumbItem>
        </Breadcrumbs>
      </nav>
      <ProductViewInfo {...item} />
    </div>
  )
}
