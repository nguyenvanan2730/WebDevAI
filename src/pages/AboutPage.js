import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function AboutPage() {
  return (
    <div className="about-page">
      <Header />
      <div className="container">
        <div className="about-content">
          <h1>About WebDevAI Tools</h1>
          <p>WebDevAI Tools is a platform dedicated to helping web developers discover and utilize the best AI-powered tools to enhance their development workflow.</p>
          
          <h2>Our Mission</h2>
          <p>Our mission is to curate and present the most useful AI tools for web development, helping developers save time and improve their productivity.</p>
          
          <h2>What We Offer</h2>
          <ul>
            <li>Curated collection of AI tools for web development</li>
            <li>Detailed reviews and ratings from real developers</li>
            <li>Filtering tools by various criteria to find exactly what you need</li>
            <li>Community insights on the latest AI technologies for web development</li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AboutPage; 