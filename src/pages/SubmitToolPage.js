import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function SubmitToolPage() {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    type: 'Free',
    role: '',
    process: '',
  });

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, this would submit the data to your backend
    console.log('Submitted data:', formData);
    alert('Thank you for submitting your tool! Our team will review it shortly.');
    // Reset form
    setFormData({
      name: '',
      url: '',
      description: '',
      type: 'Free',
      role: '',
      process: '',
    });
  };

  return (
    <div className="submit-tool-page">
      <Header />
      <div className="container">
        <div className="submit-form-container">
          <h1>Submit a new AI tool</h1>
          <p>Know a great AI tool for web development that's not on our platform? Submit it here!</p>
          
          <form onSubmit={handleSubmit} className="submit-form">
            <div className="form-group">
              <label htmlFor="name">Tool Name*</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter the name of the tool"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="url">Website URL*</label>
              <input
                type="url"
                id="url"
                name="url"
                value={formData.url}
                onChange={handleChange}
                required
                placeholder="https://example.com"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Description*</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="Describe what the tool does and how it helps web developers"
                rows="4"
              ></textarea>
            </div>
            
            <div className="form-group">
              <label htmlFor="type">Pricing Type*</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              >
                <option value="Free">Free</option>
                <option value="Freemium">Freemium</option>
                <option value="Paid">Paid</option>
                <option value="Trial">Free Trial</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="role">Target Role*</label>
              <input
                type="text"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                placeholder="e.g., developer, designer, etc."
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="process">Development Process*</label>
              <input
                type="text"
                id="process"
                name="process"
                value={formData.process}
                onChange={handleChange}
                required
                placeholder="e.g., coding, design, testing, etc."
              />
            </div>
            
            <button type="submit" className="submit-button">Submit Tool</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SubmitToolPage; 