import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Banner from '../components/Banner';
import TrendingTools from '../components/TrendingTools';
import ToolGrid from '../components/ToolGrid';
import PopularTools from '../components/PopularTools';
import SubmitSection from '../components/SubmitSection';
import PageTitle from '../components/PageTitle';

function HomePage() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="home-page">
      <PageTitle 
        title="Home" 
        description="Discover the best AI tools for web development. Browse, compare, and find the perfect tools to enhance your workflow."
      />
      <Header />
      <Banner 
        title="Discover AI Tools for Web Development"
        subtitle="Find the perfect tools to enhance your workflow and boost productivity"
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