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
            <option value="developer">Developer</option>
            <option value="designer">Designer</option>
            <option value="product-manager">Product Manager</option>
            <option value="tester">Tester</option>
            <option value="devops">DevOps</option>
            <option value="marketer">Marketer</option>
            <option value="analyst">Analyst</option>
          </select>
        </div>
        <div className="filter-group">
          <select className="filter-select">
            <option value="">Process</option>
            <option value="research">Research</option>
            <option value="planning">Planning</option>
            <option value="design">Design</option>
            <option value="development">Development</option>
            <option value="testing">Testing</option>
            <option value="deployment">Deployment</option>
            <option value="maintenance">Maintenance</option>
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