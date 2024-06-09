import React from 'react'
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
  Input,
  Badge
} from '@nextui-org/react'
import { Icon } from '@iconify/react'
import { AcmeIcon } from '../assets/Social'
import { Notifications } from './Notifications'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { homeUrls } from '../routes/urls/homeUrls'
import { useSwapTheme } from '../store/ThemeStore'
import { Cart } from './Cart'
import { Favorites } from './Favorites'
import { accountUrls } from '../routes/urls/accountUrls'

export function Header () {
  const location = useLocation()
  const navigate = useNavigate()
  const { handleSwapTheme, theme } = useSwapTheme()

  const handleDropdownClick = (url) => {
    navigate(url)
  }

  const handleTabChange = (key) => {
    switch (key) {
      case 'home':
        navigate(homeUrls.home)
        break
      case 'products':
        navigate(homeUrls.products)
        break
      case 'boardgames':
        navigate(homeUrls.boardGames)
        break
      case 'marketplace':
        navigate(homeUrls.marketplace)
        break
      case 'promos':
        navigate(homeUrls.promos)
        break
      default:
        break
    }
  }

  const getActiveTab = () => {
    if (location.pathname === homeUrls.home) return 'home'
    if (location.pathname.startsWith(homeUrls.products)) return 'products'
    if (location.pathname.startsWith(homeUrls.boardGames)) return 'boardgames'
    if (location.pathname.startsWith(homeUrls.marketplace)) return 'marketplace'
    if (location.pathname.startsWith(homeUrls.promos)) return 'promos'
    return null
  }

  return (
    <div className='w-full'>
      <Navbar
        classNames={{
          base: 'pt-2 lg:pt-4 lg:backdrop-filter-none',
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

        {/* Right Menu */}
        <NavbarContent className='ml-auto h-12 max-w-fit items-center gap-0' justify='center'>
          {/* Search */}
          <NavbarItem className='mr-2'>
            <Input
              aria-label='Search'
              classNames={{
                inputWrapper: 'bg-content2 dark:bg-content1'
              }}
              labelPlacement='outside'
              placeholder='Search...'
              radius='full'
              className='w-32 sm:w-64 md:w-80 lg:w-96'
              startContent={
                <Icon className='text-default-500' icon='solar:magnifer-linear' width={20} />
              }
            />
          </NavbarItem>
          {/* Swap theme */}
          {/* <NavbarItem className='hidden md:flex'>
            <Button isIconOnly radius='full' variant='light' onClick={handleSwapTheme}>
              {theme === 'dark'
                ? <Icon className='text-default-500' icon='solar:sun-linear' width={24} />
                : <Icon className='text-default-500' icon='solar:moon-linear' width={22} />}
            </Button>
          </NavbarItem> */}
          {/* Notifications */}
          <NavbarItem className='hidden md:flex'>
            <Popover offset={12} placement='bottom-end'>
              <PopoverTrigger>
                <Button
                  disableRipple
                  isIconOnly
                  className='overflow-visible'
                  radius='full'
                  variant='light'
                >
                  <Badge color='danger' content='' showOutline={false} size='md'>
                    <Icon className='text-default-500' icon='solar:bell-linear' width={22} />
                  </Badge>
                </Button>
              </PopoverTrigger>
              <PopoverContent className='max-w-[90vw] p-0 sm:max-w-[380px]'>
                <Notifications className='w-full shadow-none' />
              </PopoverContent>
            </Popover>
          </NavbarItem>
          {/* Favorites */}
          <NavbarItem className='hidden md:flex'>
            <Popover offset={12} placement='bottom-end'>
              <PopoverTrigger>
                <Button
                  disableRipple
                  isIconOnly
                  className='overflow-visible'
                  radius='full'
                  variant='light'
                >
                  <Badge color='' content='' showOutline={false} size='md'>
                    <Icon className='text-default-500' icon='carbon:favorite' width={22} />
                  </Badge>
                </Button>
              </PopoverTrigger>
              <PopoverContent className='max-w-[90vw] p-0 sm:max-w-[380px]'>
                <Favorites className='w-full shadow-none' />
              </PopoverContent>
            </Popover>
          </NavbarItem>
          {/* Shopping Cart */}
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
                  <Badge color='danger' content='9' showOutline={false} size='md'>
                    <Icon className='text-default-500' icon='solar:cart-plus-outline' width={24} />
                  </Badge>
                </Button>
              </PopoverTrigger>
              <PopoverContent className='max-w-[90vw] p-0 sm:max-w-[380px]'>
                <Cart className='w-full shadow-none' />
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
                <DropdownItem key='my_account' textValue='Settings' onClick={() => handleDropdownClick(accountUrls.profile)}>
                  Mi cuenta
                </DropdownItem>
                <DropdownItem key='team_settings' textValue='Team Settings' onClick={() => handleDropdownClick(accountUrls.shopping)}>
                  Ver compras
                </DropdownItem>
                <DropdownItem key='analytics' textValue='Analytics' onClick={() => handleDropdownClick(accountUrls.publishProduct)}>
                  Publicar un producto
                </DropdownItem>
                {
                  theme === 'dark'
                    ? <DropdownItem key='light' textValue='Light Mode' onClick={handleSwapTheme}>Activar modo claro</DropdownItem>
                    : <DropdownItem key='dark' textValue='Dark Mode' onClick={handleSwapTheme}>Activar modo oscuro</DropdownItem>
                }
                <DropdownItem key='logout' color='danger' textValue='Log Out'>
                  Cerrar sesion
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>

        {/* Mobile Menu */}
        <NavbarMenu className='flex gap-4'>
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
            selectedKey={getActiveTab()}
            onSelectionChange={handleTabChange}
          >
            <Tab key='home' title='Home' />
            <Tab key='products' title='Productos' />
            <Tab key='boardgames' title='Juegos de mesa' />
            <Tab key='marketplace' title='Marketplace' />
            <Tab
              key='promos'
              title={
                <div className='flex items-center gap-2'>
                  <p>Promos</p>
                  <Chip size='sm'>9</Chip>
                </div>
              }
            />
          </Tabs>
        </ScrollShadow>
      </main>
    </div>
  )
}
