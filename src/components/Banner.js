import React from 'react';
import './Banner.css';

function Banner({ title, subtitle }) {
  return (
    <div className="banner">
      <div className="container">
        <div className="banner-content">
          <h1 className="banner-title">{title}</h1>
          <p className="banner-subtitle">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Banner; 