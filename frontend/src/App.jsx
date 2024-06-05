import { Navigation } from './routes/Navigation'
import { ToastContainer } from 'react-toastify'

function App () {
  return (
    <>
      <Navigation />
      <ToastContainer
        position='bottom-center'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        limit={1}
      />
    </>
  )
}

export default App
