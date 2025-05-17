import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { 
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import './index.css'
import App from './App.tsx'

// Create router
const router = createBrowserRouter(
  [{ path: "*", element: <App /> }],
  { basename: "/Car_Rental" } // Add this line - should match repository name
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
