import { LateralBar } from '../components/LateralBar'

export function AccountLayout ({ children }) {
  return (
    <>
      <LateralBar>
        <div className='m-4'>
          {children}
        </div>
      </LateralBar>
    </>
  )
}
