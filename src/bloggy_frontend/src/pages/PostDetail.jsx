import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Spinner, Alert, Row, Col, Image } from 'react-bootstrap';
import { useFetchPostById } from '../hooks/useFetchPostById';
import '../styles/pagestyle.css'

const PostDetail = () => {
  const { id } = useParams();
  const postId = Number(id);

  const { data: post, error, isLoading, isFetching } = useFetchPostById(postId);

  if (isLoading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status"></Spinner>
      </div>
    );
  }

  if (error) {
    return <div className="text-danger text-center mt-5">{error.message}</div>;
  }

  return (
    <Container className="my-5">
      {isFetching && (
        <div className="text-center mb-4">
          <Spinner animation="border" role="status"></Spinner>
        </div>
      )}
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <h1 className="mb-4">{post.title}</h1>
          <p className="text-muted">By {post.author.toString()}</p>
          <p>{post.description}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default PostDetail;
