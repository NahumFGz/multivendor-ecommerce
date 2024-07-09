import { HomeLayout } from '../layouts/HomeLayout'
import { DefaultEcommercePage } from './DefaultEcommercePage'
import { usePromos } from '../../../store/PromosStore'

export function PromosPage () {
  return (
    <HomeLayout>
      <DefaultEcommercePage useStore={usePromos} />
    </HomeLayout>
  )
}
