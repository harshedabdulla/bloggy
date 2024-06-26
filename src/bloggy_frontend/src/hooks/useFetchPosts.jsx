import { useQuery } from '@tanstack/react-query'
import { bloggy_backend as bloggyBackend } from '../../../declarations/bloggy_backend'
import { QUERY_KEYS } from '../constants/queryKeys'

const fetchPosts = async () => {
  return bloggyBackend.viewPosts()
}

export const useFetchPosts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.POSTS],
    queryFn: fetchPosts,
  })
}
