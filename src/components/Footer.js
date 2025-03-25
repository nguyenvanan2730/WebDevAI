import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-copyright">
            <p>Copyright © 2023 Creative Porthole</p>
            <div className="footer-links">
              <Link to="/privacy">Privacy Policy</Link>
              <span className="divider">•</span>
              <Link to="/terms">Terms of Service</Link>
            </div>
          </div>
          <div className="footer-credits">
            <p>Design by Van An Nguyen</p>
          </div>
        </div>
        <div className="submit-section">
          <Link to="/submit" className="submit-button">Submit</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 