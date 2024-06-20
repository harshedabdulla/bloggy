import { useMutation, useQueryClient } from '@tanstack/react-query'
import { bloggy_backend } from '../../../declarations/bloggy_backend'
import { Principal } from '@dfinity/principal'
import { useToast } from './useToast'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const addPost = async (values, artemisAdapter) => {
  const { title, description } = values
  if (!artemisAdapter) {
    throw new Error('Artemis wallet is not connected')
  }
  const principalId = artemisAdapter.principalId
  const principal = Principal.fromText(principalId)
  const result = await bloggy_backend.createPost(title, description, principal)
  return result
}

export const useCreatePost = () => {
  const { showToast } = useToast()
  const navigate = useNavigate()
  const { artemisAdapter } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (values) => addPost(values, artemisAdapter),
    onSuccess: (result) => {
      if (result.hasOwnProperty('ok')) {
        showToast('Post added successfully!', 'success')
        queryClient.invalidateQueries('posts')
        navigate('/posts', { replace: true })
      } else if (result.hasOwnProperty('err')) {
        throw new Error(result.err)
      }
    },
    onError: (error) => {
      showToast(
        error.message || 'An error occurred while creating the post.',
        'error'
      )
    },
  })
}
