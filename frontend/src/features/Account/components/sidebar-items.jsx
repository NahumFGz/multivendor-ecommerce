import { Chip } from '@nextui-org/react'
import { accountUrls } from '../../../routes/urls/accountUrls'

export const sectionItems = [
  {
    key: 'account',
    title: 'Account',
    items: [
      {
        key: 'profile',
        to: accountUrls.profile,
        icon: 'solar:user-circle-linear',
        title: 'Profile'
      },
      {
        key: 'directions',
        to: accountUrls.directions,
        icon: 'solar:route-outline',
        title: 'Directions'
      },
      {
        key: 'security',
        to: accountUrls.security,
        icon: 'solar:shield-check-linear',
        title: 'Security'
      },
      {
        key: 'payments',
        to: '#',
        icon: 'solar:wallet-outline',
        title: 'Payments',
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
        key: 'dashboard',
        to: accountUrls.dashboard,
        icon: 'solar:chart-outline',
        title: 'Dashboard'
      },
      {
        key: 'selling',
        to: accountUrls.selling,
        icon: 'solar:tag-outline',
        title: 'Selling'
      },
      {
        key: 'shopping',
        to: accountUrls.shopping,
        icon: 'solar:cart-linear',
        title: 'Shopping'
      },
      {
        key: 'tracking',
        to: '#',
        icon: 'solar:pin-outline',
        title: 'Tracking',
        endContent: (
          <Chip size='sm' variant='flat'>
            Soon
          </Chip>
        )
      }
    ]
  }
]
