import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from 'react-router'
import { Router } from '@remix-run/router'
import compose from 'compose-function'

const TWO_MINUTES = 2 * 60 * 1000

// cannot reexport it, nor use useQueryClient to get it to router
// so need to instantiate this in same file as RouterProvider
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: TWO_MINUTES,
    },
  },
})

const withRouter =
  (createRouter: (queryClient: QueryClient) => Router) => () => {
    return <RouterProvider router={createRouter(queryClient)} />
  }

const withQuery = (component: () => React.ReactNode) => () => {
  return (
    <QueryClientProvider client={queryClient}>
      {component()}
      <ReactQueryDevtools position="bottom-right" initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export const withQueryRouter = compose(withQuery, withRouter)
