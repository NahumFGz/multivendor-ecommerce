import { Chip } from '@nextui-org/react'
import { Icon } from '@iconify/react'
import { SidebarItemType } from './sidebar'
import TeamAvatar from './team-avatar'

export const items = [
  {
    key: 'home',
    href: '#',
    icon: 'solar:home-2-linear',
    title: 'Home',
    ariaLabel: 'Home'
  },
  {
    key: 'projects',
    href: '#',
    icon: 'solar:widget-2-outline',
    title: 'Projects',
    ariaLabel: 'Projects',
    endContent: (
      <Icon className='text-default-400' icon='solar:add-circle-line-duotone' width={24} aria-label='Add project' />
    )
  },
  {
    key: 'tasks',
    href: '#',
    icon: 'solar:checklist-minimalistic-outline',
    title: 'Tasks',
    ariaLabel: 'Tasks',
    endContent: (
      <Icon className='text-default-400' icon='solar:add-circle-line-duotone' width={24} aria-label='Add task' />
    )
  },
  {
    key: 'team',
    href: '#',
    icon: 'solar:users-group-two-rounded-outline',
    title: 'Team',
    ariaLabel: 'Team'
  },
  {
    key: 'tracker',
    href: '#',
    icon: 'solar:sort-by-time-linear',
    title: 'Tracker',
    ariaLabel: 'Tracker',
    endContent: (
      <Chip size='sm' variant='flat' aria-label='New'>
        New
      </Chip>
    )
  },
  {
    key: 'analytics',
    href: '#',
    icon: 'solar:chart-outline',
    title: 'Analytics',
    ariaLabel: 'Analytics'
  },
  {
    key: 'perks',
    href: '#',
    icon: 'solar:gift-linear',
    title: 'Perks',
    ariaLabel: 'Perks',
    endContent: (
      <Chip size='sm' variant='flat' aria-label='3 perks'>
        3
      </Chip>
    )
  },
  {
    key: 'expenses',
    href: '#',
    icon: 'solar:bill-list-outline',
    title: 'Expenses',
    ariaLabel: 'Expenses'
  },
  {
    key: 'settings',
    href: '#',
    icon: 'solar:settings-outline',
    title: 'Settings',
    ariaLabel: 'Settings'
  }
]

