import React from 'react'
import { Container, Row, Col, Spinner, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import PostCard from '../components/PostCard'
import { useFetchPosts } from '../hooks/useFetchPosts'

const Posts = () => {
  const { data: posts, error, isLoading } = useFetchPosts()
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
          <Spinner animation="border" role="status"></Spinner>
        </div>
      ) : error ? (
        <div className="text-danger text-center mt-5">{error.message}</div>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {posts.map((post) => (
            <Col key={post.id}>
              <PostCard post={post} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  )
}

export default Posts
