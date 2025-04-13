import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {createBrowserRouter,Route,RouterProvider, createRoutesFromElements} from "react-router-dom"
import Home from './pages/Home.tsx'
import Layout from './layouts/layout.tsx' 
import Auth from './pages/Auth.tsx'
import Error from './pages/Error.tsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout/>} errorElement={<Error/>}>
      <Route index element={<Home />} />
      <Route path='/auth' element={<Auth/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>,
)
