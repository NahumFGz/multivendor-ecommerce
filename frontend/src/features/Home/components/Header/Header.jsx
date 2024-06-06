import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tabs,
  Tab,
  Avatar,
  Chip,
  ScrollShadow,
  Breadcrumbs,
  BreadcrumbItem,
  Input,
  Badge
} from '@nextui-org/react'
import { Icon } from '@iconify/react'
import { AcmeIcon } from './social'
import NotificationsCard from './notifications-card'
import { Link, useLocation } from 'react-router-dom'
import { homeUrls } from '../../../../routes/urls/homeUrls'

export function Header () {
  const location = useLocation()

  return (
    <div className='w-full'>
      <Navbar
        classNames={{
          base: 'pt-2 lg:pt-2 lg:pb-4 lg:bg-transparent lg:backdrop-filter-none',
          wrapper: 'px-4 sm:px-6',
          item: 'data-[active=true]:text-primary'
        }}
        height='60px'
      >
        <NavbarBrand>
          <NavbarMenuToggle className='mr-2 h-6 sm:hidden' />
          <AcmeIcon />
          <p className='font-bold text-inherit'>ACME</p>
        </NavbarBrand>
        <Breadcrumbs className='hidden lg:flex' radius='full'>
          <BreadcrumbItem>Apps</BreadcrumbItem>
          <BreadcrumbItem>iOS App</BreadcrumbItem>
          <BreadcrumbItem>TestFlight</BreadcrumbItem>
        </Breadcrumbs>

        {/* Right Menu */}
        <NavbarContent className='ml-auto h-12 max-w-fit items-center gap-0' justify='end'>
          {/* Search */}
          <NavbarItem className='mr-2 hidden sm:flex'>
            <Input
              aria-label='Search'
              classNames={{
                inputWrapper: 'bg-content2 dark:bg-content1'
              }}
              labelPlacement='outside'
              placeholder='Search...'
              radius='full'
              startContent={
                <Icon className='text-default-500' icon='solar:magnifer-linear' width={20} />
              }
            />
          </NavbarItem>
          <NavbarItem className='hidden sm:flex'>
            <Button isIconOnly radius='full' variant='light'>
              <Icon className='text-default-500' icon='solar:sun-linear' width={24} />
            </Button>
          </NavbarItem>
          {/* Settings */}
          <NavbarItem className='hidden sm:flex'>
            <Button isIconOnly radius='full' variant='light'>
              <Icon className='text-default-500' icon='solar:settings-linear' width={24} />
            </Button>
          </NavbarItem>
          {/* Notifications */}
          <NavbarItem className='flex'>
            <Popover offset={12} placement='bottom-end'>
              <PopoverTrigger>
                <Button
                  disableRipple
                  isIconOnly
                  className='overflow-visible'
                  radius='full'
                  variant='light'
                >
                  <Badge color='danger' content='5' showOutline={false} size='md'>
                    <Icon className='text-default-500' icon='solar:bell-linear' width={22} />
                  </Badge>
                </Button>
              </PopoverTrigger>
              <PopoverContent className='max-w-[90vw] p-0 sm:max-w-[380px]'>
                <NotificationsCard className='w-full shadow-none' />
              </PopoverContent>
            </Popover>
          </NavbarItem>
          {/* User Menu */}
          <NavbarItem className='px-2'>
            <Dropdown placement='bottom-end'>
              <DropdownTrigger>
                <button className='mt-1 h-8 w-8 outline-none transition-transform'>
                  <Badge color='success' content='' placement='bottom-right' shape='circle'>
                    <Avatar size='sm' src='https://i.pravatar.cc/150?u=a04258114e29526708c' />
                  </Badge>
                </button>
              </DropdownTrigger>
              <DropdownMenu aria-label='Profile Actions' variant='flat'>
                <DropdownItem key='profile' className='h-14 gap-2' textValue='Profile'>
                  <p className='font-semibold'>Signed in as</p>
                  <p className='font-semibold'>johndoe@example.com</p>
                </DropdownItem>
                <DropdownItem key='settings' textValue='Settings'>My Settings</DropdownItem>
                <DropdownItem key='team_settings' textValue='Team Settings'>Team Settings</DropdownItem>
                <DropdownItem key='analytics' textValue='Analytics'>Analytics</DropdownItem>
                <DropdownItem key='system' textValue='System'>System</DropdownItem>
                <DropdownItem key='configurations' textValue='Configurations'>Configurations</DropdownItem>
                <DropdownItem key='help_and_feedback' textValue='Help & Feedback'>Help & Feedback</DropdownItem>
                <DropdownItem key='logout' color='danger' textValue='Log Out'>
                  Log Out
                </DropdownItem>
              </DropdownMenu>

            </Dropdown>
          </NavbarItem>
        </NavbarContent>

        {/* Mobile Menu */}
        <NavbarMenu>
          <NavbarMenuItem isActive={location.pathname === homeUrls.home}>
            <Link className='w-full' color='foreground' to={homeUrls.home}>
              Home
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem isActive={location.pathname === homeUrls.products}>
            <Link className='w-full' to={homeUrls.products}>
              Products
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem isActive={location.pathname === homeUrls.boardGames}>
            <Link className='w-full' color='foreground' to={homeUrls.boardGames}>
              Juegos de mesa
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem isActive={location.pathname === homeUrls.marketplace}>
            <Link className='w-full' color='foreground' to={homeUrls.marketplace}>
              Marketplace
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem isActive={location.pathname === homeUrls.promos}>
            <Link className='w-full' color='foreground' to={homeUrls.promos}>
              Promos
            </Link>
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>

      {/* Main Menu */}
      <main className='flex w-full justify-center lg:mt-6'>
        <ScrollShadow
          hideScrollBar
          className='flex w-full max-w-[1024px] justify-between gap-8 border-b border-divider px-4 sm:px-8'
          orientation='horizontal'
        >
          <Tabs
            aria-label='Navigation Tabs'
            classNames={{
              tabList: 'w-full relative rounded-none p-0 gap-4 lg:gap-6',
              tab: 'max-w-fit px-0 h-12',
              cursor: 'w-full',
              tabContent: 'text-default-400'
            }}
            radius='full'
            variant='underlined'
          >
            <Tab key='home' title={<Link to={homeUrls.home}>Home</Link>} />
            <Tab key='products' title={<Link to={homeUrls.products}>Productos</Link>} />
            <Tab key='boardgames' title={<Link to={homeUrls.boardGames}>Juegos de mesa</Link>} />
            <Tab key='marketplace' title={<Link to={homeUrls.marketplace}>Marketplace</Link>} />
            <Tab
              key='promos'
              title={
                <Link to={homeUrls.promos}>
                  <div className='flex items-center gap-2'>
                    <p>Promos</p>
                    <Chip size='sm'>9</Chip>
                  </div>
                </Link>
              }
            />
          </Tabs>
        </ScrollShadow>
      </main>
    </div>
  )
}
