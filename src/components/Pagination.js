import React from 'react';
import './Pagination.css';

function Pagination() {
  return (
    <div className="pagination">
      <button className="pagination-item active">1</button>
      <button className="pagination-item">2</button>
      <button className="pagination-item">3</button>
      <button className="pagination-item">...</button>
      <button className="pagination-item">20</button>
      <button className="pagination-item next">Next ›</button>
    </div>
  );
}

export default Pagination; 