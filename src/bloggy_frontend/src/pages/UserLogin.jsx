import React, { useState, useEffect } from 'react'
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
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/typewriter.css'
const UserLogin = () => {
  const { artemisAdapter, isConnected, isConnecting, error, connectWallet } =
    useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isConnected) {
      navigate('/posts')
    }
  }, [isConnected, navigate])

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
                {error && <Alert variant="danger">{error}</Alert>}
                {!isConnected ? (
                  <Button
                    variant="primary"
                    onClick={connectWallet}
                    disabled={isConnecting}
                  >
                    {isConnecting ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      'Connect'
                    )}
                  </Button>
                ) : (
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
