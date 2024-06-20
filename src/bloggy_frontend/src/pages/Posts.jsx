import React from 'react'
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap'
import { useQuery } from '@tanstack/react-query'
import { bloggy_backend } from '../../../declarations/bloggy_backend'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { QUERY_KEYS } from '../constants/queryKeys'

const fetchPosts = async () => {
  const posts = bloggy_backend.viewPosts()
  return posts
}

const Posts = () => {
  const {
    data: posts,
    error,
    isLoading,
  } = useQuery({
    queryKey: [QUERY_KEYS.POSTS],
    queryFn: fetchPosts,
  })
  const { logOut } = useAuth()

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center my-4">
        <div>
          <h2 className="text-center">Posts</h2>
        </div>

        <Link to="/post/new" className="btn border-black me-2">
          + New Post
        </Link>
        <Button variant="outline-danger" onClick={logOut} className="px-2">
          Log Out
        </Button>
      </div>
      {isLoading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) : error ? (
        <div className="text-danger text-center mt-5">{error.message}</div>
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
