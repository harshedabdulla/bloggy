import * as Yup from 'yup'

export const postInitialValues = {
  title: '',
  description: '',
}

export const postValidationSchema = Yup.object({
  title: Yup.string()
    .max(125, 'Title must be at most 125 characters')
    .required('Title is required'),
  description: Yup.string().required('Description is required'),
})
