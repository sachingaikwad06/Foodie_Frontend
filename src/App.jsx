import React from 'react'

import { AuthProvider } from './auth/AuthContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Restaurants from './pages/Restaurants'
import Orders from './pages/Orders'
import ProtectedRoutes from './components/ProtectedRoutes'
import AdminOrders from './pages/AdminOrders'
import Menu from './pages/Menu'

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/restaurants" element={<Restaurants/>}/>
            <Route path='/menu/:restaurantId' element={<ProtectedRoutes><Menu /></ProtectedRoutes>} />
            <Route path="/orders" element={<Orders/>}/>
            <Route path="/admin/orders" element={<ProtectedRoutes role="ADMIN"><AdminOrders/></ProtectedRoutes>}/>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App