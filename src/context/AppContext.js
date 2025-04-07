import React, { createContext, useContext, useState } from 'react';

// Create the context
const AppContext = createContext();

// Create a provider component
export function AppProvider({ children }) {
  // Define your global state here
  const [tools, setTools] = useState([]);
  const [selectedTool, setSelectedTool] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTools, setFilteredTools] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState({
    roles: [],
    processes: [],
    prices: [],
    ratings: [],
    likesRanges: []
  });

  // Set the original tools list
  const updateTools = (newTools) => {
    setTools(newTools);
    // Also update filtered tools when original tools are updated
    applyFilters(newTools, searchQuery, filterCriteria);
  };

  // Update search query and filter tools
  const updateSearchQuery = (query) => {
    setSearchQuery(query);
    applyFilters(tools, query, filterCriteria);
  };

  // Update filter criteria and apply filters
  const updateFilterCriteria = (newCriteria) => {
    setFilterCriteria(newCriteria);
    applyFilters(tools, searchQuery, newCriteria);
  };

  // Apply all filters (search + criteria)
  const applyFilters = (toolsList, query, criteria) => {
    let result = [...toolsList];
    
    // Apply search filter
    if (query) {
      const lowerCaseQuery = query.toLowerCase();
      result = result.filter(tool => 
        tool.name.toLowerCase().includes(lowerCaseQuery) ||
        tool.description.toLowerCase().includes(lowerCaseQuery)
      );
    }
    
    // Apply role filters
    if (criteria.roles && criteria.roles.length > 0) {
      result = result.filter(tool => {
        const toolRoles = Array.isArray(tool.role) ? tool.role : [tool.role];
        return criteria.roles.some(role => toolRoles.includes(role));
      });
    }
    
    // Apply process filters
    if (criteria.processes && criteria.processes.length > 0) {
      result = result.filter(tool => {
        const toolProcesses = Array.isArray(tool.process) ? tool.process : [tool.process];
        return criteria.processes.some(process => toolProcesses.includes(process));
      });
    }
    
    // Apply price filters
    if (criteria.prices && criteria.prices.length > 0) {
      result = result.filter(tool => 
        criteria.prices.includes(tool.type)
      );
    }
    
    // Apply rating filters
    if (criteria.ratings && criteria.ratings.length > 0) {
      result = result.filter(tool => 
        criteria.ratings.includes(tool.rating)
      );
    }
    
    // Apply likes range filters
    if (criteria.likesRanges && criteria.likesRanges.length > 0) {
      result = result.filter(tool => {
        return criteria.likesRanges.some(range => {
          if (range.max === 1000) { // For the 501+ range
            return tool.likes >= range.min;
          } else {
            return tool.likes >= range.min && tool.likes <= range.max;
          }
        });
      });
    }
    
    setFilteredTools(result);
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setFilterCriteria({
      roles: [],
      processes: [],
      prices: [],
      ratings: [],
      likesRanges: []
    });
    setFilteredTools(tools);
  };

  const value = {
    tools,
    setTools: updateTools,
    selectedTool,
    setSelectedTool,
    isLoading,
    setIsLoading,
    error,
    setError,
    searchQuery,
    setSearchQuery: updateSearchQuery,
    filteredTools,
    filterCriteria,
    updateFilterCriteria,
    resetFilters,
    applyFilters
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

// Create a custom hook to use the context
export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
} 