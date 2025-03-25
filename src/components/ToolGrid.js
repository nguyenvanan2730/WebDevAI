import React from 'react';
import ToolCard from './ToolCard';
import './ToolGrid.css';

function ToolGrid() {
  // Sample data for the tools
  const tools = [
    { id: 1, name: 'DeepSeek1', rating: 4, type: 'Free' },
    { id: 2, name: 'DeepSeek', rating: 5, type: 'Free' },
    { id: 3, name: 'DeepSeek', rating: 5, type: 'Free' },
    { id: 4, name: 'DeepSeek', rating: 5, type: 'Free' },
    { id: 5, name: 'DeepSeek', rating: 5, type: 'Free' },
    { id: 6, name: 'DeepSeek', rating: 5, type: 'Free' },
    { id: 7, name: 'DeepSeek', rating: 5, type: 'Free' },
    { id: 8, name: 'DeepSeek', rating: 5, type: 'Free' },
    { id: 9, name: 'DeepSeek', rating: 5, type: 'Free' },
    { id: 10, name: 'DeepSeek', rating: 5, type: 'Free' },
    { id: 11, name: 'DeepSeek', rating: 5, type: 'Free' },
    { id: 12, name: 'DeepSeek', rating: 5, type: 'Free' },
    { id: 13, name: 'DeepSeek', rating: 5, type: 'Free' },
    { id: 14, name: 'DeepSeek', rating: 5, type: 'Free' },
    { id: 15, name: 'DeepSeek', rating: 5, type: 'Free' },
    { id: 16, name: 'DeepSeek', rating: 5, type: 'Free' },
  ];

  return (
    <div className="tool-grid">
      {tools.map(tool => (
        <div key={tool.id} className="tool-grid-item">
          <ToolCard 
            id={tool.id}
            name={tool.name}
            rating={tool.rating}
            type={tool.type}
          />
        </div>
      ))}
    </div>
  );
}

export default ToolGrid; 