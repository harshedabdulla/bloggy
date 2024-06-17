import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Artemis } from 'artemis-web3-adapter'
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Alert,
} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { bloggy_backend } from '../../../declarations/bloggy_backend'

const UserLogin = () => {
  const [artemisAdapter, setArtemisAdapter] = useState(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const connectWallet = async () => {
    setIsConnecting(true)
    setError(null)
    try {
      const artemisWalletAdapter = new Artemis()
      await artemisWalletAdapter.connect('plug')
      console.log('Artemis wallet connected:', artemisWalletAdapter)
      setArtemisAdapter(artemisWalletAdapter)
      setIsConnected(true)
      const principalId = artemisWalletAdapter.principalId
      console.log('Principal ID:', principalId)
      const sendID = await bloggy_backend.receivePrincipalId(principalId)
      console.log('sendID:', sendID)
      navigate('/posts')
    } catch (error) {
      console.error('Error connecting Artemis wallet:', error)
      setError('Failed to connect to the wallet. Please try again.')
    } finally {
      setIsConnecting(false)
    }
  }

  // useEffect(() => {
  //   const artemisWalletAdapter = new Artemis()
  //   setArtemisAdapter(artemisWalletAdapter)
  // }, [])

  // State to manage the animation of typing "bloggy"
  const [typedText, setTypedText] = useState('')

  useEffect(() => {
    const textToType = 'bloggy_'
    let index = 0
    const interval = setInterval(() => {
      if (index <= textToType.length) {
        setTypedText(textToType.slice(0, index))
        index++
      } else {
        clearInterval(interval)
      }
    }, 200) // Adjust speed of typing animation here (milliseconds)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ height: '100vh' }}
      >
        <Row>
          <Col>
            <div className="text-center mb-4">
              <h1 style={{ fontFamily: 'monospace', fontSize: '2rem' }}>
                {typedText}
              </h1>
            </div>
            <Card style={{ width: '24rem' }} className="text-center shadow-sm">
              <Card.Body>
                <Card.Title className="mb-4">Connect to your wallet</Card.Title>
                <Card.Text className="mb-4">
                  Connect your wallet to start creating and viewing posts.
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
