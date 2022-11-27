import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  return (
    <Routes>
      <Route path='/home' element={<Home />} />
      <Route path='/' element={<Login />} />
      <Route path='*' element={<p>Error 404</p>} />
    </Routes>
  );
}

export default App;
