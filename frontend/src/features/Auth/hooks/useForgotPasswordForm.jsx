import * as Yup from 'yup'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import { useAuthAPI } from '../hooks/useAuthAPI'

export const useForgotPasswordForm = ({ onClose, getEmail }) => {
  const { resetPassword } = useAuthAPI()

  const formik = useFormik({
    initialValues: {
      email: '' || getEmail
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Correo inválido').required('Requerido')
    }),
    onSubmit: async (values) => {
      try {
        await resetPassword(values.email)
        toast.success('Correo de recuperacion enviado')
        onClose()
      } catch (error) {
        toast.error('Usuario no encontrado')
      }
    }
  })

  return { formik }
}
