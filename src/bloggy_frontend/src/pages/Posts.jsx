import React from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { useQuery } from '@tanstack/react-query'
import { bloggy_backend } from '../../../declarations/bloggy_backend'
import { Link } from 'react-router-dom'

const fetchPosts = async () => {
  const posts = await bloggy_backend.viewPosts()
  return posts
}

const Posts = () => {
  const {
    data: posts,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  })

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center my-4">
        <h2 className="text-center">Posts</h2>
        <Link to="/post/new" className="btn border-black">
          + New Post
        </Link>
      </div>
      {isLoading ? (
        <div className="text-center mt-5">Loading...</div>
      ) : error ? (
        <div className="text-danger text-center mt-5">
          {error.message || 'Failed to fetch posts.'}
        </div>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {posts.map((post, index) => (
            <Col key={index}>
              <Card>
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>{post.description}</Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <span role="img" aria-label="upvote">
                        👍
                      </span>
                      {post.upvotes}
                    </div>
                    {/* <div>
                      <span role="img" aria-label="downvote">
                        👎
                      </span>
                      {post.downvotes}
                    </div> */}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  )
}

export default Posts
