import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export const useConnectWallet = () => {
  const { connectWallet } = useAuth()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: connectWallet,
    onSuccess: () => {
      navigate('/posts')
    },
    onError: (error) => {
      console.error('Error connecting wallet:', error)
    },
  })
}
