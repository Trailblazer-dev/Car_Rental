import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { 
  BrowserRouter as Router,
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import './index.css'
import App from './App.tsx'

// Option 1: Using BrowserRouter with future flags
const router = createBrowserRouter(
  [{ path: "*", element: <App /> }],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }
  }
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
