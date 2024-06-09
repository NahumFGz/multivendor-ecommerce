export function AuthLayout ({ children }) {
  return (
    <div className='flex flex-col'>
      <div className='mt-10 h-[700px]'>
        {children}
      </div>
    </div>
  )
}
