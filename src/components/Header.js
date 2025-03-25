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
              <div className="logo-placeholder"></div>
            </Link>
          </div>
          <nav className="navigation">
            <ul>
              <li><Link to="/" className="nav-item"></Link></li>
              <li><Link to="/about" className="nav-item"></Link></li>
              <li><Link to="/contact" className="nav-item login">Login</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header; 