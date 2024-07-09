import { DefaultEcommercePage } from './DefaultEcommercePage'
import { useProducts } from '../../../store/ProductsStore'

export function ProductsPage () {
  return (
    <DefaultEcommercePage useStore={useProducts} />
  )
}
