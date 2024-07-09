import { DefaultEcommercePage } from './DefaultEcommercePage'
import { usePromos } from '../../../store/PromosStore'

export function PromosPage () {
  return (
    <DefaultEcommercePage useStore={usePromos} />
  )
}
