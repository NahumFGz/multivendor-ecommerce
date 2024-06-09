import { Footer } from '../../../components/Footer'
import { Header } from '../../../components/Header'

export function AuthLayout ({ children }) {
  return (
    <div className='flex flex-col'>
      <div>
        <Header />
      </div>
      <div className='mt-10 h-[700px]'>
        {children}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}
