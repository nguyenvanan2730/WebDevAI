import React from 'react';
import { Link } from 'react-router-dom';
import './TrendingTools.css';

function TrendingTools() {
  // The single most trending tool (with highest likes)
  const topTrendingTool = { 
    id: 1, 
    name: 'ChatGPT', 
    rating: 5, 
    type: 'Freemium', 
    role: 'Developer',
    process: 'Development',
    likes: 512,
    description: 'ChatGPT is an AI-powered assistant that helps with text generation, coding, answering questions, and content creation. It excels at understanding context and providing human-like responses across a wide range of topics and tasks.',
    url: 'https://chat.openai.com'
  };

  return (
    <section className="trending-tools">
      <div className="trending-tools-container">
        <div className="top-trending-tool">
          <div className="trending-tool-main">
            <div className="trending-tool-logo-container">
              <div className="trending-tool-logo"></div>
              <div className="trending-tool-badge">
                <span className="trending-crown">👑</span>
                <span className="trending-text">Top Trending</span>
              </div>
            </div>
            
            <div className="trending-tool-content">
              <div className="trending-tool-header">
                <h3 className="trending-tool-name">{topTrendingTool.name}</h3>
                <div className="trending-tool-meta">
                  <span className="trending-tool-type">{topTrendingTool.type}</span>
                  <span className="trending-tool-role">{topTrendingTool.role}</span>
                  <span className="trending-tool-process">{topTrendingTool.process}</span>
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
                <Link to={`/tool/${topTrendingTool.id}`} className="trending-tool-details">
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