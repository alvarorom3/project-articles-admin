import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Layout from './components/Layout'
import Overview, { allProjectsLoader } from './pages/Overview'
import Create from './pages/Create'
import Edit, { projectLoader } from './pages/Edit'

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Overview />,
        loader: allProjectsLoader(queryClient)
      },
      {
        path: '/create',
        element: <Create />
      },
      {
        path: '/edit/:projectId',
        element: <Edit />,
        loader: projectLoader(queryClient)
      }
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
