import React from 'react';
import './ToolsFilter.css';

function ToolsFilter() {
  return (
    <div className="tools-filter">
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search" 
          className="search-input"
        />
      </div>
      <div className="filter-options">
        <div className="filter-group">
          <select className="filter-select">
            <option value="">Role</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="fullstack">Full Stack</option>
          </select>
        </div>
        <div className="filter-group">
          <select className="filter-select">
            <option value="">Process</option>
            <option value="design">Design</option>
            <option value="development">Development</option>
            <option value="testing">Testing</option>
          </select>
        </div>
        <div className="filter-group">
          <select className="filter-select">
            <option value="">Price</option>
            <option value="free">Free</option>
            <option value="paid">Paid</option>
            <option value="freemium">Freemium</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default ToolsFilter; 