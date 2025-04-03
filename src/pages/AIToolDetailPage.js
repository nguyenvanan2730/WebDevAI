import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaStar, FaMobile, FaExternalLinkAlt, FaPlay } from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ToolCard from '../components/ToolCard';
import './AIToolDetailPage.css';
import toolsData from '../components/toolsData.json'; // Import the tools data

function AIToolDetailPage() {
  // Get tool ID from URL params and setup state
  const { id } = useParams();
  const [tool, setTool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [relatedTools, setRelatedTools] = useState([]);

  // Get tool icon path from name
  const getToolIconPath = (name) => {
    if (!name) return '';
    // Convert to lowercase and remove spaces/special chars
    const formattedName = name.toLowerCase().replace(/[^a-z0-9]/g, '');
    return `/icon/${formattedName}.png`;
  };

  // Load tool data when component mounts or ID changes
  useEffect(() => {
    // Find the tool with the matching ID
    const toolId = parseInt(id);
    const foundTool = toolsData.find(tool => tool.id === toolId);
    
    if (foundTool) {
      setTool(foundTool);
      // Set reviews from the found tool
      setReviews(foundTool.reviews || []);
      
      // Find related tools (tools with the same role or process)
      const related = toolsData
        .filter(t => 
          t.id !== toolId && 
          (t.role === foundTool.role || t.process === foundTool.process)
        )
        .slice(0, 8); // Limit to 8 related tools
      
      setRelatedTools(related);
    }
    
    setLoading(false);
  }, [id]);

  // Display star rating
  const renderStars = (rating) => {
    return (
      <div className="stars">
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className={`star ${index < rating ? 'filled' : 'empty'}`}
          />
        ))}
      </div>
    );
  };

  // Smooth scroll to reviews section
  const scrollToReviews = () => {
    document.querySelector('#reviews-section').scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  // Show loading spinner while data is being fetched
  if (loading) {
    return (
      <div className="ai-tool-detail-page">
        <Header />
        <div className="container loading-container">
          <div className="loading-spinner"></div>
          <p>Loading tool details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  // Show error message if tool is not found
  if (!tool) {
    return (
      <div className="ai-tool-detail-page">
        <Header />
        <div className="container">
          <h2>Tool not found</h2>
          <p>The AI tool you're looking for doesn't exist or has been removed.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="ai-tool-detail-page">
      <Header />
      <div className="container">
        {/* Main tool detail wrapper */}
        <div className="tool-detail-wrapper">
          {/* Tool header with logo and basic info */}
          <div className="tool-detail-header">
            <div className="tool-header-left">
              <div className="tool-logo">
                <img 
                  src={getToolIconPath(tool.name)} 
                  alt={`${tool.name} icon`}
                  className="tool-logo-image"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
              <div className="tool-header-info">
                <h1 className="tool-name">{tool.name}</h1>
                <div className="tool-meta">
                  {/* <div className="tags">
                    {tool.tags && tool.tags.map((tag, index) => (
                      <span key={index} className="tag">#{tag}</span>
                    ))}
                  </div> */}
                  <span className="meta-badge price">{tool.type}</span>
                </div>
                <div className="tool-rating-container">
                  <div className="rating-stars">
                    {renderStars(tool.rating)}
                  </div>
                  <span 
                    className="rating-count"
                    onClick={scrollToReviews}
                    style={{ cursor: 'pointer' }}
                    title="Click to see reviews"
                  >
                    ({tool.reviews ? tool.reviews.length : 0} reviews)
                  </span>
                  <div className="likes-count">
                    <span className="heart-icon">♥</span>
                    <span className="likes-number">{tool.likes || 0}</span>
                  </div>
                </div>
                <div className="tool-description">
                  {tool.description}
                </div>
                <a href={tool.url} target="_blank" rel="noopener noreferrer" className="visit-site-btn">
                  Visit Site <FaExternalLinkAlt />
                </a>
              </div>
            </div>
            <div className="tool-header-right">
              <div className="video-container">
                <iframe
                  src={`https://www.youtube.com/embed/${tool.youtubeVideoId}`}
                  title={`${tool.name} tutorial video`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="youtube-iframe"
                />
              </div>
            </div>
          </div>

          {/* Main content layout */}
          <div className="tool-detail-content-layout">
            {/* Left column - Tool information */}
            <div className="tool-detail-left-column">
              {/* Summary Section */}
              <section className="detail-section">
                <h2 className="section-title">Summary:</h2>
                <div className="section-content">
                  <p>{tool.summary}</p>
                </div>
              </section>

              {/* Key Features Section */}
              <section className="detail-section">
                <h2 className="section-title">Key features:</h2>
                <div className="section-content">
                  <ul className="features-list">
                    {tool.keyFeatures && tool.keyFeatures.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </section>
            </div>

            {/* Right column - Related tools */}
            <div className="tool-detail-right-column">
              {/* Related Tools Section */}
              <section className="detail-section">
                <h2 className="section-title">Related tools</h2>
                <div className="related-tools-container">
                  {relatedTools.map(relatedTool => (
                    <div key={relatedTool.id} className="simplified-tool-card">
                      <div className="tool-header">
                        <div className="tool-logo-container">
                          <div className="tool-logo">
                            <img 
                              src={getToolIconPath(relatedTool.name)} 
                              alt={`${relatedTool.name} icon`}
                              className="tool-logo-image"
                              onError={(e) => { e.target.style.display = 'none'; }}
                            />
                          </div>
                        </div>
                        <div className="tool-info">
                          <h3 className="tool-name">{relatedTool.name}</h3>
                          <div className="tool-rating">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={`star ${i < relatedTool.rating ? 'filled' : ''}`}>★</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="tool-meta">
                        <span className="meta-badge price">{relatedTool.type}</span>
                        <span className="tag hashtag">#{relatedTool.role.toLowerCase()}</span>
                      </div>
                      
                      <div className="tool-preview">
                        <p className="tool-description">{relatedTool.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>

          {/* Full-width Reviews Section */}
          <section id="reviews-section" className="detail-section full-width-section">
            <h2 className="section-title">Latest reviews</h2>
            <div className="reviews-container">
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <div key={review.id} className="review-card">
                    <div className="review-rating">
                      {renderStars(review.rating)}
                    </div>
                    <h3 className="review-title">{review.title}</h3>
                    <p className="review-body">{review.body}</p>
                    <div className="reviewer-info">
                      <div className="reviewer-avatar">
                        {review.reviewer.avatar ? (
                          <img src={review.reviewer.avatar} alt={review.reviewer.name} />
                        ) : (
                          <div className="avatar-placeholder">{review.reviewer.name.charAt(0)}</div>
                        )}
                      </div>
                      <span className="reviewer-name">{review.reviewer.name}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-reviews">No reviews yet. Be the first to write a review!</p>
              )}
            </div>
          </section>

          {/* Full-width Write Review Button */}
          <div className="write-review-container">
            <button className="write-review-btn">Write a review</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AIToolDetailPage; 