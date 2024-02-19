import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { AuthProvider } from './components/auth/AuthProvider'
import Login from './components/auth/Login'
import ProtectedRoute from './components/auth/ProtectedRoute'
import './index.css'
import App from './App'
import endpoints from "./utils";
import React from 'react';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login endpointLogin={endpoints.login} endpointLogout={endpoints.logout} />
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "*",
        element: <App />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={ router } />
    </AuthProvider>
  </React.StrictMode>
)
