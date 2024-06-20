import React, { createContext, useState, useContext } from 'react'
import { Artemis } from 'artemis-web3-adapter'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [artemisAdapter, setArtemisAdapter] = useState(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState(null)

  const connectWallet = async () => {
    setIsConnecting(true)
    setError(null)
    try {
      const artemisWalletAdapter = new Artemis()
      await artemisWalletAdapter.connect('plug')
      console.log('Artemis wallet connected:', artemisWalletAdapter)
      setArtemisAdapter(artemisWalletAdapter)
      setIsConnected(true)
    } catch (error) {
      console.error('Error connecting Artemis wallet:', error)
      setError('Failed to connect to the wallet. Please try again.')
    } finally {
      setIsConnecting(false)
    }
  }

  // log out function
  const logOut = () => {
    setArtemisAdapter(null)
    setIsConnected(false)
    localStorage.removeItem('artemisWallet')
  }

  return (
    <AuthContext.Provider
      value={{
        artemisAdapter,
        isConnected,
        isConnecting,
        error,
        logOut,
        connectWallet,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

export default AuthContext
