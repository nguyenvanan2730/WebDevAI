import React from 'react';
import './Pagination.css';

function Pagination({ totalItems, itemsPerPage = 9, currentPage = 1, onPageChange }) {
  // Calculate total number of pages
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1; // Ensure at least 1 page
  
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    
    if (totalPages <= 5) {
      // If 5 or fewer pages, show all
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // More than 5 pages, show selected ones with ellipses
      if (currentPage < 4) {
        // Near start: show first 4 pages, then ellipsis, then last page
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage > totalPages - 3) {
        // Near end: show first page, then ellipsis, then last 4 pages
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // Middle: show first page, ellipsis, current-1, current, current+1, ellipsis, last page
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };
  
  // Handle page change
  const handlePageChange = (page) => {
    if (page === currentPage) return;
    
    if (page === '...') return;
    
    // Make sure page is within bounds
    if (page >= 1 && page <= totalPages) {
      if (onPageChange) {
        onPageChange(page);
      }
    }
  };
  
  // Handle Next page
  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };
  
  // Handle Previous page
  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };
  
  // If there's only one page, don't render pagination
  if (totalPages <= 1) return null;
  
  const pageNumbers = getPageNumbers();
  
  return (
    <div className="pagination">
      {/* Previous button */}
      <button 
        className={`pagination-item previous ${currentPage === 1 ? 'disabled' : ''}`}
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        ‹ Prev
      </button>
      
      {/* Page numbers */}
      {pageNumbers.map((page, index) => (
        <button 
          key={index}
          className={`pagination-item ${page === currentPage ? 'active' : ''} ${page === '...' ? 'dots' : ''}`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}
      
      {/* Next button */}
      <button 
        className={`pagination-item next ${currentPage === totalPages ? 'disabled' : ''}`}
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Next ›
      </button>
    </div>
  );
}

export default Pagination; 