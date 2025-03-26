import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaStar, FaMobile, FaExternalLinkAlt } from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ToolCard from '../components/ToolCard';
import './AIToolDetailPage.css';

function AIToolDetailPage() {
  const { id } = useParams();
  const [tool, setTool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [relatedTools, setRelatedTools] = useState([]);

  // Dummy data for the tool (would be fetched from API in a real app)
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setTool({
        id: 1,
        name: 'Shipixen',
        rating: 4.5,
        ratingCount: 12,
        type: 'Free',
        role: 'developer',
        process: 'Development',
        likes: 235,
        description: 'Shipixen is an AI-powered code shipment and deployment tool that automates the process of shipping and deploying code to various environments. It optimizes the deployment workflow for developers and DevOps teams.',
        summary: 'Shipixen simplifies the deployment process by automatically analyzing your codebase, detecting dependencies, and suggesting the optimal deployment strategy. It integrates with popular CI/CD pipelines and cloud platforms to provide a seamless experience.',
        keyFeatures: [
          'Automatic deployment configuration generation',
          'Integration with major cloud providers (AWS, Azure, GCP)',
          'Container optimization for faster deployments',
          'Deployment history and rollback capabilities',
          'Environment configuration management',
          'Real-time deployment monitoring'
        ],
        url: 'https://shipixen.com',
        logoUrl: 'https://shipixen.com/logo.png'
      });

      setReviews([
        {
          id: 1,
          title: 'Game changer for deployments',
          body: 'This tool has completely transformed our deployment process. We used to spend hours configuring deployment settings, but now Shipixen handles it all automatically.',
          rating: 5,
          reviewer: {
            name: 'Alex Johnson',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
          }
        },
        {
          id: 2,
          title: 'Solid tool with some limitations',
          body: 'Shipixen works great for standard deployments, but we found some limitations when dealing with complex microservices architectures. Still, it saved us a lot of time overall.',
          rating: 4,
          reviewer: {
            name: 'Sarah Williams',
            avatar: 'https://randomuser.me/api/portraits/women/45.jpg'
          }
        },
        {
          id: 3,
          title: 'Excellent support team',
          body: 'When we ran into issues with our custom setup, the Shipixen support team was incredibly helpful. They worked with us to solve our problems quickly.',
          rating: 5,
          reviewer: {
            name: 'Michael Chen',
            avatar: 'https://randomuser.me/api/portraits/men/67.jpg'
          }
        }
      ]);

      // Set related tools using the same data structure as the tools on the homepage
      setRelatedTools([
        {
          id: 2,
          name: 'DeployMaster',
          rating: 4.2,
          type: 'Freemium',
          role: 'DevOps',
          process: 'Deployment',
          likes: 187,
          description: 'AI-powered deployment tool that helps optimize your infrastructure and deployment pipelines.',
          url: 'https://deploymaster.dev'
        },
        {
          id: 3,
          name: 'CodeShipper',
          rating: 4.0,
          type: 'Free',
          role: 'Developer',
          process: 'CI/CD',
          likes: 156,
          description: 'Streamline your code shipping process with AI-assisted deployment configurations and monitoring.',
          url: 'https://codeshipper.io'
        },
        {
          id: 4,
          name: 'CloudDeploy',
          rating: 4.8,
          type: 'Paid',
          role: 'Cloud Engineer',
          process: 'Deployment',
          likes: 312,
          description: 'Deploy to any cloud provider with intelligent optimization and cost management.',
          url: 'https://clouddeploy.ai'
        },
        {
          id: 5,
          name: 'DeployWizard',
          rating: 4.3,
          type: 'Free',
          role: 'Developer',
          process: 'CI/CD',
          likes: 203,
          description: 'AI wizard that guides you through the deployment process with step-by-step instructions.',
          url: 'https://deploywizard.dev'
        },
        {
          id: 6,
          name: 'InfraBrain',
          rating: 4.6,
          type: 'Paid',
          role: 'DevOps',
          process: 'Infrastructure',
          likes: 275,
          description: 'AI infrastructure management tool that learns from your deployment patterns and suggests optimizations.',
          url: 'https://infrabrain.io'
        },
        {
          id: 7,
          name: 'AutoDeploy',
          rating: 3.9,
          type: 'Freemium',
          role: 'Developer',
          process: 'Deployment',
          likes: 143,
          description: 'Automated deployment solution with AI-powered error detection and resolution.',
          url: 'https://autodeploy.app'
        },
        {
          id: 8,
          name: 'ContainerSmith',
          rating: 4.4,
          type: 'Paid',
          role: 'DevOps',
          process: 'Containerization',
          likes: 231,
          description: 'AI tool that builds and optimizes Docker containers for your applications automatically.',
          url: 'https://containersmith.tech'
        },
        {
          id: 9,
          name: 'DeployGuard',
          rating: 4.7,
          type: 'Freemium',
          role: 'Security Engineer',
          process: 'Security',
          likes: 289,
          description: 'AI-powered security scanning and protection for your deployment pipeline and infrastructure.',
          url: 'https://deployguard.dev'
        }
      ]);

      setLoading(false);
    }, 500);
  }, [id]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar 
          key={i} 
          className={i <= rating ? 'star filled' : 'star'} 
        />
      );
    }
    return stars;
  };

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

  return (
    <div className="ai-tool-detail-page">
      <Header />
      <div className="container">
        <div className="tool-detail-wrapper">
          {/* Tool Header Section */}
          <div className="tool-detail-header">
            <div className="tool-header-left">
              <div className="tool-logo">
                {/* Placeholder for logo */}
              </div>
              <div className="tool-header-info">
                <h1 className="tool-name">{tool.name}</h1>
                <div className="tool-meta">
                  <span className="meta-badge price">{tool.type}</span>
                  <span className="meta-tag">#{tool.role}</span>
                </div>
                <div className="tool-rating-container">
                  <div className="tool-rating">
                    {renderStars(tool.rating)}
                    <span className="rating-value">{tool.rating}</span>
                  </div>
                  <div className="rating-count">
                    <FaMobile /> {tool.ratingCount}
                  </div>
                </div>
                <a href={tool.url} target="_blank" rel="noopener noreferrer" className="visit-site-btn">
                  Visit Site <FaExternalLinkAlt />
                </a>
              </div>
            </div>
            <div className="tool-header-right">
              {/* Tool preview image would go here */}
              <div className="tool-preview-image">
                {/* Placeholder for tool preview/screenshot */}
              </div>
            </div>
          </div>

          {/* Two column grid with stacked left sections */}
          <div className="tool-detail-content-layout">
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
                    {tool.keyFeatures.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </section>
            </div>

            <div className="tool-detail-right-column">
              {/* Related Tools Section */}
              <section className="detail-section">
                <h2 className="section-title">Related tools</h2>
                <div className="related-tools-container">
                  {relatedTools.map(relatedTool => (
                    <div key={relatedTool.id} className="simplified-tool-card">
                      <div className="tool-header">
                        <div className="tool-logo-container">
                          <div className="tool-logo"></div>
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
          <section className="detail-section full-width-section">
            <h2 className="section-title">Latest reviews</h2>
            <div className="reviews-container">
              {reviews.map((review) => (
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
              ))}
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