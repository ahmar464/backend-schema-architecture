import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppRouter } from './routes/AppRouter'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import './index.css'

const queryClient = new QueryClient()
// Add this before your app renders
window.__reactRouterFuture = {
  v7_startTransition: true,
  v7_relativeSplatPath: true
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppRouter />
    </QueryClientProvider>
  </React.StrictMode>
)



