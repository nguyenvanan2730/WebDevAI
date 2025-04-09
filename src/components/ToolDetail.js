import React from 'react';
import { useParams } from 'react-router-dom';
import toolsData from './toolsData.json'; // Import the tools data

const ToolDetail = () => {
  const { id } = useParams(); // Get the tool ID from the URL
  const tool = toolsData.find(tool => tool.id === parseInt(id)); // Find the tool by ID

  if (!tool) {
    return <div>Tool not found</div>; // Handle case where tool is not found
  }

  return (
    <div className="tool-detail">
      <h1>{tool.name}</h1>
      <img src={tool.logoUrl} alt={`${tool.name} logo`} />
      <p><strong>Rating:</strong> {tool.rating}</p>
      <p><strong>Type:</strong> {tool.type}</p>
      <p><strong>Role:</strong> {tool.role}</p>
      <p><strong>Process:</strong> {tool.process}</p>
      <p><strong>Likes:</strong> {tool.likes}</p>
      <p><strong>Description:</strong> {tool.description}</p>
      <a href={tool.url} target="_blank" rel="noopener noreferrer">Visit Tool</a>
    </div>
  );
};

export default ToolDetail; 