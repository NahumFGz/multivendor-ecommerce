import { useEffect } from 'react'

export function ModalBase ({ isOpen, onClose, children }) {
  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClose()
    }
  }

  useEffect(() => {
    // Agregar el manejador de evento cuando el modal está abierto
    if (isOpen) { document.addEventListener('keydown', handleKeyDown) }

    // Eliminar el manejador de evento cuando el modal se cierra
    return () => { document.removeEventListener('keydown', handleKeyDown) }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    // Contenedor principal que cubre toda la pantalla y permite el desplazamiento vertical
    <div className='fixed inset-0 z-10 overflow-y-auto' onClick={onClose}>
      {/* Fondo oscuro semi-transparente */}
      <div className='fixed inset-0 bg-gray-500 opacity-75 transition-opacity' aria-hidden='true' />

      {/* Contenedor flex para centrar el modal vertical y horizontalmente */}
      <div className='flex items-center justify-center min-h-screen px-4 text-center' onClick={(e) => e.stopPropagation()}>
        {/* Contenedor del modal */}
        <div className='bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full sm:p-6'>
          {/* Botón de cierre */}
          <button onClick={onClose} className='absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700'>
            &times;
          </button>
          {/* Contenido del modal */}
          {children}
        </div>
      </div>
    </div>
  )
}
