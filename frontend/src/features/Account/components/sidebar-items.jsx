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
        icon: 'solar:home-2-linear',
        title: 'Profile'
      },
      {
        key: 'directions',
        to: accountUrls.directions,
        icon: 'solar:widget-2-outline',
        title: 'Directions'
      },
      {
        key: 'security',
        to: accountUrls.security,
        icon: 'solar:checklist-minimalistic-outline',
        title: 'Security'
      },
      {
        key: 'payments',
        to: '#',
        icon: 'solar:users-group-two-rounded-outline',
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
        icon: 'solar:gift-linear',
        title: 'Selling'

      },
      {
        key: 'shopping',
        to: accountUrls.shopping,
        icon: 'solar:bill-list-outline',
        title: 'Shopping'
      },
      {
        key: 'tracking',
        to: '#',
        icon: 'solar:settings-outline',
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
