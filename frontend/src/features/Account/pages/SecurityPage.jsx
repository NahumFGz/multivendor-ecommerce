import { ChangePasswordForm } from '../components/Security/ChangePasswordForm'
import { CloseAllSessions } from '../components/Security/CloseAllSessions'

export function SecurityPage () {
  return (
    <div>
      <div className='mb-4'>
        <ChangePasswordForm />
      </div>
      <div>
        <CloseAllSessions />
      </div>
    </div>
  )
}
