import { useState } from 'react'
import Login from './Login'; 
import Dashboard from './dashboard';
import Administrator from "./admin"
import Mekaniker from './mekaniker';
import Service from './service';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';


function App() {
  return (<Routes>
    <Route path="/" element={<Login />} />
    <Route path="/admin" element={
      <ProtectedRoute allowedrole={"Admin"}> <Administrator /> </ProtectedRoute>
    } />
    <Route path="/mekaniker" element={<Mekaniker />} />
    <Route path="/service" element={<Service />} />
  </Routes>)
}

export default App
