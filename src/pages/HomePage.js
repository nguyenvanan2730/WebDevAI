import React from 'react';
import Header from '../components/Header';
import Banner from '../components/Banner';
import TrendingTools from '../components/TrendingTools';
import ToolsFilter from '../components/ToolsFilter';
import ToolGrid from '../components/ToolGrid';
import Pagination from '../components/Pagination';
import PopularTools from '../components/PopularTools';
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
        <Pagination />
        <PopularTools />
      </div>
      <Footer />
    </div>
  );
}

export default HomePage; 