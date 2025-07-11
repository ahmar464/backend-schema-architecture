// src/providers.jsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactRouterProvider } from './router' // We'll create this next

const queryClient = new QueryClient()

export function Providers({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactRouterProvider>
        {children}
      </ReactRouterProvider>
    </QueryClientProvider>
  )
}