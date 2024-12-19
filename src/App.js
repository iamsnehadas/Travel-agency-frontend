import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/index.js';
import PackageDetail from './pages/packages/[id].js';

function App() {
  return (
    <Router>
      <div style={{ fontFamily: 'Arial, sans-serif' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/packages/:id" element={<PackageDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
