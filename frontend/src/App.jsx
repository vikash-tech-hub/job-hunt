import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/shared/Navbar'
import Login from './components/auth/Login.jsx'
import Signup from './components/auth/Signup.jsx'
import Home from './components/home.jsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const approuter = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
])

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RouterProvider router={approuter} />
    </>
  )
}

export default App
