import { Chip } from '@nextui-org/react'
import { accountUrls } from '../../../../routes/urls/accountUrls'

export const sectionItems = [
  {
    key: 'account',
    title: 'Account',
    items: [
      {
        key: 'profile',
        to: accountUrls.profile,
        icon: 'solar:user-circle-linear',
        title: 'Perfil'
      },
      {
        key: 'directions',
        to: accountUrls.directions,
        icon: 'solar:route-outline',
        title: 'Direcciones'
      },
      {
        key: 'security',
        to: accountUrls.security,
        icon: 'solar:shield-check-linear',
        title: 'Seguridad'
      },
      {
        key: 'payments',
        to: accountUrls.paymentMethods,
        icon: 'solar:wallet-outline',
        title: 'Formas de pago',
        endContent: (
          <Chip size='sm' variant='flat'>
            Soon
          </Chip>
        )
      }
    ]
  },
  {
    key: 'marketplace',
    title: 'Marketplace',
    items: [
      {
        key: 'publish_product',
        to: accountUrls.publishProduct,
        icon: 'solar:upload-outline',
        title: 'Publicar producto'
      },
      {
        key: 'selling',
        to: accountUrls.selling,
        icon: 'solar:tag-outline',
        title: 'Mis ventas'
      },
      {
        key: 'shopping',
        to: accountUrls.shopping,
        icon: 'solar:cart-linear',
        title: 'Mis compras'
      },
      {
        key: 'tracking',
        to: accountUrls.tracking,
        icon: 'solar:pin-outline',
        title: 'Tracking',
        endContent: (
          <Chip size='sm' variant='flat'>
            Soon
          </Chip>
        )
      },
      {
        key: 'statistics',
        to: accountUrls.dashboard,
        icon: 'solar:chart-outline',
        title: 'Mis estadísticas',
        endContent: (
          <Chip size='sm' variant='flat'>
            Soon
          </Chip>
        )
      }
    ]
  }
]
