import React from 'react'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import NewPost from './pages/NewPost'
import Posts from './pages/Posts'
import UserLogin from './pages/UserLogin'
import ProtectedRoute from './components/ProtectedRoute'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<UserLogin />} />
        <Route
          path="/posts"
          element={
            <ProtectedRoute>
              <Posts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/post/new"
          element={
            <ProtectedRoute>
              <NewPost />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
