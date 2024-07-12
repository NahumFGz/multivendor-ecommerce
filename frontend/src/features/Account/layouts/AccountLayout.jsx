import { LateralBar } from '../components/LateralBar/LateralBar'

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
