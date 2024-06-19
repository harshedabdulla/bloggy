import React from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
const Query = () => {
  const POSTS = [
    { id: 1, title: 'First Post', content: 'This is the first post' },
    { id: 2, title: 'Second Post', content: 'This is the second post' },
  ]
  const wait = (time) => new Promise((resolve) => setTimeout(resolve, time))
  const postQuery = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      await wait(1000)
      return POSTS
    },
  })
  const newPostMutation = useMutation({
    mutationFn: async (newPost) => {
      await wait(1000)
      POSTS.push(newPost)
    },
  })
  if (postQuery.isLoading) {
    return <div>Loading...</div>
  }
  if (postQuery.isError) {
    return <div>Error: {postQuery.error.message}</div>
  }
  return (
    <div>
      <h1>Query Practise</h1>
      <ul>
        {postQuery.data.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
      <button
        onClick={() =>
          newPostMutation.mutate({
            id: POSTS.length + 1,
            title: `Post ${POSTS.length + 1}`,
            content: `This is post ${POSTS.length + 1}`,
          })
        }
      >
        Add Post
      </button>
    </div>
  )
}

export default Query
