import React from 'react';
import { Link } from 'react-router-dom';
import './SubmitSection.css';

function SubmitSection() {
  return (
    <div className="submit-section">
      <div className="container">
        <div className="submit-section-content">
          <h2>Have an AI tool to share?</h2>
          <p>Help the community discover new AI tools for web development.</p>
          <Link to="/submit-tool" className="submit-button">Submit a Tool</Link>
        </div>
      </div>
    </div>
  );
}

export default SubmitSection; 