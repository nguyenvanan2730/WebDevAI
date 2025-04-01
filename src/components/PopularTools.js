import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './PopularTools.css';
import toolsData from './toolsData.json'; // Import the tools data

function PopularTools() {
  // Reference to the scrolling container
  const scrollContainerRef = useRef(null);
  const [popularTools, setPopularTools] = useState([]);
  
  // Get popular tools based on rating and likes
  useEffect(() => {
    if (toolsData && toolsData.length > 0) {
      // Sort tools by a combination of rating and likes
      const sortedTools = [...toolsData].sort((a, b) => {
        const scoreA = a.rating * 20 + a.likes / 50; // Weight formula
        const scoreB = b.rating * 20 + b.likes / 50;
        return scoreB - scoreA;
      });
      
      // Take top 8 tools and add icon based on role
      const top8Tools = sortedTools.slice(0, 8).map(tool => {
        let icon = '🔧'; // Default icon
        
        // Assign icons based on role
        switch(tool.role.toLowerCase()) {
          case 'developer':
            icon = '💻';
            break;
          case 'designer':
            icon = '🎨';
            break;
          case 'marketer':
            icon = '📊';
            break;
          case 'product manager':
            icon = '📝';
            break;
          case 'analyst':
            icon = '📈';
            break;
          default:
            icon = '🔧';
        }
        
        return {
          ...tool,
          icon
        };
      });
      
      setPopularTools(top8Tools);
    }
  }, []);

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
  }, [popularTools]); // Add popularTools as dependency to restart animation when data loads

  // Loading state
  if (popularTools.length === 0) {
    return (
      <section className="popular-tools">
        <h2>Popular tools</h2>
        <div className="popular-tools-container">
          <div className="loading">Loading popular tools...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="popular-tools">
      <h2>Popular tools</h2>
      <div className="popular-tools-container">
        <div 
          className="popular-tools-scroll" 
          ref={scrollContainerRef}
        >
          {popularTools.map(tool => (
            <Link to={`/tools/${tool.id}`} key={tool.id} className="popular-tool-card">
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