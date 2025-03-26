import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import SubmitToolPage from './pages/SubmitToolPage';
import AIToolDetailPage from './pages/AIToolDetailPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/submit-tool" element={<SubmitToolPage />} />
        <Route path="/tool/:id" element={<AIToolDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
