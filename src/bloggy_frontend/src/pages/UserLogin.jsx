import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Alert,
} from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { useMutation } from '@tanstack/react-query'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/typewriter.css'

const UserLogin = () => {
  const { artemisAdapter, connectWallet } = useAuth()
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: connectWallet,
    onSuccess: () => {
      navigate('/posts')
    },
    onError: (error) => {
      console.error('Error connecting wallet:', error)
    },
  })

  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ height: '100vh' }}
      >
        <Row>
          <Col>
            <div className="text-center mb-4 typed-out">
              <h1>bloggy_</h1>
            </div>
            <Card style={{ width: '24rem' }} className="text-center shadow-sm">
              <Card.Body>
                <Card.Title className="mb-4">Connect to your wallet</Card.Title>
                <Card.Text className="mb-4">
                  Connect your plug wallet to start creating and viewing posts.
                </Card.Text>
                {mutation.isError && (
                  <Alert variant="danger">{mutation.error.message}</Alert>
                )}
                {!mutation.isSuccess && (
                  <Button
                    variant="primary"
                    onClick={() => mutation.mutate()}
                    disabled={mutation.isLoading}
                  >
                    {mutation.isLoading ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      'Connect'
                    )}
                  </Button>
                )}
                {mutation.isSuccess && (
                  <Button variant="success" disabled>
                    Connected
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default UserLogin
