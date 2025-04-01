import React, { useState, useEffect, useRef } from 'react';
import ToolCard from './ToolCard';
import Pagination from './Pagination';
import { FaSearch, FaChevronDown } from 'react-icons/fa';
import './ToolGrid.css';
import './ToolsFilter.css';
import allTools from './toolsData.json'; // Import the tools data

function ToolGrid() {
  // Get unique roles, processes, and prices from the data
  const roles = [...new Set(allTools.map(tool => tool.role))];
  const processes = [...new Set(allTools.map(tool => tool.process))];
  const prices = [...new Set(allTools.map(tool => tool.type))];
  // Generate rating options (1-5)
  const ratings = [1, 2, 3, 4, 5];
  // Generate likes ranges
  const likesRanges = [
    { min: 0, max: 200, label: '0-200' },
    { min: 201, max: 300, label: '201-300' },
    { min: 301, max: 400, label: '301-400' },
    { min: 401, max: 500, label: '401-500' },
    { min: 501, max: 1000, label: '501+' }
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedProcesses, setSelectedProcesses] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedLikesRanges, setSelectedLikesRanges] = useState([]);
  const [filteredTools, setFilteredTools] = useState([]);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  
  // UI state for dropdowns
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [processDropdownOpen, setProcessDropdownOpen] = useState(false);
  const [priceDropdownOpen, setPriceDropdownOpen] = useState(false);
  const [ratingDropdownOpen, setRatingDropdownOpen] = useState(false);
  const [likesDropdownOpen, setLikesDropdownOpen] = useState(false);
  
  const toolsPerPage = 9;

  // Create refs for the dropdowns
  const roleDropdownRef = useRef(null);
  const processDropdownRef = useRef(null);
  const priceDropdownRef = useRef(null);
  const ratingDropdownRef = useRef(null);
  const likesDropdownRef = useRef(null);
  
  // Initialize filtered tools with all tools
  useEffect(() => {
    setFilteredTools(allTools);
  }, []);

  // Add event listener to detect outside clicks
  useEffect(() => {
    function handleClickOutside(event) {
      if (roleDropdownRef.current && !roleDropdownRef.current.contains(event.target)) {
        setRoleDropdownOpen(false);
      }
      if (processDropdownRef.current && !processDropdownRef.current.contains(event.target)) {
        setProcessDropdownOpen(false);
      }
      if (priceDropdownRef.current && !priceDropdownRef.current.contains(event.target)) {
        setPriceDropdownOpen(false);
      }
      if (ratingDropdownRef.current && !ratingDropdownRef.current.contains(event.target)) {
        setRatingDropdownOpen(false);
      }
      if (likesDropdownRef.current && !likesDropdownRef.current.contains(event.target)) {
        setLikesDropdownOpen(false);
      }
    }
    
    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);
    
    // Clean up the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle checkbox changes
  const handleRoleChange = (role) => {
    setSelectedRoles(prev => 
      prev.includes(role) 
        ? prev.filter(r => r !== role) 
        : [...prev, role]
    );
  };

  const handleProcessChange = (process) => {
    setSelectedProcesses(prev => 
      prev.includes(process) 
        ? prev.filter(p => p !== process) 
        : [...prev, process]
    );
  };

  const handlePriceChange = (price) => {
    setSelectedPrices(prev => 
      prev.includes(price) 
        ? prev.filter(p => p !== price) 
        : [...prev, price]
    );
  };

  const handleRatingChange = (rating) => {
    setSelectedRatings(prev => 
      prev.includes(rating) 
        ? prev.filter(r => r !== rating) 
        : [...prev, rating]
    );
  };

  const handleLikesRangeChange = (rangeIndex) => {
    setSelectedLikesRanges(prev => 
      prev.includes(rangeIndex) 
        ? prev.filter(r => r !== rangeIndex) 
        : [...prev, rangeIndex]
    );
  };

  // Apply filters when user clicks Apply Filters button
  const handleApplyFilters = () => {
    let result = [...allTools];
    
    // Apply search filter - search by name or description only
    if (searchTerm) {
      result = result.filter(tool => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return tool.name.toLowerCase().includes(lowerCaseSearchTerm) ||
               tool.description.toLowerCase().includes(lowerCaseSearchTerm);
      });
    }
    
    // Apply role filters
    if (selectedRoles.length > 0) {
      result = result.filter(tool => 
        selectedRoles.includes(tool.role)
      );
    }
    
    // Apply process filters
    if (selectedProcesses.length > 0) {
      result = result.filter(tool => 
        selectedProcesses.includes(tool.process)
      );
    }
    
    // Apply price filters
    if (selectedPrices.length > 0) {
      result = result.filter(tool => 
        selectedPrices.includes(tool.type)
      );
    }
    
    // Apply rating filters
    if (selectedRatings.length > 0) {
      result = result.filter(tool => 
        selectedRatings.includes(tool.rating)
      );
    }
    
    // Apply likes range filters
    if (selectedLikesRanges.length > 0) {
      result = result.filter(tool => {
        return selectedLikesRanges.some(rangeIndex => {
          const range = likesRanges[rangeIndex];
          if (range.max === 1000) { // For the 501+ range
            return tool.likes >= range.min;
          } else {
            return tool.likes >= range.min && tool.likes <= range.max;
          }
        });
      });
    }
    
    setFilteredTools(result);
    setCurrentPage(1); // Reset to first page when filters change
    setIsFilterApplied(true);
  };

  // Reset filters and display all tools
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedRoles([]);
    setSelectedProcesses([]);
    setSelectedPrices([]);
    setSelectedRatings([]);
    setSelectedLikesRanges([]);
    setFilteredTools(allTools);
    setIsFilterApplied(false);
  };

  // Real-time search filter
  useEffect(() => {
    if (searchTerm) {
      const searchResults = allTools.filter(tool => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        
        // Search by name or description only
        return tool.name.toLowerCase().includes(lowerCaseSearchTerm) ||
               tool.description.toLowerCase().includes(lowerCaseSearchTerm);
      });
      
      // Apply other active filters to search results
      let result = [...searchResults];
      
      if (selectedRoles.length > 0) {
        result = result.filter(tool => selectedRoles.includes(tool.role));
      }
      
      if (selectedProcesses.length > 0) {
        result = result.filter(tool => selectedProcesses.includes(tool.process));
      }
      
      if (selectedPrices.length > 0) {
        result = result.filter(tool => selectedPrices.includes(tool.type));
      }
      
      if (selectedRatings.length > 0) {
        result = result.filter(tool => selectedRatings.includes(tool.rating));
      }
      
      if (selectedLikesRanges.length > 0) {
        result = result.filter(tool => {
          return selectedLikesRanges.some(rangeIndex => {
            const range = likesRanges[rangeIndex];
            if (range.max === 1000) { // For the 501+ range
              return tool.likes >= range.min;
            } else {
              return tool.likes >= range.min && tool.likes <= range.max;
            }
          });
        });
      }
      
      setFilteredTools(result);
    } else if (isFilterApplied) {
      // If there's no search term but other filters are applied, reapply those filters
      handleApplyFilters();
    } else {
      // If no filters are applied, show all tools
      setFilteredTools(allTools);
    }
  }, [searchTerm]);

  // Get current tools
  const indexOfLastTool = currentPage * toolsPerPage;
  const indexOfFirstTool = indexOfLastTool - toolsPerPage;
  const currentTools = filteredTools.slice(indexOfFirstTool, indexOfLastTool);

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Helper to close other dropdowns when one is opened
  const handleDropdownToggle = (dropdown) => {
    if (dropdown === 'role') {
      setRoleDropdownOpen(!roleDropdownOpen);
      setProcessDropdownOpen(false);
      setPriceDropdownOpen(false);
      setRatingDropdownOpen(false);
      setLikesDropdownOpen(false);
    } else if (dropdown === 'process') {
      setProcessDropdownOpen(!processDropdownOpen);
      setRoleDropdownOpen(false);
      setPriceDropdownOpen(false);
      setRatingDropdownOpen(false);
      setLikesDropdownOpen(false);
    } else if (dropdown === 'price') {
      setPriceDropdownOpen(!priceDropdownOpen);
      setRoleDropdownOpen(false);
      setProcessDropdownOpen(false);
      setRatingDropdownOpen(false);
      setLikesDropdownOpen(false);
    } else if (dropdown === 'rating') {
      setRatingDropdownOpen(!ratingDropdownOpen);
      setRoleDropdownOpen(false);
      setProcessDropdownOpen(false);
      setPriceDropdownOpen(false);
      setLikesDropdownOpen(false);
    } else if (dropdown === 'likes') {
      setLikesDropdownOpen(!likesDropdownOpen);
      setRoleDropdownOpen(false);
      setProcessDropdownOpen(false);
      setPriceDropdownOpen(false);
      setRatingDropdownOpen(false);
    }
  };

  return (
    <div className="tool-grid-container">
      <h2 className="section-title">All AI Tools</h2>

      <div className="tools-filter">
        <div className="filter-row">
          <div className="filter-input">
            <label>Search</label>
            <div style={{ position: 'relative' }}>
              <input 
                type="text" 
                placeholder="Search by tool name or description" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="search-icon"><FaSearch /></span>
            </div>
          </div>
        </div>
        
        <div className="filter-row">
          {/* Role Filter Dropdown */}
          <div className="filter-dropdown" ref={roleDropdownRef}>
            <label>Role</label>
            <div className="dropdown-header" onClick={() => handleDropdownToggle('role')}>
              <span>
                {selectedRoles.length === 0 
                  ? 'All Roles' 
                  : selectedRoles.length === 1 
                    ? selectedRoles[0] 
                    : `${selectedRoles.length} roles selected`}
              </span>
              <span className={`dropdown-arrow ${roleDropdownOpen ? 'open' : ''}`}>
                <FaChevronDown />
              </span>
            </div>
            {roleDropdownOpen && (
              <div className="dropdown-content">
                <div className="dropdown-actions">
                  <button 
                    className="dropdown-action-btn" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedRoles(roles);
                    }}
                  >
                    Select All
                  </button>
                  <button 
                    className="dropdown-action-btn" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedRoles([]);
                    }}
                  >
                    Unselect All
                  </button>
                </div>
                <div className="dropdown-divider"></div>
                {roles.map(role => (
                  <label key={role} className="checkbox-label">
                    <input 
                      type="checkbox" 
                      checked={selectedRoles.includes(role)}
                      onChange={() => handleRoleChange(role)}
                    />
                    <span>{role}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
          
          {/* Process Filter Dropdown */}
          <div className="filter-dropdown" ref={processDropdownRef}>
            <label>Process</label>
            <div className="dropdown-header" onClick={() => handleDropdownToggle('process')}>
              <span>
                {selectedProcesses.length === 0 
                  ? 'All Processes' 
                  : selectedProcesses.length === 1 
                    ? selectedProcesses[0] 
                    : `${selectedProcesses.length} processes selected`}
              </span>
              <span className={`dropdown-arrow ${processDropdownOpen ? 'open' : ''}`}>
                <FaChevronDown />
              </span>
            </div>
            {processDropdownOpen && (
              <div className="dropdown-content">
                <div className="dropdown-actions">
                  <button 
                    className="dropdown-action-btn" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProcesses(processes);
                    }}
                  >
                    Select All
                  </button>
                  <button 
                    className="dropdown-action-btn" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProcesses([]);
                    }}
                  >
                    Unselect All
                  </button>
                </div>
                <div className="dropdown-divider"></div>
                {processes.map(process => (
                  <label key={process} className="checkbox-label">
                    <input 
                      type="checkbox" 
                      checked={selectedProcesses.includes(process)}
                      onChange={() => handleProcessChange(process)}
                    />
                    <span>{process}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
          
          {/* Price Filter Dropdown */}
          <div className="filter-dropdown" ref={priceDropdownRef}>
            <label>Price</label>
            <div className="dropdown-header" onClick={() => handleDropdownToggle('price')}>
              <span>
                {selectedPrices.length === 0 
                  ? 'All Prices' 
                  : selectedPrices.length === 1 
                    ? selectedPrices[0] 
                    : `${selectedPrices.length} prices selected`}
              </span>
              <span className={`dropdown-arrow ${priceDropdownOpen ? 'open' : ''}`}>
                <FaChevronDown />
              </span>
            </div>
            {priceDropdownOpen && (
              <div className="dropdown-content">
                <div className="dropdown-actions">
                  <button 
                    className="dropdown-action-btn" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPrices(prices);
                    }}
                  >
                    Select All
                  </button>
                  <button 
                    className="dropdown-action-btn" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPrices([]);
                    }}
                  >
                    Unselect All
                  </button>
                </div>
                <div className="dropdown-divider"></div>
                {prices.map(price => (
                  <label key={price} className="checkbox-label">
                    <input 
                      type="checkbox" 
                      checked={selectedPrices.includes(price)}
                      onChange={() => handlePriceChange(price)}
                    />
                    <span>{price}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="filter-row">
          {/* Rating Filter Dropdown */}
          <div className="filter-dropdown" ref={ratingDropdownRef}>
            <label>Rating</label>
            <div className="dropdown-header" onClick={() => handleDropdownToggle('rating')}>
              <span>
                {selectedRatings.length === 0 
                  ? 'All Ratings' 
                  : selectedRatings.length === 1 
                    ? `${selectedRatings[0]} Star` 
                    : `${selectedRatings.length} ratings selected`}
              </span>
              <span className={`dropdown-arrow ${ratingDropdownOpen ? 'open' : ''}`}>
                <FaChevronDown />
              </span>
            </div>
            {ratingDropdownOpen && (
              <div className="dropdown-content">
                <div className="dropdown-actions">
                  <button 
                    className="dropdown-action-btn" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedRatings(ratings);
                    }}
                  >
                    Select All
                  </button>
                  <button 
                    className="dropdown-action-btn" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedRatings([]);
                    }}
                  >
                    Unselect All
                  </button>
                </div>
                <div className="dropdown-divider"></div>
                {ratings.map(rating => (
                  <label key={rating} className="checkbox-label">
                    <input 
                      type="checkbox" 
                      checked={selectedRatings.includes(rating)}
                      onChange={() => handleRatingChange(rating)}
                    />
                    <span>{rating} {rating === 1 ? 'Star' : 'Stars'}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
          
          {/* Likes Filter Dropdown */}
          <div className="filter-dropdown" ref={likesDropdownRef}>
            <label>Likes</label>
            <div className="dropdown-header" onClick={() => handleDropdownToggle('likes')}>
              <span>
                {selectedLikesRanges.length === 0 
                  ? 'All Likes' 
                  : selectedLikesRanges.length === 1 
                    ? likesRanges[selectedLikesRanges[0]].label 
                    : `${selectedLikesRanges.length} ranges selected`}
              </span>
              <span className={`dropdown-arrow ${likesDropdownOpen ? 'open' : ''}`}>
                <FaChevronDown />
              </span>
            </div>
            {likesDropdownOpen && (
              <div className="dropdown-content">
                <div className="dropdown-actions">
                  <button 
                    className="dropdown-action-btn" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedLikesRanges(likesRanges.map((_, index) => index));
                    }}
                  >
                    Select All
                  </button>
                  <button 
                    className="dropdown-action-btn" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedLikesRanges([]);
                    }}
                  >
                    Unselect All
                  </button>
                </div>
                <div className="dropdown-divider"></div>
                {likesRanges.map((range, index) => (
                  <label key={index} className="checkbox-label">
                    <input 
                      type="checkbox" 
                      checked={selectedLikesRanges.includes(index)}
                      onChange={() => handleLikesRangeChange(index)}
                    />
                    <span>{range.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="filter-buttons">
          <button className="filter-button reset-button" onClick={resetFilters}>Reset</button>
          <button className="filter-button apply-button" onClick={handleApplyFilters}>Apply Filters</button>
        </div>
      </div>
    
      <div className="tool-grid">
        {currentTools.length > 0 ? (
          currentTools.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))
        ) : (
          <div className="no-tools-message">
            <p>No tools found matching your search criteria.</p>
            <button className="reset-search-button" onClick={resetFilters}>Reset Filters</button>
          </div>
        )}
      </div>
      
      <Pagination 
        itemsPerPage={toolsPerPage} 
        totalItems={filteredTools.length} 
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default ToolGrid;