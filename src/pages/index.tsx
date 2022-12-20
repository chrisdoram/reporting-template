import { QueryClient } from '@tanstack/react-query'
import { createBrowserRouter } from 'react-router-dom'

import AppLayout from '@pages/layout'
import ErrorPage from '@pages/error'

export const createRouter = (queryClient: QueryClient) => {
  return createBrowserRouter([
    {
      path: '/',
      element: <AppLayout />,
      errorElement: <ErrorPage />,
    },
  ])
}
