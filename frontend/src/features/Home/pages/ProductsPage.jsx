import { Filters } from '../components/Filters/Filters'
import ProductsGrid from '../components/Products/ProductsGrid'

export function ProductsPage () {
  return (
    <div>
      <Filters />
      <ProductsGrid />
    </div>
  )
}
