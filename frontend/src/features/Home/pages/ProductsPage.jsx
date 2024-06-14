import { Filters } from '../components/Filters/Filters'
import { Products } from '../components/Products/Products'

export function ProductsPage () {
  return (
    <div>
      <Filters />
      <div className='block rounded-medium border-medium border-dashed border-divider m-2'>
        <Products />
      </div>
    </div>
  )
}
