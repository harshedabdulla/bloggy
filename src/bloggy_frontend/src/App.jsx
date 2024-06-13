import React from 'react'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import NewPost from './pages/NewPost'
import Posts from './pages/Posts'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/posts" />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/post/new" element={<NewPost />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
