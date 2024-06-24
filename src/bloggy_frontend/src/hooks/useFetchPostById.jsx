import { bloggy_backend as bloggyBackend } from '../../../declarations/bloggy_backend';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../constants/queryKeys';

const fetchPostById = async (id) => {
  const result = await bloggyBackend.viewPost(id);
  if (result.ok) {
    return result.ok;
  } else {
    throw new Error(result.err);
  }
};

export const useFetchPostById = (id) => {
  return useQuery({
    queryKey: [QUERY_KEYS.POST, id],
    queryFn: () => fetchPostById(id),
  });
};

