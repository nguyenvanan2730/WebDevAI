import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Link to="/">
              <div className="text-logo">WebDevAI</div>
            </Link>
          </div>
          <nav className="navigation">
            <ul>
              <li><Link to="/about" className="nav-link">About</Link></li>
              <li><Link to="/contact" className="nav-link">Contact</Link></li>
              <li><Link to="/submit" className="submit-button">Submit Tool</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header; 