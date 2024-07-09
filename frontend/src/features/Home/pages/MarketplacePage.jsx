import { HomeLayout } from '../layouts/HomeLayout'
import { DefaultEcommercePage } from './DefaultEcommercePage'
import { useMarketplace } from '../../../store/MarketplaceStore'

export function MarketplacePage () {
  return (
    <HomeLayout>
      <DefaultEcommercePage useStore={useMarketplace} />
    </HomeLayout>
  )
}
