import { DefaultEcommercePage } from './DefaultEcommercePage'
import { useMarketplace } from '../../../store/MarketplaceStore'

export function MarketplacePage () {
  return (
    <DefaultEcommercePage useStore={useMarketplace} />
  )
}
