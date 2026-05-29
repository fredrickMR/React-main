import { useState } from 'react'
import Login from './Login'; 
import Dashboard from './dashboard';
import { Route, Routes } from 'react-router-dom';


function App() {
  return (<Routes>
    <Route path="/" element={<Login />} />
    <Route path="/dashboard" element={<Dashboard />} />
  </Routes>)
}

export default App
