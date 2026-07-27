import React, { Children } from 'react'
import MainLayout from './components/layout/MainLayout'
import { createBrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom'
import Home from './pages/Home'
import FetchOld from './pages/FetchOld'
import FetchRc from './pages/FetchRc'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/old',
        element: <FetchOld />
      },
      {
        path: '/rc',
        element: <FetchRc />
      }]
  }
])
const App = () => {
  const Client = new QueryClient()
  return (
    <QueryClientProvider client={Client}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App