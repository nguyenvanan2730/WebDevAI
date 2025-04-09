import React from 'react';
import { FaFacebookF, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4 className="footer-title">WebDevAI</h4>
            <p className="footer-description">
              Discover the best AI tools for web development to enhance your workflow and productivity.
            </p>
          </div>
          
          <div className="footer-section footer-social">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaInstagram />
            </a>
          </div>
          
          <div className="footer-section footer-contact">
            <h4 className="footer-title">Contact Us</h4>
            <div className="contact-info">
              <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <span>info@webdevai.com</span>
              </div>
              <div className="contact-item">
                <FaPhone className="contact-icon" />
                <span>+44 (0) 20 7123 4567</span>
              </div>
              <div className="contact-item">
                <FaMapMarkerAlt className="contact-icon" />
                <span>London, United Kingdom</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">
            &copy; {new Date().getFullYear()} WebDevAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 