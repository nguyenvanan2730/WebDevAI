import React from 'react';
import { Link } from 'react-router-dom';
import './ToolCard.css';

function ToolCard({ tool }) {
  const { 
    id, 
    name, 
    rating, 
    type, 
    role, 
    process, 
    likes = 12, 
    description, 
    url 
  } = tool;
  
  const getPriceTypeClass = (type) => {
    switch (type.toLowerCase()) {
      case 'free':
        return 'tool-type-free';
      case 'freemium':
        return 'tool-type-freemium';
      case 'premium':
      case 'paid':
        return 'tool-type-premium';
      default:
        return 'tool-type-default';
    }
  };

  return (
    <div className="tool-card">
      {/* Card Header */}
      <div className="card-header">
        <div className="tool-header">
          <div className="tool-logo-container">
            <div className="tool-logo"></div>
          </div>
          <div className="tool-info">
            <h3 className="tool-name-home-page">{name}</h3>
            <div className="tool-rating">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`star ${i < rating ? 'filled' : ''}`}>★</span>
              ))}
              <span className="tool-rating-count">({rating}.0)</span>
            </div>
          </div>
          <span className={`tool-type ${getPriceTypeClass(type)}`}>
            {type}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="card-content">
        <p className="tool-description">{description}</p>
        <div className="tool-actions">
          <Link to={`/tool/${id}`} className="tool-link">View Details</Link>
          <a href={url} className="tool-link visit-website-link" target="_blank" rel="noopener noreferrer">Visit Website</a>
        </div>
      </div>
      
      {/* Card Footer */}
      <div className="card-footer">
        <div className="tool-tags">
          <span className="tag hashtag">#{role.toLowerCase()}</span>
          <span className="tag hashtag">#{process.toLowerCase()}</span>
        </div>
        <div className="tool-likes">
          <button className="like-button">
            <span className="heart-icon">♥</span>
            <span className="like-count">{likes}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ToolCard; 