import React, { useEffect } from 'react';
import Header from '../components/Header';
import Banner from '../components/Banner';
import TrendingTools from '../components/TrendingTools';
import ToolGrid from '../components/ToolGrid';
import PopularTools from '../components/PopularTools';
import SubmitSection from '../components/SubmitSection';
import Footer from '../components/Footer';

function HomePage() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="homepage">
      <Header />
      <Banner 
        title="WEB DEVELOPMENT AI TOOLS" 
        subtitle="All best AI tools using for web development"
      />
      
      <div className="trending-tools-section">
        <div className="container">
          <TrendingTools />
        </div>
      </div>
      
      <div className="tool-grid-section">
        <div className="container">
          <ToolGrid />
        </div>
      </div>
      
      <div className="popular-tools-section">
        <div className="container">
          <PopularTools />
        </div>
      </div>
      
      <SubmitSection />
      <Footer />
    </div>
  );
}

export default HomePage; 