import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaStar, FaMobile, FaExternalLinkAlt, FaPlay, FaTimes } from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ToolCard from '../components/ToolCard';
import './AIToolDetailPage.css';
import { useAppContext } from '../context/AppContext';

function AIToolDetailPage() {
  // Get tool ID from URL params and setup state
  const { id } = useParams();
  const { tools } = useAppContext();
  const [tool, setTool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [relatedTools, setRelatedTools] = useState([]);
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    body: '',
    reviewer: { name: '', avatar: null }
  });
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({
    title: '',
    body: '',
    reviewerName: ''
  });

  // Utility function for secure Dicebear API calls
  const fetchDicebearAvatar = async (seed) => {
    try {
      const response = await fetch(`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`, {
        method: 'GET',
        headers: {
          'Accept': 'image/svg+xml',
          'Content-Type': 'image/svg+xml',
          'X-Content-Type-Options': 'nosniff',
          'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
          'Content-Security-Policy': "default-src 'self'; img-src 'self' https://api.dicebear.com; style-src 'self' 'unsafe-inline'; script-src 'self'",
          'X-XSS-Protection': '1; mode=block',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
          'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
          'Cache-Control': 'no-store, max-age=0',
          'Pragma': 'no-cache'
        },
        mode: 'cors',
        credentials: 'omit',
        cache: 'no-store',
        referrerPolicy: 'strict-origin-when-cross-origin'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
    } catch (error) {
      console.error('Error fetching Dicebear avatar:', error);
      throw error;
    }
  };

  // Toggle review popup visibility
  const toggleReviewPopup = async () => {
    // If opening the popup, reset the form with default avatar
    if (!showReviewPopup) {
      try {
        const defaultAvatarUrl = await fetchDicebearAvatar('default123');
        setNewReview({
          rating: 5,
          title: '',
          body: '',
          reviewer: { name: '', avatar: defaultAvatarUrl }
        });
      } catch (error) {
        // Fallback to a hardcoded default avatar URL if the fetch fails
        setNewReview({
          rating: 5,
          title: '',
          body: '',
          reviewer: { name: '', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=default123' }
        });
      }
      
      // Reset any form errors
      setFormErrors({
        title: '',
        body: '',
        reviewerName: ''
      });
    }
    setShowReviewPopup(!showReviewPopup);
  };

  // Handle review input changes
  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    
    // Clear error for this field when user starts typing
    setFormErrors({
      ...formErrors,
      [name === 'reviewerName' ? name : name]: ''
    });
    
    if (name === 'reviewerName') {
      setNewReview({
        ...newReview,
        reviewer: { ...newReview.reviewer, name: value }
      });
      
      // Validate name if user has typed something and then deleted it
      if (value.trim() === '') {
        setFormErrors({
          ...formErrors,
          reviewerName: ''  // We'll show error only on submit or blur
        });
      }
    } else {
      setNewReview({
        ...newReview,
        [name]: value
      });
      
      // Basic validation based on field
      if (name === 'title' && value.trim() === '') {
        setFormErrors({
          ...formErrors,
          title: ''  // We'll show error only on submit or blur
        });
      } else if (name === 'body' && value.trim() === '') {
        setFormErrors({
          ...formErrors,
          body: ''  // We'll show error only on submit or blur
        });
      }
    }
  };

  // Handle star rating change
  const handleRatingChange = (rating) => {
    setNewReview({
      ...newReview,
      rating
    });
  };

  // Fetch a random avatar from Dicebear API
  const fetchRandomAvatar = async () => {
    setAvatarLoading(true);
    const seed = Math.random().toString(36).substring(2, 8);
    
    try {
      const avatarUrl = await fetchDicebearAvatar(seed);
      setNewReview({
        ...newReview,
        reviewer: { ...newReview.reviewer, avatar: avatarUrl }
      });
    } catch (error) {
      console.error('Error fetching random avatar:', error);
      // Fallback to a default avatar in case of error
      try {
        const defaultAvatarUrl = await fetchDicebearAvatar('default123');
        setNewReview({
          ...newReview,
          reviewer: { ...newReview.reviewer, avatar: defaultAvatarUrl }
        });
      } catch (fallbackError) {
        // If even the fallback fails, use a hardcoded URL
        setNewReview({
          ...newReview,
          reviewer: { ...newReview.reviewer, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=default123' }
        });
      }
    } finally {
      setAvatarLoading(false);
    }
  };

  // Submit new review
  const submitReview = () => {
    // Validate all fields
    let isValid = true;
    const errors = {
      title: '',
      body: '',
      reviewerName: ''
    };
    
    // Title validation
    if (!newReview.title.trim()) {
      errors.title = 'Please enter a review title';
      isValid = false;
    } else if (newReview.title.trim().length < 3) {
      errors.title = 'Title must be at least 3 characters';
      isValid = false;
    }
    
    // Review body validation
    if (!newReview.body.trim()) {
      errors.body = 'Please enter your review';
      isValid = false;
    } else if (newReview.body.trim().length < 10) {
      errors.body = 'Review must be at least 10 characters';
      isValid = false;
    }
    
    // Name validation
    if (!newReview.reviewer.name.trim()) {
      errors.reviewerName = 'Please enter your name';
      isValid = false;
    }
    
    // Update error messages
    setFormErrors(errors);
    
    // If there are errors, don't submit
    if (!isValid) {
      return;
    }

    const reviewToAdd = {
      ...newReview,
      id: Date.now(), // Simple unique ID
      date: new Date().toISOString(),
      reviewer: {
        ...newReview.reviewer,
        name: newReview.reviewer.name.trim() || 'Anonymous User',
        avatar: newReview.reviewer.avatar || null
      }
    };

    // Add review to the list
    setReviews([reviewToAdd, ...reviews]);
    
    // Reset form
    setNewReview({
      rating: 5,
      title: '',
      body: '',
      reviewer: { name: '', avatar: null }
    });
    
    // Reset form errors
    setFormErrors({
      title: '',
      body: '',
      reviewerName: ''
    });
    
    // Close popup
    setShowReviewPopup(false);
  };

  // Scroll to top when component mounts or ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Get tool icon path from name
  const getToolIconPath = (name) => {
    if (!name) return '';
    // Convert to lowercase and remove spaces/special chars
    const formattedName = name.toLowerCase().replace(/[^a-z0-9]/g, '');
    return `/icon/${formattedName}.png`;
  };

  // Get appropriate class for price type badge
  const getPriceTypeClass = (type) => {
    switch (type?.toLowerCase()) {
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

  // Load tool data when component mounts or ID changes
  useEffect(() => {
    const toolId = parseInt(id);
    const foundTool = tools.find(tool => tool.id === toolId);
    
    if (foundTool) {
      // Log the current tool's data
      console.log('Current tool:', {
        id: foundTool.id,
        name: foundTool.name,
        role: foundTool.role,
        process: foundTool.process,
        type: foundTool.type
      });

      setTool(foundTool);
      setReviews(foundTool.reviews || []);
      
      // Log all available tools for comparison
      console.log('All tools:', tools.map(t => ({
        id: t.id,
        name: t.name,
        role: t.role,
        process: t.process,
        type: t.type
      })));

      // Find related tools based on role or process
      const related = tools
        .filter(t => {
          // Skip the current tool
          if (t.id === toolId) return false;
          
          // Check if either role or process matches
          const roleMatch = t.role && foundTool.role && 
                           ((Array.isArray(t.role) && Array.isArray(foundTool.role) &&
                             (t.role.some(r => foundTool.role.includes(r)) || 
                              foundTool.role.some(r => t.role.includes(r)))) ||
                            (typeof t.role === 'string' && typeof foundTool.role === 'string' &&
                             (t.role.toLowerCase() === foundTool.role.toLowerCase() ||
                              t.role.toLowerCase().includes(foundTool.role.toLowerCase()) ||
                              foundTool.role.toLowerCase().includes(t.role.toLowerCase()))));
          
          const processMatch = t.process && foundTool.process && 
                              ((Array.isArray(t.process) && Array.isArray(foundTool.process) &&
                                (t.process.some(p => foundTool.process.includes(p)) || 
                                 foundTool.process.some(p => t.process.includes(p)))) ||
                               (typeof t.process === 'string' && typeof foundTool.process === 'string' &&
                                (t.process.toLowerCase() === foundTool.process.toLowerCase() ||
                                 t.process.toLowerCase().includes(foundTool.process.toLowerCase()) ||
                                 foundTool.process.toLowerCase().includes(t.process.toLowerCase()))));
          
          // Log matching details
          console.log('Checking tool:', t.name, {
            roleMatch,
            processMatch,
            toolRole: t.role,
            foundToolRole: foundTool.role,
            toolProcess: t.process,
            foundToolProcess: foundTool.process
          });
          
          return roleMatch || processMatch;
        })
        .sort((a, b) => {
          // Prioritize exact matches
          const aRoleExactMatch = a.role && foundTool.role && 
                                 ((Array.isArray(a.role) && Array.isArray(foundTool.role) && 
                                   a.role.some(r => foundTool.role.includes(r)) && 
                                   foundTool.role.some(r => a.role.includes(r))) ||
                                  (typeof a.role === 'string' && typeof foundTool.role === 'string' && 
                                   a.role.toLowerCase() === foundTool.role.toLowerCase()));
          
          const bRoleExactMatch = b.role && foundTool.role && 
                                 ((Array.isArray(b.role) && Array.isArray(foundTool.role) && 
                                   b.role.some(r => foundTool.role.includes(r)) && 
                                   foundTool.role.some(r => b.role.includes(r))) ||
                                  (typeof b.role === 'string' && typeof foundTool.role === 'string' && 
                                   b.role.toLowerCase() === foundTool.role.toLowerCase()));
          
          const aProcessExactMatch = a.process && foundTool.process && 
                                    ((Array.isArray(a.process) && Array.isArray(foundTool.process) && 
                                      a.process.some(p => foundTool.process.includes(p)) && 
                                      foundTool.process.some(p => a.process.includes(p))) ||
                                     (typeof a.process === 'string' && typeof foundTool.process === 'string' && 
                                      a.process.toLowerCase() === foundTool.process.toLowerCase()));
          
          const bProcessExactMatch = b.process && foundTool.process && 
                                    ((Array.isArray(b.process) && Array.isArray(foundTool.process) && 
                                      b.process.some(p => foundTool.process.includes(p)) && 
                                      foundTool.process.some(p => b.process.includes(p))) ||
                                     (typeof b.process === 'string' && typeof foundTool.process === 'string' && 
                                      b.process.toLowerCase() === foundTool.process.toLowerCase()));
          
          // If one has exact role match and other doesn't
          if (aRoleExactMatch && !bRoleExactMatch) return -1;
          if (!aRoleExactMatch && bRoleExactMatch) return 1;
          
          // If one has exact process match and other doesn't
          if (aProcessExactMatch && !bProcessExactMatch) return -1;
          if (!aProcessExactMatch && bProcessExactMatch) return 1;
          
          return 0;
        })
        .slice(0, 8);
      
      // Log final related tools
      console.log('Found related tools:', related.map(t => ({
        id: t.id,
        name: t.name,
        role: t.role,
        process: t.process,
        type: t.type
      })));
      
      setRelatedTools(related);
    }
    
    setLoading(false);
  }, [id, tools]);

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

  // Handle field blur for validation
  const handleBlur = (e) => {
    const { name, value } = e.target;
    
    // Validate the field that just lost focus
    if (name === 'reviewerName') {
      if (value.trim() === '') {
        setFormErrors({
          ...formErrors,
          reviewerName: 'Please enter your name'
        });
      }
    } else if (name === 'title') {
      if (value.trim() === '') {
        setFormErrors({
          ...formErrors,
          title: 'Please enter a review title'
        });
      } else if (value.trim().length < 3) {
        setFormErrors({
          ...formErrors,
          title: 'Title must be at least 3 characters'
        });
      }
    } else if (name === 'body') {
      if (value.trim() === '') {
        setFormErrors({
          ...formErrors,
          body: 'Please enter your review'
        });
      } else if (value.trim().length < 10) {
        setFormErrors({
          ...formErrors,
          body: 'Review must be at least 10 characters'
        });
      }
    }
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
                  <span className={`meta-badge price ${getPriceTypeClass(tool.type)}`}>
                    {tool.type}
                  </span>
                  <div className="tool-tags">
                    {tool.role && (
                      <span className="tag role">Role: {Array.isArray(tool.role) ? tool.role.join(', ') : tool.role}</span>
                    )}
                    {tool.process && (
                      <span className="tag process">Process: {Array.isArray(tool.process) ? tool.process.join(', ') : tool.process}</span>
                    )}
                  </div>
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
                  {relatedTools.length > 0 ? (
                    relatedTools.map(relatedTool => (
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
                              {renderStars(relatedTool.rating)}
                            </div>
                          </div>
                        </div>
                        
                        <div className="tool-meta">
                          <span className={`tool-type ${getPriceTypeClass(relatedTool.type)}`}>
                            {relatedTool.type}
                          </span>
                          {/* <div className="tool-tags">
                            {relatedTool.role && (
                              <span className="tag role">Role: {Array.isArray(relatedTool.role) ? relatedTool.role.join(', ') : relatedTool.role}</span>
                            )}
                            {relatedTool.process && (
                              <span className="tag process">Process: {Array.isArray(relatedTool.process) ? relatedTool.process.join(', ') : relatedTool.process}</span>
                            )}
                          </div> */}
                        </div>
                        
                        <div className="tool-preview">
                          <p className="tool-description">{relatedTool.description}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="no-related">No related tools found</p>
                  )}
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
            <button className="write-review-btn" onClick={toggleReviewPopup}>Write a review</button>
          </div>
        </div>
      </div>
      <Footer />

      {/* Review Popup */}
      {showReviewPopup && (
        <div className="review-popup-overlay">
          <div className="review-popup">
            <div className="review-popup-header">
              <h3>Write a Review for {tool.name}</h3>
              <button className="close-popup" onClick={toggleReviewPopup}>
                <FaTimes />
              </button>
            </div>
            <div className="review-popup-content">
              <div className="review-popup-rating">
                <p>Your Rating:</p>
                <div className="rating-stars-input">
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      className={`star ${index < newReview.rating ? 'filled' : 'empty'}`}
                      onClick={() => handleRatingChange(index + 1)}
                    />
                  ))}
                </div>
              </div>
              <div className="review-popup-form">
                <div className="form-group">
                  <label htmlFor="review-title">Title</label>
                  <input
                    type="text"
                    id="review-title"
                    name="title"
                    placeholder="Summarize your experience"
                    value={newReview.title}
                    onChange={handleReviewChange}
                    onBlur={handleBlur}
                    className={formErrors.title ? 'input-error' : ''}
                  />
                  {formErrors.title && <div className="error-message">{formErrors.title}</div>}
                </div>
                <div className="form-group">
                  <label htmlFor="review-body">Review</label>
                  <textarea
                    id="review-body"
                    name="body"
                    placeholder="Share your thoughts about this AI tool"
                    rows="5"
                    value={newReview.body}
                    onChange={handleReviewChange}
                    onBlur={handleBlur}
                    className={formErrors.body ? 'input-error' : ''}
                  ></textarea>
                  {formErrors.body && <div className="error-message">{formErrors.body}</div>}
                </div>
                <div className="reviewer-details">
                  <div className="reviewer-info-row">
                    <div className="form-group name-input">
                      <label htmlFor="reviewer-name">Your Name</label>
                      <input
                        type="text"
                        id="reviewer-name"
                        name="reviewerName"
                        placeholder="Enter your name"
                        value={newReview.reviewer.name}
                        onChange={handleReviewChange}
                        onBlur={handleBlur}
                        className={formErrors.reviewerName ? 'input-error' : ''}
                      />
                      {formErrors.reviewerName && <div className="error-message">{formErrors.reviewerName}</div>}
                    </div>
                    <div className="avatar-section">
                      <label>Your Avatar</label>
                      <div className="avatar-container">
                        <div className="avatar-preview">
                          {newReview.reviewer.avatar ? (
                            <img 
                              src={newReview.reviewer.avatar} 
                              alt="Your avatar" 
                              className="preview-avatar"
                            />
                          ) : (
                            <div className="empty-avatar">
                              {newReview.reviewer.name ? newReview.reviewer.name.charAt(0).toUpperCase() : '?'}
                            </div>
                          )}
                        </div>
                        <button 
                          type="button" 
                          className="generate-avatar-btn" 
                          onClick={fetchRandomAvatar}
                          disabled={avatarLoading}
                        >
                          {avatarLoading ? '...' : 'New'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="review-popup-footer">
              <button className="cancel-review-btn" onClick={toggleReviewPopup}>Cancel</button>
              <button className="submit-review-btn" onClick={submitReview}>Submit Review</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AIToolDetailPage; 