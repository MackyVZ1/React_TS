import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './components/Home.tsx'

import Shop from './components/shop.tsx'
import Signin from './components/login_register/Signin.tsx'
import Register from './components/Register.tsx'
import Otp from './components/otp.tsx'

const router = createBrowserRouter([
  {
    path:"/Home",
    element:<Home/>
  },
  {
    path:"/Signin",
    element:<Signin/>
  },
  {
    path:"/shop",
    element:<Shop/>
  },
  {
    path:"/Register",
    element:<Register/>
  },
  {
    path:"/Otp",
    element:<Otp/>
  }
]
)
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
