# 3. Using Compose To Set Up Application Providers

Date: 2022-12-22

## Status

Accepted

## Context

1. Many providers wrap the application, and since `react-router` is used to render the route components, the entry point for the application code becomes messy. For example, in this application the entry point is as follows:   

* `redux` provider, allowing a store to be injected
* `react-query` provider, allowing a query client to be injected
* Custom providers, the amount of which may grow over the course of the applications development
* `react-router` provider, allowing a router to be injected which defines all of the routes of the application

2. Additional complexity is introduced since were using the query client in the loader functions defined on the routes. Since it is not advised for the client to be exported/imported directly, and the `useQueryClient` hook cannot be used inside of the `createBrowserRouter` function, we need a way to expose the query client to the `createBrowserRouter` function so it can be used directly in its invocation. To do this the query client (and therefore the `QueryProvider` element) and the `RouterProvider` passing in the `createBrowserRouter` function must be instantiated in the same location.

## Decision

Using `compose-function` to compose the providers, instead of deeply nesting the router code.

```tsx
// src/app/providers/with-store.tsx

export const withStore = (component: () => React.ReactNode) =>
  function getProvider() {
    return <Provider store={store}>{component()}</Provider>
  }
```

```tsx
// src/app/providers/with-context.tsx

export const withContext = (component: () => React.ReactNode) =>
  function getCustomProvider() {
    return <CustomProvider>{component()}</CustomProvider>
  }
```

This withContext function takes in exactly what it returns; a function that returns a `ReactNode` (a React component!). This is the crux of the `withProvider` setup. If the providers are defined in this way, we can use the `compose` function to chain them together, as opposed to deeply nesting them.

```tsx
// src/app/providers/index.tsx

export const withProviders = compose(withStore, withContext)
```

Now `withProviders` can wrap any React component to wrap it with all of the providers defined.

```ts
// src/app/index.ts

export default withProviders(createRouter)
```

This is now our `<App />` component! Its a router, wrapped with all of our providers. Now in our entrypoint `main.tsx` we have:  

```tsx
// src/main.tsx

import App from '@app'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

```

Now we need to address problem 2.

Ideally, the `createBrowserRouter` function, which is used to create the router, would live in the index of the pages dir, since this naturally follows the setup of the application structure; the router defines the pages (routes) of the application.   

The withProviders functions would naturally live in the app dir since they wrap the application.

This introduces a problem. How can we pass the query client to the `createBrowserRouter` whilst conforming to the structure and not exporting/importing it directly?

```tsx
// src/pages/index.tsx

// pass query client as an argument here
export const createRouter = (queryClient: QueryClient) => {
  return createBrowserRouter([
    // ...
  ])
}
```

```tsx
// src/app/providers/with-query-router.tsx

// instantiate in this file
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: TWO_MINUTES,
    },
  },
})

// this provider takes a function which accepts a query client and returns a Router (as above)
const withRouter = (createRouter: (queryClient: QueryClient) => Router) =>
  function getRouterProvider() {
    // call this function with the queryClient instantiated in this scope
    // createBrowserRouter now has our queryClient!
    return <RouterProvider router={createRouter(queryClient)} />
  }

// withQuery needs to be instantiated here also as it needs the query client for its own provider
const withQuery = (component: () => React.ReactNode) =>
  function getQueryClientProvider() {
    return (
      <QueryClientProvider client={queryClient}>
        {component()}
        <ReactQueryDevtools position="bottom-right" initialIsOpen={false} />
      </QueryClientProvider>
    )
  }

export const withQueryRouter = compose(withQuery, withRouter)
```

## Consequences

The application setup becomes easy to read, and to extend. If we have an additional provider to add, simply write it as a `withProvider` and add it to the compose function.

The withQueryRouter is a very specific use case, it couples the router and the query client completely. It also makes the `withProviders` code more brittle, since this has to come as the last argument to the compose function. This is because the withProviders is called with the createRouter function to bring it all together; it is only `withQueryRouter` that is expecting this as it's argument. 

Dependency injection also becomes more challenging, since the implementation of the router in the provider always expects a queryClient (whose type is also ensured by ts). This might make testing more challenging in the future.  