import React, { Children } from 'react'
import MainLayout from './components/layout/MainLayout'
import { createBrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom'
import Home from './pages/Home'
import FetchOld from './pages/FetchOld'
import FetchRc from './pages/FetchRc'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Reactquery from './pages/Reactquery'
import Polling from './pages/Polling'
import MoreDetails from './components/ui/MoreDetails'
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
      },
      {
        path: '/rq',
        element: <Reactquery />
      },
      {
        path: '/polling',
        element: <Polling />
      },
      {
        path: '/rc/:id',
        element: <MoreDetails />
      }
    ]
  }
])
const App = () => {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App