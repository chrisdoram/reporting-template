import React from 'react'
import { QueryClient } from '@tanstack/react-query'
import { createBrowserRouter } from 'react-router-dom'

import AppLayout from '@pages/layout'
import ErrorPage from '@pages/error'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createRouter = (queryClient: QueryClient) => {
  return createBrowserRouter([
    {
      path: '/',
      element: <AppLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          errorElement: <div>Catch all error elem</div>,
          children: [
            {
              index: true,
              element: <div>Root Outlet</div>,
            },
          ],
        },
      ],
    },
  ])
}
