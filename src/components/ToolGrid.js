import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import ToolCard from './ToolCard';
import Pagination from './Pagination';
import { FaSearch, FaChevronDown } from 'react-icons/fa';
import './ToolGrid.css';
import './ToolsFilter.css';
import allTools from './toolsData.json'; // Import the tools data

function ToolGrid() {
  const { 
    tools, 
    setTools, 
    filteredTools, 
    searchQuery, 
    setSearchQuery, 
    filterCriteria,
    updateFilterCriteria,
    resetFilters: contextResetFilters
  } = useAppContext();
  
  // Define the complete list of roles and processes
  const allRoles = [
    "Marketer", 
    "Developer", 
    "Designer", 
    "Product Manager", 
    "Tester", 
    "DevOps", 
    "Analyst"
  ];
  
  const allProcesses = [
    "Research", 
    "Planning", 
    "Design", 
    "Development", 
    "Testing", 
    "Deployment", 
    "Maintenance"
  ];
  
  // Get unique roles, processes, and prices from the data
  const roles = [...new Set(allTools.flatMap(tool => Array.isArray(tool.role) ? tool.role : [tool.role]))];
  const processes = [...new Set(allTools.flatMap(tool => Array.isArray(tool.process) ? tool.process : [tool.process]))];
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
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedProcesses, setSelectedProcesses] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedLikesRanges, setSelectedLikesRanges] = useState([]);
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
  
  // Sync local state with context filter criteria
  useEffect(() => {
    setSelectedRoles(filterCriteria.roles || []);
    setSelectedProcesses(filterCriteria.processes || []);
    setSelectedPrices(filterCriteria.prices || []);
    setSelectedRatings(filterCriteria.ratings || []);
    
    // Convert likesRanges objects to indices for local state
    if (filterCriteria.likesRanges && filterCriteria.likesRanges.length > 0) {
      const indices = filterCriteria.likesRanges.map(range => {
        return likesRanges.findIndex(lr => lr.min === range.min && lr.max === range.max);
      }).filter(index => index !== -1);
      setSelectedLikesRanges(indices);
    } else {
      setSelectedLikesRanges([]);
    }
  }, [filterCriteria]);

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
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle checkbox changes
  const handleRoleChange = (role) => {
    const newRoles = selectedRoles.includes(role)
      ? selectedRoles.filter(r => r !== role)
      : [...selectedRoles, role];
    
    setSelectedRoles(newRoles);
  };

  const handleProcessChange = (process) => {
    const newProcesses = selectedProcesses.includes(process)
      ? selectedProcesses.filter(p => p !== process)
      : [...selectedProcesses, process];
    
    setSelectedProcesses(newProcesses);
  };

  const handlePriceChange = (price) => {
    const newPrices = selectedPrices.includes(price)
      ? selectedPrices.filter(p => p !== price)
      : [...selectedPrices, price];
    
    setSelectedPrices(newPrices);
  };

  const handleRatingChange = (rating) => {
    const newRatings = selectedRatings.includes(rating)
      ? selectedRatings.filter(r => r !== rating)
      : [...selectedRatings, rating];
    
    setSelectedRatings(newRatings);
  };

  const handleLikesRangeChange = (rangeIndex) => {
    const newLikesRanges = selectedLikesRanges.includes(rangeIndex)
      ? selectedLikesRanges.filter(r => r !== rangeIndex)
      : [...selectedLikesRanges, rangeIndex];
    
    setSelectedLikesRanges(newLikesRanges);
  };

  // Apply filters when user clicks Apply Filters button
  const handleApplyFilters = () => {
    // Convert selected ranges indices to actual range objects
    const selectedRangesObjects = selectedLikesRanges.map(index => likesRanges[index]);
    
    // Update filter criteria in context
    updateFilterCriteria({
      roles: selectedRoles,
      processes: selectedProcesses,
      prices: selectedPrices,
      ratings: selectedRatings,
      likesRanges: selectedRangesObjects
    });
    
    setCurrentPage(1); // Reset to first page when filters change
    setIsFilterApplied(true);
  };

  // Reset filters and display all tools
  const resetFilters = () => {
    contextResetFilters();
    setCurrentPage(1);
    setIsFilterApplied(false);
  };

  // Handle search input change
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Calculate pagination
  const indexOfLastTool = currentPage * toolsPerPage;
  const indexOfFirstTool = indexOfLastTool - toolsPerPage;
  const currentTools = filteredTools.slice(indexOfFirstTool, indexOfLastTool);
  const totalPages = Math.ceil(filteredTools.length / toolsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
                value={searchQuery}
                onChange={handleSearch}
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
                      setSelectedRoles(allRoles);
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
                {allRoles.map(role => (
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
                      setSelectedProcesses(allProcesses);
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
                {allProcesses.map(process => (
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