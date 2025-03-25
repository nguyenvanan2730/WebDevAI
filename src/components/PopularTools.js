import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './PopularTools.css';

function PopularTools() {
  // Reference to the scrolling container
  const scrollContainerRef = useRef(null);
  
  // Sample data for popular tools (random selection)
  const popularTools = [
    { 
      id: 7, 
      name: 'Notion AI', 
      rating: 4, 
      type: 'Paid',
      description: 'Smart assistant for your workspace',
      icon: '📝'
    },
    { 
      id: 11, 
      name: 'Canva AI', 
      rating: 4, 
      type: 'Freemium',
      description: 'Design with AI-powered suggestions',
      icon: '🎨'
    },
    { 
      id: 14, 
      name: 'Perplexity AI', 
      rating: 5, 
      type: 'Free',
      description: 'AI-powered search & answers',
      icon: '🔍'
    },
    { 
      id: 8, 
      name: 'Jasper', 
      rating: 4, 
      type: 'Paid',
      description: 'AI content creation platform',
      icon: '✍️'
    },
    { 
      id: 3, 
      name: 'Midjourney', 
      rating: 4, 
      type: 'Paid',
      description: 'Create stunning AI art',
      icon: '🖼️'
    },
    { 
      id: 6, 
      name: 'Cursor', 
      rating: 5, 
      type: 'Free',
      description: 'AI-powered code editor',
      icon: '💻'
    },
    { 
      id: 16, 
      name: 'Gamma', 
      rating: 4, 
      type: 'Freemium',
      description: 'AI presentation creator',
      icon: '📊'
    },
    { 
      id: 10, 
      name: 'Grammarly', 
      rating: 5, 
      type: 'Freemium',
      description: 'AI writing assistant',
      icon: '✅'
    }
  ];

  // Auto-scroll effect
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let direction = 1; // 1 for right, -1 for left
    let scrollSpeed = 0.5; // pixels per frame
    let animationFrameId = null;
    let lastScrollPosition = 0;
    let pauseTimeout = null;
    
    const animate = () => {
      if (!scrollContainer) return;
      
      // Get max scroll width
      const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      
      // Update scroll position
      scrollContainer.scrollLeft += scrollSpeed * direction;
      
      // Check if we've reached the end or beginning
      if (scrollContainer.scrollLeft >= maxScroll) {
        // Reached right edge, pause then reverse
        direction = -1;
        clearTimeout(pauseTimeout);
        pauseTimeout = setTimeout(() => {
          animationFrameId = requestAnimationFrame(animate);
        }, 2000); // Pause for 2 seconds
        return;
      } else if (scrollContainer.scrollLeft <= 0) {
        // Reached left edge, pause then reverse
        direction = 1;
        clearTimeout(pauseTimeout);
        pauseTimeout = setTimeout(() => {
          animationFrameId = requestAnimationFrame(animate);
        }, 2000); // Pause for 2 seconds
        return;
      }
      
      // Check if scroll has been manually interrupted
      if (Math.abs(scrollContainer.scrollLeft - lastScrollPosition) > Math.abs(scrollSpeed * direction * 2)) {
        // User probably scrolled manually - pause animation for a few seconds
        clearTimeout(pauseTimeout);
        pauseTimeout = setTimeout(() => {
          lastScrollPosition = scrollContainer.scrollLeft;
          animationFrameId = requestAnimationFrame(animate);
        }, 5000); // Pause for 5 seconds after manual interaction
        return;
      }
      
      lastScrollPosition = scrollContainer.scrollLeft;
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Start the animation
    animationFrameId = requestAnimationFrame(animate);
    
    // Pause animation when user hovers over the container
    const pauseAnimation = () => {
      cancelAnimationFrame(animationFrameId);
    };
    
    const resumeAnimation = () => {
      lastScrollPosition = scrollContainer.scrollLeft;
      animationFrameId = requestAnimationFrame(animate);
    };
    
    scrollContainer.addEventListener('mouseenter', pauseAnimation);
    scrollContainer.addEventListener('mouseleave', resumeAnimation);
    
    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(pauseTimeout);
      if (scrollContainer) {
        scrollContainer.removeEventListener('mouseenter', pauseAnimation);
        scrollContainer.removeEventListener('mouseleave', resumeAnimation);
      }
    };
  }, []);

  return (
    <section className="popular-tools">
      <h2>Popular tools</h2>
      <div className="popular-tools-container">
        <div 
          className="popular-tools-scroll" 
          ref={scrollContainerRef}
        >
          {popularTools.map(tool => (
            <Link to={`/tool/${tool.id}`} key={tool.id} className="popular-tool-card">
              <div className="popular-tool-icon">{tool.icon}</div>
              <div className="popular-tool-content">
                <div className="popular-tool-header">
                  <h3 className="popular-tool-name">{tool.name}</h3>
                  <span className={`popular-tool-type ${tool.type.toLowerCase()}`}>{tool.type}</span>
                </div>
                <div className="popular-tool-rating">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`popular-star ${i < tool.rating ? 'filled' : ''}`}>★</span>
                  ))}
                </div>
                <p className="popular-tool-description">{tool.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PopularTools; 