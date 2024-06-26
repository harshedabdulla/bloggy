import React from 'react'
import { Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';


const PostCard = ({ post }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/post/${post.id}`);
  };
  return (
    <Card className="mb-3 shadow-sm" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>
          {post.description.split('\n').slice(0, 4).join('\n')}
        </Card.Text>
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
