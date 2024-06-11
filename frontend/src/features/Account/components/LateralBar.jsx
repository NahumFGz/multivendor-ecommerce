import React from 'react'
import { Avatar, Button, Spacer, useDisclosure } from '@nextui-org/react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'

import { AcmeLogo } from '../../../assets/AcmeLogo'
import { sectionItems } from './SidebarItems'
import { accountUrls } from '../../../routes/urls/accountUrls'
import { useSwapTheme } from '../../../store/ThemeStore'
import { homeUrls } from '../../../routes/urls/homeUrls'
import SidebarDrawer from './SidebarDrawer'
import Sidebar from './Sidebar'

export function LateralBar ({ children }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { handleSwapTheme, theme } = useSwapTheme()
  const location = useLocation()
  const navigate = useNavigate()

  const getPageTitle = () => {
    switch (location.pathname) {
      case accountUrls.dashboard:
        return 'Dashboard'
      case accountUrls.directions:
        return 'Directions'
      case accountUrls.profile:
        return 'Perfil de usuario'
      case accountUrls.selling:
        return 'Mis ventas'
      case accountUrls.shopping:
        return 'Mis compras'
      case accountUrls.security:
        return 'Seguridad'
      case accountUrls.payments:
        return 'Formas de pago'
      case accountUrls.tracking:
        return 'Tracking'
      case accountUrls.publishProduct:
        return 'Publicar producto'
      default:
        return 'Overview'
    }
  }

  const content = (
    <div className='relative flex h-full w-72 flex-1 flex-col p-6'>
      <div className='flex items-center gap-2 px-2'>
        <div
          title='Haz clic para ir a la página de inicio'
          className='flex h-8 w-8 items-center justify-center rounded-full bg-foreground cursor-pointer'
          onClick={() => navigate(homeUrls.home)}
        >
          <AcmeLogo className='text-background' />
        </div>
        <span
          title='Haz clic para ir a la página de inicio'
          className='text-small font-bold uppercase text-foreground cursor-pointer'
          onClick={() => navigate(homeUrls.home)}
        >Acme
        </span>
      </div>
      <Spacer y={8} />
      <div className='flex items-center gap-3 px-3'>
        <Avatar isBordered size='sm' src='https://i.pravatar.cc/150?u=a04258114e29026708c' />
        <div className='flex flex-col'>
          <p className='text-small font-medium text-default-600'>John Doe</p>
          <p className='text-tiny text-default-400'>Product Designer</p>
        </div>
      </div>

      <Spacer y={8} />

      <Sidebar defaultSelectedKey='home' items={sectionItems} />

      <Spacer y={8} />
      <div className='mt-auto flex flex-col'>
        <Button
          className='justify-start text-default-500 data-[hover=true]:text-foreground'
          startContent={
        theme === 'dark'
          ? (
            <Icon
              className='text-default-500'
              icon='solar:sun-line-duotone'
              width={24}
            />
            )
          : (
            <Icon
              className='text-default-500'
              icon='solar:moon-line-duotone'
              width={20}
            />
            )
      }
          variant='light'
          onClick={handleSwapTheme}
        >
          {theme === 'dark' ? 'Light Theme' : 'Dark Theme'}
        </Button>
        <Button
          fullWidth
          onClick={() => navigate(homeUrls.home)}
          color='success'
          className='justify-start text-default-500 data-[hover=true]:text-foreground'
          startContent={
            <Icon className='text-default-500' icon='solar:home-2-line-duotone' width={24} />
          }
          variant='light'
        >
          Go home
        </Button>
        <Button
          fullWidth
          color='danger'
          className='justify-start text-default-500 data-[hover=true]:text-foreground'
          startContent={
            <Icon
              className='rotate-180 text-default-500'
              icon='solar:minus-circle-line-duotone'
              width={24}
            />
          }
          variant='light'
        >
          Log Out
        </Button>
      </div>
    </div>
  )

  return (
    <div className='flex h-dvh w-full'>
      <SidebarDrawer
        className=' !border-r-small border-divider'
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        {content}
      </SidebarDrawer>
      <div className='w-full flex-1 flex-col p-4'>
        <header className='flex h-16 items-center gap-2 rounded-medium border-small border-divider px-4'>
          <Button isIconOnly className='flex sm:hidden' size='sm' variant='light' onPress={onOpen}>
            <Icon
              className='text-default-500'
              height={24}
              icon='solar:hamburger-menu-outline'
              width={24}
            />
          </Button>
          <h2 className='text-medium font-medium text-default-700'>{getPageTitle()}</h2>
        </header>
        <main className='mt-4 h-full w-full overflow-visible'>
          <div className='flex h-[90%] w-full flex-col gap-4 rounded-medium border-small border-divider'>
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
