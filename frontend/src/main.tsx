import { StrictMode } from 'react'
// Import directly from react-dom-fix
import { createRoot } from './react-dom-fix'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import './index.css'
import App from './App'

// Define the router with future flags
const router = createBrowserRouter(
  [{ path: "*", element: <App /> }],
  {
    future: {
      v7_relativeSplatPath: true
    }
  }
);

// Get the root element where the app will be mounted
const rootElement = document.getElementById('root');

// Ensure the element exists
if (!rootElement) {
  throw new Error("Root element not found. Make sure there is an element with id 'root'");
}

// Create a root and render the app
createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
