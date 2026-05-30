import { useState } from 'react'
import Login from './Login'; 
import Dashboard from './dashboard';
import Mekaniker from './mekaniker'
import { Route, Routes } from 'react-router-dom';


function App() {
  return (<Routes>
    <Route path="/" element={<Login />} />
    <Route path="/mekaniker" element={<Mekaniker />} />
  </Routes>)
}

export default App
