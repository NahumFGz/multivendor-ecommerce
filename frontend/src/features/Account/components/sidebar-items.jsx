import { Chip } from '@nextui-org/react'
import { Icon } from '@iconify/react'
import { accountUrls } from '../../../routes/urls/accountUrls'

export const sectionItems = [
  {
    key: 'overview',
    title: 'Overview',
    items: [
      {
        key: 'dashboard',
        to: accountUrls.dashboard,
        icon: 'solar:home-2-linear',
        title: 'Dashboard'
      },
      {
        key: 'directions',
        to: accountUrls.directions,
        icon: 'solar:widget-2-outline',
        title: 'Directions',
        endContent: (
          <Icon className='text-default-400' icon='solar:add-circle-line-duotone' width={24} />
        )
      },
      {
        key: 'tasks',
        to: '#',
        icon: 'solar:checklist-minimalistic-outline',
        title: 'Tasks',
        endContent: (
          <Icon className='text-default-400' icon='solar:add-circle-line-duotone' width={24} />
        )
      },
      {
        key: 'team',
        to: '#',
        icon: 'solar:users-group-two-rounded-outline',
        title: 'Team'
      },
      {
        key: 'tracker',
        to: '#',
        icon: 'solar:sort-by-time-linear',
        title: 'Tracker',
        endContent: (
          <Chip size='sm' variant='flat'>
            New
          </Chip>
        )
      }
    ]
  },
  {
    key: 'organization',
    title: 'Organization',
    items: [
      {
        key: 'cap_table',
        to: '#',
        title: 'Cap Table',
        icon: 'solar:pie-chart-2-outline',
        items: [
          {
            key: 'shareholders',
            to: '#',
            title: 'Shareholders'
          },
          {
            key: 'note_holders',
            to: '#',
            title: 'Note Holders'
          },
          {
            key: 'transactions_log',
            to: '#',
            title: 'Transactions Log'
          }
        ]
      },
      {
        key: 'analytics',
        to: '#',
        icon: 'solar:chart-outline',
        title: 'Analytics'
      },
      {
        key: 'perks',
        to: '/perks',
        icon: 'solar:gift-linear',
        title: 'Perks',
        endContent: (
          <Chip size='sm' variant='flat'>
            3
          </Chip>
        )
      },
      {
        key: 'expenses',
        to: '#',
        icon: 'solar:bill-list-outline',
        title: 'Expenses'
      },
      {
        key: 'settings',
        to: '/settings',
        icon: 'solar:settings-outline',
        title: 'Settings'
      }
    ]
  }
]
