import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ProtectedRoute = ({ children }) => {
  const { isConnected } = useAuth()

  if (!isConnected) {
    return <Navigate to="/login" />
  }

  return children
}

export default ProtectedRoute
