import * as Yup from 'yup'

export const postInitialValues = {
  title: '',
  description: '',
}

export const postValidationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
})
