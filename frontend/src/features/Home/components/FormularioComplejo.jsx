import { useRef, forwardRef } from 'react'

// Definimos un componente funcional que acepta una ref con forwardRef
const MiInput = forwardRef((props, ref) => (
  <input ref={ref} type='text' placeholder='Escribe algo...' />
))

export const FormularioComplejo = () => {
  const nombreRef = useRef(null)
  const emailRef = useRef(null)

  const enfocarNombre = () => {
    if (nombreRef.current) {
      nombreRef.current.focus()
    }
  }

  const enfocarEmail = () => {
    if (emailRef.current) {
      emailRef.current.focus()
    }
  }

  return (
    <div>
      <h1>Formulario Complejo</h1>
      <MiInput ref={nombreRef} placeholder='Nombre' />
      <MiInput ref={emailRef} placeholder='Email' />
      <button onClick={enfocarNombre}>Enfocar Nombre</button>
      <button onClick={enfocarEmail}>Enfocar Email</button>
    </div>
  )
}
