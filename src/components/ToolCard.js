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
  
  // Function to get icon based on tool name
  const getToolIconPath = (toolName) => {
    // Convert tool name to lowercase and remove spaces/special chars for filename matching
    const formattedName = toolName.toLowerCase().replace(/\s+/g, '');
    return `/icon/${formattedName}.png`;
  };
  
  // Function to get descriptive alt text for tool icon
  const getToolIconAlt = (name) => {
    return `${name} tool icon - AI-powered web development tool`;
  };

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
            <div className="tool-logo">
              <img 
                src={getToolIconPath(name)} 
                alt={getToolIconAlt(name)}
                className="tool-icon"
                onError={(e) => {
                  // If icon not found, show a placeholder or fallback to the background
                  e.target.style.display = 'none';
                }}
              />
            </div>
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
          <Link to={`/tools/${id}`} className="tool-link">View Details</Link>
          <a href={url} className="tool-link visit-website-link" target="_blank" rel="noopener noreferrer">Visit Website</a>
        </div>
      </div>
      
      {/* Card Footer */}
      <div className="card-footer">
        <div className="tool-tags">
          <div className="tags-container">
            {Array.isArray(role) ? (
              <>
                {role.slice(0, 3).map((r, index) => (
                  <span key={`role-${index}`} className="tag hashtag">
                    #{typeof r === 'string' ? r.toLowerCase() : r}
                  </span>
                ))}
                {role.length > 3 && <span className="tag hashtag">...</span>}
              </>
            ) : (
              <span className="tag hashtag">
                #{typeof role === 'string' ? role.toLowerCase() : role}
              </span>
            )}
            {Array.isArray(process) ? (
              <>
                {process.slice(0, 3).map((p, index) => (
                  <span key={`process-${index}`} className="tag hashtag">
                    #{typeof p === 'string' ? p.toLowerCase() : p}
                  </span>
                ))}
                {process.length > 3 && <span className="tag hashtag">...</span>}
              </>
            ) : (
              <span className="tag hashtag">
                #{typeof process === 'string' ? process.toLowerCase() : process}
              </span>
            )}
          </div>
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