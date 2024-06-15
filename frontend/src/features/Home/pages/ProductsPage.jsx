import { Filters } from '../components/Filters/Filters'
import { Products } from '../components/Products/Products'

export function ProductsPage () {
  return (
    <div className='mx-12 mt-2'>
      <Filters />
      <div>
        <Products />
      </div>
    </div>
  )
}
