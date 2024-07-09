import { HomeLayout } from '../layouts/HomeLayout'
import { DefaultEcommercePage } from './DefaultEcommercePage'
import { useProducts } from '../../../store/ProductsStore'

export function ProductsPage () {
  return (
    <HomeLayout>
      <DefaultEcommercePage useStore={useProducts} />
    </HomeLayout>
  )
}
