import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { bloggy_backend } from '../../../declarations/bloggy_backend'
import { Link } from 'react-router-dom'

const Posts = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await bloggy_backend.viewPosts()
        setPosts(fetchedPosts)
      } catch (err) {
        console.error('Error fetching posts:', err)
        setError('Failed to fetch posts.')
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return (
    <Container>
      <div className="flex">
        <h2 className="text-center my-4">Posts</h2>
        <Link to="/post/new" className="btn border-black mb-4 w-fit">
          +
        </Link>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-danger">{error}</div>
      ) : (
        <Row>
          {posts.map((post, index) => (
            <Col key={index} md={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>{post.description}</Card.Text>
                  <div>
                    <span>👍: {post.upvotes}</span>
                    <span className="ml-4">👎: {post.downvotes}</span>
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
