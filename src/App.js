import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AIToolDetailPage from './pages/AIToolDetailPage';
import SubmitAIToolPage from './pages/SubmitAIToolPage';
import ContactPage from './pages/ContactPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tool/:id" element={<AIToolDetailPage />} />
        <Route path="/submit" element={<SubmitAIToolPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  );
}

export default App;
