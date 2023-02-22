import React from 'react'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'

import AppShell from '@ui/shell'
import Report from '@ui/report'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AppShell>
        <Outlet />
      </AppShell>
    ),
    errorElement: <div>Error Element on Root</div>,
    children: [
      {
        errorElement: <div>Catch all error elem</div>,
        children: [
          {
            index: true,
            element: <div>Root Outlet</div>,
          },
          {
            path: 'r/:id/:name',
            element: <Report />,
          },
        ],
      },
    ],
  },
])

const App = () => {
  return (
    <RouterProvider
      router={router}
      fallbackElement={
        <>
          <div>
            {"I'm here whilst the matching route loaders are initializing"}
          </div>
          <p>I probably should be a spinner or skeleton...</p>
        </>
      }
    />
  )
}

export default App
