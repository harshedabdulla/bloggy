import React, { useEffect, useState } from 'react'
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Alert,
} from 'react-bootstrap'
import { useConnectWallet } from '../hooks/useConnectWallet'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/typewriter.css'

const UserLogin = () => {
  const mutation = useConnectWallet()
  const [isPlugInstalled, setIsPlugInstalled] = useState(false)

  useEffect(() => {
    const checkPlugInstalled = async () => {
      const isInstalled = await window.ic?.plug?.isConnected()
      setIsPlugInstalled(isInstalled)
    }

    checkPlugInstalled()
  }, [])

  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ height: '100vh', background: 'url(/path/to/your/background.jpg) no-repeat center center / cover' }}
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
                  Connect your Plug wallet to start creating and viewing posts.
                </Card.Text>
                {!isPlugInstalled ? (
                  <Alert variant="warning">
                    Plug wallet is not installed. Please install it from{' '}
                    <a href="https://plugwallet.ooo/" target="_blank" rel="noopener noreferrer">
                      here
                    </a>
                    .
                  </Alert>
                ) : (
                  <>
                    {mutation.isError && (
                      <Alert variant="danger">
                        {mutation.error.message || 'Failed to connect to the wallet. Please try again.'}
                      </Alert>
                    )}
                    {!mutation.isSuccess ? (
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
                    ) : (
                      <Button variant="success" disabled>
                        Connected
                      </Button>
                    )}
                  </>
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
