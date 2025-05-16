import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { 
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import './index.css'
import App from './App'

// Create router
const router = createBrowserRouter(
  [{ path: "*", element: <App /> }]
);

// Get root element and ensure it exists
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
