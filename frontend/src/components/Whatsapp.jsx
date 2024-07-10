import React from 'react'
import whatsappLogo from '../assets/whatsapp.png'

export function Whatsapp () {
  return (
    <footer className='fixed hover:cursor-pointer hover:scale-105 right-0 bottom-4 text-left bg-[#28d366] text-white font-semibold p-2 rounded-l-2xl select-none'>
      <div className='flex items-center'>
        <div className='mr-2'>
          <img src={whatsappLogo} alt='whatsapp' className='w-8 h-8' />
        </div>
        <h4 className='m-0 flex'>Chatea con nosotros</h4>
      </div>
    </footer>
  )
}