export const sectionItems = [
  {
    key: 'overview',
    title: 'Overview',
    items: [
      {
        key: 'home',
        href: '#',
        icon: 'solar:home-2-linear',
        title: 'Home',
        ariaLabel: 'Home'
      },
      {
        key: 'projects',
        href: '#',
        icon: 'solar:widget-2-outline',
        title: 'Projects',
        ariaLabel: 'Projects',
        endContent: (
          <Icon className='text-default-400' icon='solar:add-circle-line-duotone' width={24} aria-label='Add project' />
        )
      },
      {
        key: 'tasks',
        href: '#',
        icon: 'solar:checklist-minimalistic-outline',
        title: 'Tasks',
        ariaLabel: 'Tasks',
        endContent: (
          <Icon className='text-default-400' icon='solar:add-circle-line-duotone' width={24} aria-label='Add task' />
        )
      },
      {
        key: 'team',
        href: '#',
        icon: 'solar:users-group-two-rounded-outline',
        title: 'Team',
        ariaLabel: 'Team'
      },
      {
        key: 'tracker',
        href: '#',
        icon: 'solar:sort-by-time-linear',
        title: 'Tracker',
        ariaLabel: 'Tracker',
        endContent: (
          <Chip size='sm' variant='flat' aria-label='New'>
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
        href: '#',
        title: 'Cap Table',
        icon: 'solar:pie-chart-2-outline',
        ariaLabel: 'Cap Table',
        items: [
          {
            key: 'shareholders',
            href: '#',
            title: 'Shareholders',
            ariaLabel: 'Shareholders'
          },
          {
            key: 'note_holders',
            href: '#',
            title: 'Note Holders',
            ariaLabel: 'Note Holders'
          },
          {
            key: 'transactions_log',
            href: '#',
            title: 'Transactions Log',
            ariaLabel: 'Transactions Log'
          }
        ]
      },
      {
        key: 'analytics',
        href: '#',
        icon: 'solar:chart-outline',
        title: 'Analytics',
        ariaLabel: 'Analytics'
      },
      {
        key: 'perks',
        href: '/perks',
        icon: 'solar:gift-linear',
        title: 'Perks',
        ariaLabel: 'Perks',
        endContent: (
          <Chip size='sm' variant='flat' aria-label='3 perks'>
            3
          </Chip>
        )
      },
      {
        key: 'expenses',
        href: '#',
        icon: 'solar:bill-list-outline',
        title: 'Expenses',
        ariaLabel: 'Expenses'
      },
      {
        key: 'settings',
        href: '/settings',
        icon: 'solar:settings-outline',
        title: 'Settings',
        ariaLabel: 'Settings'
      }
    ]
  }
]

export const sectionItemsWithTeams = [
  ...sectionItems,
  {
    key: 'your-teams',
    title: 'Your Teams',
    ariaLabel: 'Your Teams',
    items: [
      {
        key: 'nextui',
        href: '#',
        title: 'NextUI',
        startContent: <TeamAvatar name='Next UI' aria-label='Next UI Team' />
      },
      {
        key: 'tailwind-variants',
        href: '#',
        title: 'Tailwind Variants',
        startContent: <TeamAvatar name='Tailwind Variants' aria-label='Tailwind Variants Team' />
      },
      {
        key: 'nextui-pro',
        href: '#',
        title: 'NextUI Pro',
        startContent: <TeamAvatar name='NextUI Pro' aria-label='NextUI Pro Team' />
      }
    ]
  }
]

export const brandItems = [
  {
    key: 'overview',
    title: 'Overview',
    ariaLabel: 'Overview',
    items: [
      {
        key: 'home',
        href: '#',
        icon: 'solar:home-2-linear',
        title: 'Home',
        ariaLabel: 'Home'
      },
      {
        key: 'projects',
        href: '#',
        icon: 'solar:widget-2-outline',
        title: 'Projects',
        ariaLabel: 'Projects',
        endContent: (
          <Icon
            className='text-primary-foreground/60'
            icon='solar:add-circle-line-duotone'
            width={24}
            aria-label='Add project'
          />
        )
      },
      {
        key: 'tasks',
        href: '#',
        icon: 'solar:checklist-minimalistic-outline',
        title: 'Tasks',
        ariaLabel: 'Tasks',
        endContent: (
          <Icon
            className='text-primary-foreground/60'
            icon='solar:add-circle-line-duotone'
            width={24}
            aria-label='Add task'
          />
        )
      },
      {
        key: 'team',
        href: '#',
        icon: 'solar:users-group-two-rounded-outline',
        title: 'Team',
        ariaLabel: 'Team'
      },
      {
        key: 'tracker',
        href: '#',
        icon: 'solar:sort-by-time-linear',
        title: 'Tracker',
        ariaLabel: 'Tracker',
        endContent: (
          <Chip className='bg-primary-foreground font-medium text-primary' size='sm' variant='flat' aria-label='New'>
            New
          </Chip>
        )
      }
    ]
  },
  {
    key: 'your-teams',
    title: 'Your Teams',
    ariaLabel: 'Your Teams',
    items: [
      {
        key: 'nextui',
        href: '#',
        title: 'NextUI',
        startContent: (
          <TeamAvatar
            classNames={{
              base: 'border-1 border-primary-foreground/20',
              name: 'text-primary-foreground/80'
            }}
            name='Next UI'
            aria-label='Next UI Team'
          />
        )
      },
      {
        key: 'tailwind-variants',
        href: '#',
        title: 'Tailwind Variants',
        startContent: (
          <TeamAvatar
            classNames={{
              base: 'border-1 border-primary-foreground/20',
              name: 'text-primary-foreground/80'
            }}
            name='Tailwind Variants'
            aria-label='Tailwind Variants Team'
          />
        )
      },
      {
        key: 'nextui-pro',
        href: '#',
        title: 'NextUI Pro',
        startContent: (
          <TeamAvatar
            classNames={{
              base: 'border-1 border-primary-foreground/20',
              name: 'text-primary-foreground/80'
            }}
            name='NextUI Pro'
            aria-label='NextUI Pro Team'
          />
        )
      }
    ]
  }
]

export const sectionLongList = [
  ...sectionItems,
  {
    key: 'payments',
    title: 'Payments',
    ariaLabel: 'Payments',
    items: [
      {
        key: 'payroll',
        href: '#',
        title: 'Payroll',
        icon: 'solar:dollar-minimalistic-linear',
        ariaLabel: 'Payroll'
      },
      {
        key: 'invoices',
        href: '#',
        title: 'Invoices',
        icon: 'solar:file-text-linear',
        ariaLabel: 'Invoices'
      },
      {
        key: 'billing',
        href: '#',
        title: 'Billing',
        icon: 'solar:card-outline',
        ariaLabel: 'Billing'
      },
      {
        key: 'payment-methods',
        href: '#',
        title: 'Payment Methods',
        icon: 'solar:wallet-money-outline',
        ariaLabel: 'Payment Methods'
      },
      {
        key: 'payouts',
        href: '#',
        title: 'Payouts',
        icon: 'solar:card-transfer-outline',
        ariaLabel: 'Payouts'
      }
    ]
  },
  {
    key: 'your-teams',
    title: 'Your Teams',
    ariaLabel: 'Your Teams',
    items: [
      {
        key: 'nextui',
        href: '#',
        title: 'NextUI',
        startContent: <TeamAvatar name='Next UI' aria-label='Next UI Team' />
      },
      {
        key: 'tailwind-variants',
        href: '#',
        title: 'Tailwind Variants',
        startContent: <TeamAvatar name='Tailwind Variants' aria-label='Tailwind Variants Team' />
      },
      {
        key: 'nextui-pro',
        href: '#',
        title: 'NextUI Pro',
        startContent: <TeamAvatar name='NextUI Pro' aria-label='NextUI Pro Team' />
      }
    ]
  }
]

export const sectionNestedItems = [
  {
    key: 'home',
    href: '#',
    icon: 'solar:home-2-linear',
    title: 'Home',
    ariaLabel: 'Home'
  },
  {
    key: 'projects',
    href: '#',
    icon: 'solar:widget-2-outline',
    title: 'Projects',
    ariaLabel: 'Projects',
    endContent: (
      <Icon className='text-default-400' icon='solar:add-circle-line-duotone' width={24} aria-label='Add project' />
    )
  },
  {
    key: 'tasks',
    href: '#',
    icon: 'solar:checklist-minimalistic-outline',
    title: 'Tasks',
    ariaLabel: 'Tasks',
    endContent: (
      <Icon className='text-default-400' icon='solar:add-circle-line-duotone' width={24} aria-label='Add task' />
    )
  },
  {
    key: 'team',
    href: '#',
    icon: 'solar:users-group-two-rounded-outline',
    title: 'Team',
    ariaLabel: 'Team'
  },
  {
    key: 'tracker',
    href: '#',
    icon: 'solar:sort-by-time-linear',
    title: 'Tracker',
    ariaLabel: 'Tracker',
    endContent: (
      <Chip size='sm' variant='flat' aria-label='New'>
        New
      </Chip>
    )
  },
  {
    key: 'analytics',
    href: '#',
    icon: 'solar:chart-outline',
    title: 'Analytics',
    ariaLabel: 'Analytics'
  },
  {
    key: 'perks',
    href: '#',
    icon: 'solar:gift-linear',
    title: 'Perks',
    ariaLabel: 'Perks',
    endContent: (
      <Chip size='sm' variant='flat' aria-label='3 perks'>
        3
      </Chip>
    )
  },
  {
    key: 'cap_table',
    title: 'Cap Table',
    icon: 'solar:pie-chart-2-outline',
    type: SidebarItemType.Nest,
    ariaLabel: 'Cap Table',
    items: [
      {
        key: 'shareholders',
        icon: 'solar:users-group-rounded-linear',
        href: '#',
        title: 'Shareholders',
        ariaLabel: 'Shareholders'
      },
      {
        key: 'note_holders',
        icon: 'solar:notes-outline',
        href: '#',
        title: 'Note Holders',
        ariaLabel: 'Note Holders'
      },
      {
        key: 'transactions_log',
        icon: 'solar:clipboard-list-linear',
        href: '#',
        title: 'Transactions Log',
        ariaLabel: 'Transactions Log'
      }
    ]
  },
  {
    key: 'expenses',
    href: '#',
    icon: 'solar:bill-list-outline',
    title: 'Expenses',
    ariaLabel: 'Expenses'
  }
]
