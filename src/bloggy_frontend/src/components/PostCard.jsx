import React from 'react'
import { Card } from 'react-bootstrap'

const PostCard = ({ post }) => {
  return (
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
  )
}

export default PostCard
