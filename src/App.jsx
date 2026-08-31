import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FiqhApp from './pages/FiqhApp';
import BalaghatPage from './pages/BalaghatPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Main Routes with /alim/... */}
        <Route path="/alim/fiqh-1st-paper" element={<FiqhApp />} />
        <Route path="/alim/balagat-and-mantiq" element={<BalaghatPage />} />
        
        {/* Direct alias routes */}
        <Route path="/fiqh-1st-paper" element={<FiqhApp />} />
        <Route path="/balagat-and-mantiq" element={<BalaghatPage />} />
      </Routes>
    </BrowserRouter>
  );
}
