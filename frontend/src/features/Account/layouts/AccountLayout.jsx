import { LateralBar } from '../components/LateralBar'

export function AccountLayout ({ children }) {
  return (
    <>
      <h1>Account Layout</h1>
      <LateralBar />
      <div>
        {children}
      </div>
    </>
  )
}
