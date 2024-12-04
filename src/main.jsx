import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import routes from "./router/Router.jsx"
import AuthProvider from './providers/AuthProvider.jsx'
import { ToastContainer } from 'react-toastify' 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ToastContainer></ToastContainer>
      <RouterProvider router={routes}></RouterProvider>
    </AuthProvider>
  </StrictMode>
)
