import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TrendingTools.css';
import toolsData from './toolsData.json'; // Import the tools data

function TrendingTools() {
  const [topTrendingTool, setTopTrendingTool] = useState(null);

  // Find the tool with the highest likes
  useEffect(() => {
    if (toolsData && toolsData.length > 0) {
      // Sort tools by likes in descending order
      const sortedTools = [...toolsData].sort((a, b) => b.likes - a.likes);
      // Set the top trending tool
      setTopTrendingTool(sortedTools[0]);
    }
  }, []);

  // Add the getPriceTypeClass function
  const getPriceTypeClass = (type) => {
    switch (type.toLowerCase()) {
      case 'free':
        return 'trending-tool-type-free';
      case 'freemium':
        return 'trending-tool-type-freemium';
      case 'premium':
      case 'paid':
        return 'trending-tool-type-premium';
      default:
        return 'trending-tool-type-default';
    }
  };

  // Function to get the icon path based on tool name
  const getToolIconPath = (name) => {
    if (!name) return '';
    // Convert to lowercase and remove spaces/special chars
    const formattedName = name.toLowerCase().replace(/[^a-z0-9]/g, '');
    return `/icon/${formattedName}.png`;
  };

  // Loading state
  if (!topTrendingTool) {
    return (
      <section className="trending-tools">
        <div className="trending-tools-container">
          <div className="loading">Loading trending tool...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="trending-tools">
      <div className="trending-tools-container">
        <div className="top-trending-tool">
          <div className="trending-tool-main">
            <div className="trending-tool-logo-container">
              <div className="trending-tool-logo">
                <img 
                  src={getToolIconPath(topTrendingTool.name)} 
                  alt={`${topTrendingTool.name} icon`} 
                  className="trending-tool-icon"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
              <div className="trending-tool-badge">
                <span className="trending-crown">👑</span>
                <span className="trending-text">Top Trending</span>
              </div>
            </div>
            
            <div className="trending-tool-content">
              <div className="trending-tool-header">
                <h3 className="trending-tool-name">{topTrendingTool.name}</h3>
                <div className="trending-tool-meta">
                  <span className={`trending-tool-type ${getPriceTypeClass(topTrendingTool.type)}`}>
                    {topTrendingTool.type}
                  </span>
                </div>
              </div>
              
              <div className="trending-tool-rating">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`trending-star ${i < topTrendingTool.rating ? 'filled' : ''}`}>★</span>
                ))}
                <span className="trending-likes">
                  <span className="trending-heart">♥</span>
                  <span className="trending-likes-count">{topTrendingTool.likes}</span>
                </span>
              </div>
              
              <p className="trending-tool-description">{topTrendingTool.description}</p>
              
              <div className="trending-tool-actions">
                <a href={topTrendingTool.url} target="_blank" rel="noopener noreferrer" className="trending-tool-visit">
                  Visit Website
                </a>
                <Link to={`/tools/${topTrendingTool.id}`} className="trending-tool-details">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrendingTools; 