import { createBrowserRouter, Navigate, Outlet } from "react-router-dom"
import App from "../App"
import Home from "../pages/Home/Home"
import Login from "../pages/Login/Login"
import Profile from "../pages/Profile/Profile"

import { useAppSelector } from "../store/hooks"
import { selectUser } from "../features/authSlice"

const ProtectedRoute = () => {
  const user = useAppSelector(selectUser)
  return user ? <Outlet /> : <Navigate to="/login" replace />
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      }, {
        path: "/login",
        element: <Login />
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/profile",
            element: <Profile />
          }
        ]
      }
    ]
  }
])