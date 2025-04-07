import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import SubmitToolPage from './pages/SubmitToolPage';
import AIToolDetailPage from './pages/AIToolDetailPage';
import ToolGrid from './components/ToolGrid';
// import ToolDetail from './components/ToolDetail'; // No longer needed
import './App.css';

function App() {
  return (
    <Router>
      <AppProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/submit-tool" element={<SubmitToolPage />} />
          <Route path="/tool/:id" element={<AIToolDetailPage />} />
          <Route path="/tools/:id" element={<AIToolDetailPage />} /> {/* Now using AIToolDetailPage for both routes */}
        </Routes>
      </AppProvider>
    </Router>
  );
}

export default App;
