import React from 'react';
import Header from '../components/Header';
import Banner from '../components/Banner';
import TrendingTools from '../components/TrendingTools';
import ToolsFilter from '../components/ToolsFilter';
import ToolGrid from '../components/ToolGrid';
import PopularTools from '../components/PopularTools';
import SubmitSection from '../components/SubmitSection';
import Footer from '../components/Footer';

function HomePage() {
  return (
    <div className="homepage">
      <Header />
      <Banner 
        title="WEB DEVELOPMENT AI TOOLS" 
        subtitle="All best AI tools using for web development"
      />
      <div className="container">
        <TrendingTools />
        <ToolsFilter />
        <ToolGrid />
        <PopularTools />
      </div>
      <SubmitSection />
      <Footer />
    </div>
  );
}

export default HomePage; 