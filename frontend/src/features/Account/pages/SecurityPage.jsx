import { useState } from 'react'
import { ChangePasswordForm } from '../components/Security/ChangePasswordForm'
import { CloseAllSessions } from '../components/Security/CloseAllSessions'
import { ModalBase } from '../../../components/ModalBase'
import { CloseAllSessionAlertContent } from '../components/Security/CloseAllSessionAlertContent'

export function SecurityPage () {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <div>
      <div className='mb-4'>
        <ChangePasswordForm />
      </div>
      <div>
        <CloseAllSessions openModal={openModal} />
      </div>
      <ModalBase isOpen={isModalOpen} onClose={closeModal}>
        <CloseAllSessionAlertContent closeModal={closeModal} />
      </ModalBase>
    </div>
  )
}
