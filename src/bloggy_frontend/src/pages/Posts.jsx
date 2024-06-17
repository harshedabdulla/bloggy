import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
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
      <div className="d-flex justify-content-between align-items-center my-4">
        <h2 className="text-center">Posts</h2>
        <Link to="/post/new" className="btn border-black">
          + New Post
        </Link>
      </div>
      {loading ? (
        <div className="text-center mt-5">Loading...</div>
      ) : error ? (
        <div className="text-danger text-center mt-5">{error}</div>
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
