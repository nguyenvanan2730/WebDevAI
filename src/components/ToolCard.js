import React from 'react';
// import { Link } from 'react-router-dom';
import './ToolCard.css';

function ToolCard({ id, name, rating, type, likes = 12 }) {
  return (
    <div className="tool-card">
      <div className="tool-header">
        <div className="tool-logo-container">
          <div className="tool-logo"></div>
        </div>
        <div className="tool-info">
          <h3 className="tool-name">{name}</h3>
          <div className="tool-rating">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`star ${i < rating ? 'filled' : ''}`}>★</span>
            ))}
            <span className="tool-rating-count">({rating}.0)</span>
          </div>
        </div>
      </div>
      
      <div className="tool-type">
        <span className="type-badge">{type}</span>
      </div>
      
      <div className="tool-preview">
        {/* Preview area */}
      </div>
      
      <div className="tool-footer">
        <div className="tool-tags">
          <span className="tag">AI</span>
          <span className="tag">Dev</span>
          <span className="tag">Prod</span>
        </div>
        <div className="tool-likes">
          <button className="like-button">
            <span className="like-count">{likes}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ToolCard; 